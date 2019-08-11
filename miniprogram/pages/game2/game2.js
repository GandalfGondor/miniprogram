
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  /**
    * 页面的初始数据
    */
  data: {
    index: 0,
    realIndex: 0,
    optionA: "A",
    optionB: "B",
    optionC: "C",
    optionD: "D",
    right_answer: 0,
    wrong_answer: 0,
    questionDetail: app.globalData.question[0].item + "是什么垃圾？",
    answerA: "厨余垃圾",
    answerB: "可回收物",
    answerC: "有害垃圾",
    answerD: "其他垃圾",
    timer: 'check',
    countDowntime: 60,
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20,21,22,23,24],

  },

  randSort: function () {
    return Math.random() > 0.5 ? 1 : -1;
  },

  setList: function () {
    var newList = this.data.list.sort(this.randSort);
    this.setData({
      list: newList,
    });
    console.log(1)
  },

  countdown: function () {
    this.setData({
      countDowntime:this.data.countDowntime -1
    })
    var cnt=this.data.countDowntime
    console.log(cnt);
    if(cnt=="0"){
      clearInterval(this.data.timer)
      wx.redirectTo({
        url: '/pages/result/result?right_answer=' + this.data.right_answer + '&wrong_answer=' + this.data.wrong_answer,
      })
    }
  },

  answerClickA: function () {
    var ans = app.globalData.question[this.data.realIndex].tag
    if (ans == "厨余垃圾") {
      this.setData({
        right_answer: this.data.right_answer + 1
      })
    }
    else {
      this.setData({
        wrong_answer: this.data.wrong_answer + 1
      })
    }
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index],
    })
    if (this.data.index == 25) {
      wx.redirectTo({
        url: '/pages/result/result?right_answer=' + this.data.right_answer + '&wrong_answer=' + this.data.wrong_answer,
      })
    } else {
      this.setData({
        questionDetail: app.globalData.question[this.data.realIndex].item + "是什么垃圾？",
        answerA: "厨余垃圾",
        answerB: "可回收物",
        answerC: "有害垃圾",
        answerD: "其他垃圾"
      })
    }

  },

  answerClickB: function () {
    var ans = app.globalData.question[this.data.realIndex].tag
    if (ans == "可回收物") {
      this.setData({
        right_answer: this.data.right_answer + 1
      })
    }
    else {
      this.setData({
        wrong_answer: this.data.wrong_answer + 1
      })
    }
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index]
    })
    if (this.data.index == 25) {
      wx.redirectTo({
        url: '/pages/result/result?right_answer=' + this.data.right_answer + '&wrong_answer=' + this.data.wrong_answer,
      })
    } else {
      this.setData({
        questionDetail: app.globalData.question[this.data.realIndex].item + "是什么垃圾？",
        answerA: "厨余垃圾",
        answerB: "可回收物",
        answerC: "有害垃圾",
        answerD: "其他垃圾"
      })
    }
  },

  answerClickC: function () {
    var ans = app.globalData.question[this.data.realIndex].tag
    if (ans == "有害垃圾") {
      this.setData({
        right_answer: this.data.right_answer + 1
      })
    }
    else {
      this.setData({
        wrong_answer: this.data.wrong_answer + 1
      })
    }
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index],

    })
    if (this.data.index == 25) {
      wx.redirectTo({
        url: '/pages/result/result?right_answer=' + this.data.right_answer + '&wrong_answer=' + this.data.wrong_answer,
      })
    } else {
      this.setData({
        questionDetail: app.globalData.question[this.data.realIndex].item + "是什么垃圾？",
        answerA: "厨余垃圾",
        answerB: "可回收物",
        answerC: "有害垃圾",
        answerD: "其他垃圾"
      })
    }

  },

  answerClickD: function () {
    var ans = app.globalData.question[this.data.realIndex].tag
    if (ans == "其他垃圾") {
      this.setData({
        right_answer: this.data.right_answer + 1
      })
    }
    else {
      this.setData({
        wrong_answer: this.data.wrong_answer + 1
      })
    }
    this.setData({
      index: this.data.index + 1,
      realIndex: this.data.list[this.data.index],

    })
    if (this.data.index == 25) {
      wx.redirectTo({
        url: '/pages/result/result?right_answer=' + this.data.right_answer + '&wrong_answer=' + this.data.wrong_answer,
      })
    }
    else {
      this.setData({
        questionDetail: app.globalData.question[this.data.realIndex].item + "是什么垃圾？",
        answerA: "厨余垃圾",
        answerB: "可回收物",
        answerC: "有害垃圾",
        answerD: "其他垃圾"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setList();
    // this.setABC();

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
      timer: setInterval(this.countdown, 1000)
    })

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
    clearInterval(this.data.timer)
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