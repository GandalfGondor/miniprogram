// pages/result/result.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    right_answer: 2,
    wrong_answer: 3,
    Kind: 'unknow'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var right_answer=options.right_answer-0;
    right_answer=right_answer*10;
    this.setData({
      A: options.right_answer - 0,
      B: options.wrong_answer - 0
    }),
    this.setData({
      Kind: "您太棒了"
    }),
          
            //gTotalScan:垃圾分类识别总数，gTotalScore：游戏累计分数，gMaxScore：单次游戏最大得分
            //根据要求修改对应的gTotalScan、gTotalScore和gMaxScore。游戏修改gTotalScore和gMaxScore，垃圾分别识别修改gTotalScan
            //app.globalData.gTotalScan = app.globalData.gTotalScan + 1
            app.globalData.gTotalScore = app.globalData.gTotalScore + right_answer
            app.globalData.gMaxScore = right_answer > app.globalData.gMaxScore?  right_answer : app.globalData.gMaxScore
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