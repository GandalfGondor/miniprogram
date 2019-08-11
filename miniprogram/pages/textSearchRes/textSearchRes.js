// miniprogram/pages/textSearchRes/textSearchRes.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    hasQuery: false,

    itemCategoryMsg: 'AI拼命查询中...',
    findItem: false,
    itemCategory: '',
    iconMsg: '',

    // iconUrl: '../../images/textRes_bad.png'
    // iconUrl: '../../images/图片4.png'
    // iconUrl: '../../images/textRes_bad1.ico'
    iconUrl: '../../images/404.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tags = [options.query];
    app.globalData.tagsTobeCate = tags
    console.log(tags);

    this.getCategory();

    //已测试，更新total_scan、total_score、max_score
    //gTotalScan:垃圾分类识别总数，gTotalScore：游戏累计分数，gMaxScore：单次游戏最大得分
    //根据要求修改对应的gTotalScan、gTotalScore和gMaxScore。游戏修改gTotalScore和gMaxScore，垃圾分别识别修改gTotalScan
    var dbconn = wx.cloud.database()
    app.globalData.gTotalScan = app.globalData.gTotalScan + 1
    console.log(app.globalData.id)
    dbconn.collection("user").doc(app.globalData.id).update({
      data: {
        total_scan: app.globalData.gTotalScan
      },
      success: function (res) {
        console.log(res)
      }
    })
            

    this.setData({
      query: options.query,
      hasQuery: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  getCategory: function () {
    var tagsTobeCate = app.globalData.tagsTobeCate
    var rubbish_table = app.globalData.rubbish_table
    var found = 0
    var msg = ""
    for (var i = 0; i < tagsTobeCate.length; i++) {
      for (var j = 0; j < rubbish_table.length; j++) {
        if (rubbish_table[j].item == tagsTobeCate[i]) {
          msg = msg + (tagsTobeCate[i] + "是" + rubbish_table[j].tag + '\n')
          this.changeIconMsg(rubbish_table[j].tag)

          found = 1
          break
        }
      }
    }

    if (0 == found) {
      msg = "物品未收录"
      this.setData({
        itemCategoryMsg: msg,
        iconMsg:"库中没有收录该物品，恭喜您发现了知识的荒原"
      })
    }
    else{
      this.setData({
        itemCategoryMsg: msg
      })
    }

  },

  changeIconMsg: function (category) {

    var iconUrl = ''
    var iconMsg = ''
    var itemCategory = ''
    if (category == "其他垃圾" || category == "干垃圾") {
      iconUrl = '../../images/textRes_other.png'
      // itemCategory = "干垃圾"
      iconMsg = '其他垃圾指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。投入其他垃圾（干垃圾）收集容器，并保持周边环境整洁。'
    }
    else if (category == "厨余垃圾" || category == "湿垃圾") {
      iconUrl = '../../images/textRes_wet.png'
      // itemCategory = "湿垃圾"
      iconMsg = '厨余垃圾又称湿垃圾、有机垃圾，指易腐烂的生活废弃物。'
    }
    else if (category == "有害垃圾") {
      iconUrl = '../../images/textRes_bad.png'
      // itemCategory = "有害垃圾"
      iconMsg = '有害垃圾指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物，含有有害重金属或有毒物质，常见包括废电池、废荧光灯管、废灯泡、废水银温度计等等。'
    }
    else if (category == "可回收物") {
      iconUrl = '../../images/textRes_recycle.png'
      // itemCategory = "可回收物"
      iconMsg = '可回收物就是可以再生循环利用的垃圾，主要包括废纸、塑料、玻璃、金属和布料五大类。'
    }
    else {
      iconUrl = ''
    }

    this.setData({
      iconUrl: iconUrl,
      iconMsg: iconMsg,
      findItem: true,
      // itemCategory: itemCategory
      itemCategory: category
    })
  },

  jumpToBaikeDetail: function(){
    if (this.data.itemCategory == "其他垃圾" || this.data.itemCategory == "干垃圾") {
      wx.navigateTo({
        url: "/pages/baike/dry/dry",
      })
    }
    else if (this.data.itemCategory == "厨余垃圾" || this.data.itemCategory == "湿垃圾") {
      console.log("Enter")
      wx.navigateTo({
        url: "/pages/baike/wet/wet",
      })
    }
    else if (this.data.itemCategory == "有害垃圾") {
      wx.navigateTo({
        url: "/pages/baike/harmful/harmful",
      })
    }
    else if (this.data.itemCategory == "可回收物") {
      wx.navigateTo({
        url: "/pages/baike/recyclable/recyclable",
      })
    }
  },

  jumpToHome: function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  jumpToBaike: function(){
    wx.navigateTo({
      url: "/pages/baike/baike",
    })
  }


})