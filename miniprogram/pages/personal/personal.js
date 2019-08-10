const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.achieve_list)
    this.setData({
      achievement_list: app.globalData.achieve_list
    })
    wx.loadFontFace({
      family: "MyFont",
      source: 'url("https://bucket-1-1259654469.cos.ap-shenzhen-fsi.myqcloud.com/Montserrat-SemiBoldItalic.ttf")'
    })
  },

  onDetail: function(param) {
    wx.showModal({
      title: param.currentTarget.dataset.name,
      content: '扫垃圾数: ' + param.currentTarget.dataset.scanneed + '\r\n游戏得分: ' + param.currentTarget.dataset.scoreneed,
    })
    console.log(param.currentTarget.dataset)
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