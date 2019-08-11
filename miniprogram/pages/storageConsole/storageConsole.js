// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
    tempFileURL: '',
    categories :{},
    msgs: [],
    nr : -1,
    iconMsg : ''
  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
      tempFileURL,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
      tempFileURL,
    })
    this.analyzeImg(tempFileURL)
  },

  getCategory: function () {
    var tagsTobeCate = getApp().globalData.tagsTobeCate
    var rubbish_table = getApp().globalData.rubbish_table
    var found = 0
    var msg = ""
    var ms = []
    var cnt = 0
    var isg = ''
    var cates = {"有害垃圾":0, "厨余垃圾":0,"其他垃圾": 0,"可回收物":0}

    for (var i = 0; i < tagsTobeCate.length; i++) {
      for (var j = 0; j < rubbish_table.length; j++) {
        if (rubbish_table[j].item == tagsTobeCate[i]) {
          msg = tagsTobeCate[i] + "是" + rubbish_table[j].tag
          cates[rubbish_table[j].tag]++
          ms.push(msg)
          console.log(msg)
          break
        }
      }
    }
    console.log("ms.length" + ms.length) 
    if (ms.length > 0) {
      if (cates["有害垃圾"] != 0) {
        isg = '有害垃圾指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物，含有有害重金属或有毒物质，常见包括废电池、废荧光灯管、废灯泡、废水银温度计等等。'
        cnt = cnt + cates["有害垃圾"]
      }
       
      if (cates["厨余垃圾"] != 0) {
        isg = '厨余垃圾即易腐垃圾，又称湿垃圾，有机垃圾，指易腐烂的生活废弃物。'
        cnt = cnt + cates["厨余垃圾"]
      }
       
      if (cates["其他垃圾"] != 0) {
        isg = '其他垃圾指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。投入干垃圾收集容器，并保持周边环境整洁。'
        cnt = cnt + cates["其他垃圾"]
       }
       
      if (cates["可回收物"] != 0) {
        console.log("keshuishou" + cates["可回收物"])
        isg = '可回收物就是可以再生循环利用的垃圾，主要包括废纸、塑料、玻璃、金属和布料五大类。' 
        cnt = cnt + cates["可回收物"]
      }
        
    }
    if (0 == ms.length) {
      isg = '知识宝库中没有收录该物品，恭喜您发现了知识的荒原。'
      ms.push("物品未收录")
    }

    this.setData ({
      msgs : ms,
      categories: cates,
      nr : cnt,
      iconMsg : isg
    })
        /*已测试，更新total_scan、total_score、max_score */
    //gTotalScan:垃圾分类识别总数，gTotalScore：游戏累计分数，gMaxScore：单次游戏最大得分
    //根据要求修改对应的gTotalScan、gTotalScore和gMaxScore。游戏修改gTotalScore和gMaxScore，垃圾分别识别修改gTotalScan
    var dbconn = wx.cloud.database()
    app.globalData.gTotalScan = app.globalData.gTotalScan + 1
    // app.globalData.gTotalScore = app.globalData.gTotalScore + game score
    // app.globalData.gMaxScore = game score > app.globalData.gMaxScore?  game score : app.globalData.gMaxScore
    console.log(app.globalData.id)
    dbconn.collection("user").doc(app.globalData.id).update({
      data: {
        // total_score: app.globalData.gTotalScore,
        // max_score: app.globalData.gMaxScore
        total_scan: app.globalData.gTotalScan
      },
      success: function (res) {
        console.log(res)
      }
    })
   
  },

  analyzeImg: function (imgUrl) {
    // 根据区域和Url分析图片
    let that = this
    wx.cloud.callFunction({
      name: 'getImageLabels',
      data: {
        Region: 'ap-beijing',
        ImageUrl: imgUrl
      },
      success: function (res) {
        console.log(res.result.Labels)
        var labels = res.result.Labels
        var tags = []
        // 设置置信度过滤阈值
        var confidence = 20
        for (var idx in labels) {
          var label = labels[idx]
          console.log()
          if (label["Confidence"] >= confidence) {
            tags.push(label["Name"])
          }
        }
        app.globalData.tagsTobeCate = tags
        console.log(app.globalData.tagsTobeCate)
        that.getCategory()
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  gotoDry: function() {
    wx.navigateTo({
      url: '../baike/dry/dry',
    })
  },
  gotoWet: function () {
    wx.navigateTo({
      url: '../baike/wet/wet',
    })
  },
  gotoRec: function () {
    wx.navigateTo({
      url: '../baike/recyclable/recyclable',
    })
  },
  gotoHam: function () {
    wx.navigateTo({
      url: '../baike/harmful/harmful',
    })
  },
  gotoBaike: function () {
    wx.navigateTo({
      url: '../baike/baike',
    })
  },
  gotoIndex: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  }
}) 

