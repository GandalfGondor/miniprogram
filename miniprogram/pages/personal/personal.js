const app = getApp()
  /* in app.json
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/icon_home.png",
        "selectedIconPath": "images/icon_home.png",
        "text": "Home"
      },
      {
        "pagePath": "pages/personal/personal",
        "iconPath": "images/icon_personal.png",
        "selectedIconPath": "images/icon_personal.png",
        "text": "Mine"
      }
    ]
  },
  */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden : true,
    window_text1 : "hhhhh"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    wx.loadFontFace({
      family: "MyFont",
      source: 'url("https://bucket-1-1259654469.cos.ap-shenzhen-fsi.myqcloud.com/Montserrat-SemiBoldItalic.ttf")'
    })
    */
  },

  onDetail: function(param) {
    var status = "未达成"
    var img = param.currentTarget.dataset.img_todo;
    if (app.globalData.gTotalScan >= param.currentTarget.dataset.scanneed && app.globalData.gTotalScore >= param.currentTarget.dataset.scoreneed) {
      status = "已达成"
      img = param.currentTarget.dataset.img_done
    }
    var text1 = ""
    var text2 = ""
    if (param.currentTarget.dataset.scanneed != 0) {
      text1 = '扫垃圾数: ' + app.globalData.gTotalScan + '/' + param.currentTarget.dataset.scanneed
    } 
    if (param.currentTarget.dataset.scoreneed != 0) {
      text2 = '游戏得分: ' + app.globalData.gTotalScore + '/' + param.currentTarget.dataset.scoreneed
    }
    this.setData({
      modalHidden: false,
      window_title: param.currentTarget.dataset.name,
      achieve_status : status,
      window_text1: text1,
      window_text2: text2,
      window_img: img
    })
  },

  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {  
    this.setData({
      game_score: app.globalData.gTotalScore,
      scan_total: app.globalData.gTotalScan
    })
    var list = []

    app.globalData.achieve_list.forEach(
      function (item, index) {
        if ((item.scan_level <= app.globalData.gTotalScan) && (item.score_level <= app.globalData.gTotalScore)) {
          var tempitem = item
          tempitem.done = true
          list.push(tempitem)
        }
      }
    )
    app.globalData.achieve_list.forEach(
      function (item, index) {
        if ((item.scan_level > app.globalData.gTotalScan) || (item.score_level > app.globalData.gTotalScore)) {
          var tempitem = item
          tempitem.done = false
          list.push(tempitem)
        }
      }
    )
    this.setData({
      achievement_list : list
    })
    console.log(list)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})