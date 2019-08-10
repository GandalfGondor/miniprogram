//index.js
const app = getApp()
var WxSearch = require('../../wxSearch/wxSearch.js')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    gameinterface_photo:"../../images/gameinterface.png",
    userInfo: {},
    logged: false,
    takeSession: false,
    photopath:'',
    requestResult: '',
    ph:'./photo.png'
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    var that = this
    WxSearch.init(that, 43, ['水瓶', '香蕉皮', '米饭', '车胎','电池']);

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    
    // 获取服务器中的json文件
    wx.request({
      url: 'https://6d69-miniprog-ttsrs-1259681489.tcb.qcloud.la/rubbish_items.json?sign=6a8b4d82b40adac7fa288abfad4cf836&t=1564823960',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var app = getApp()
        app.globalData.rubbish_table = res.data
      }

    })

    /*个人中心 begin*/
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        dbconn.collection("user").where({
          _openid: app.globalData.openid
        }).get({
          success: function (res) {
            console.log(res.data)
            if (res.data.length == 0) { //新用户
              dbconn.collection("user").add({
                data: {
                  total_score: app.globalData.gTotalScore,
                  total_scan: app.globalData.gTotalScan,
                  max_score: app.globalData.gMaxScore
                },
                success: function (res) {
                  console.log(res)
                  app.globalData.id = res.data[0]._id
                }
              })
            } else {    //旧用户
              app.globalData.gTotalScore = res.data[0].total_score
              app.globalData.gTotalScan = res.data[0].total_scan
              app.globalData.gMaxScore = res.data[0].max_score
              app.globalData.id = res.data[0]._id
            }

            /*已测试，更新total_scan、total_score、max_score
            //gTotalScan:垃圾分类识别总数，gTotalScore：游戏累计分数，gMaxScore：单次游戏最大得分
            //根据要求修改对应的gTotalScan、gTotalScore和gMaxScore。游戏修改gTotalScore和gMaxScore，垃圾分别识别修改gTotalScan
            //app.globalData.gTotalScan = app.globalData.gTotalScan + 1
            app.globalData.gTotalScore = app.globalData.gTotalScore + game score
            app.globalData.gMaxScore = game score > app.globalData.gMaxScore?  game score : app.globalData.gMaxScore
            console.log(app.globalData.id)
            dbconn.collection("user").doc(app.globalData.id).update({
              data: {
                total_score: app.globalData.gTotalScore,
                max_score: app.globalData.gMaxScore
                //total_scan: app.globalData.gTotalScan
              },
              success: function (res) {
                console.log(res)
              }
            })
            */
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    const dbconn = wx.cloud.database()
    dbconn.collection("AchieveItem").get({
      success: function (res) {
        app.globalData.achieve_list = res.data
      }
    })

	  /*个人中心 end*/
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.showToast({
          title: '获取成功',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },
  jumpToGame: function () {
    wx.navigateTo({
      url: '../gamenavigation/gamenavigation'
    })
  },

  jumpToBaike: function () {
    wx.navigateTo({
      url: '../baike/baike'
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        var photoURL = ''
        var resfileID = ''
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：')
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            resfileID = res.fileID

            wx.cloud.getTempFileURL({
              fileList: [resfileID],
              success: res => {
                app.globalData.tempFileURL = res.fileList[0].tempFileURL
                wx.navigateTo({
                  url: '../storageConsole/storageConsole',
                })
              },
              fail: err => {
                console.log('fail getTempFileURL ')

              }
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  //搜索框逻辑
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    //添加

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  gameClick:function(e){
    wx.navigateTo({
      url: '../gamenavigation/gamenavigation',
    })
  }
})

