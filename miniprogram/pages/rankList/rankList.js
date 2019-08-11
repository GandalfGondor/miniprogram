// miniprogram/pages/rankList/rankList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankListType:"竞速排行",
    top1:"Mountains",
    top2:"暧硪伱怕孑吗",
    top3: "西瓜刀郎",
    top4: "兔兔",
    top5: "咸蛋超人",

  },
  
  ChangeToSpeed: function () {
    this.setData({
      rankListType: "竞速排行",
      top1: "Mountains",
      top2: "暧硪伱怕孑吗",
      top3: "西瓜刀郎",
      top4: "兔兔",
      top5: "咸蛋超人",
    })
  },

  ChangeToScore: function () {
    this.setData({
      rankListType: "答题排行",
      top1: "西瓜刀郎",
      top2: "咸蛋超人",
      top3: "熊大",
      top4: "你的男孩TT",
      top5: "布偶",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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