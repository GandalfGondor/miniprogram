// miniprogram/pages/textSearchRes/textSearchRes.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:'',
    hasQuery:false,

    itemCategory: 'AI拼命查询中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tags = [options.query];
    app.globalData.tagsTobeCate = tags
    console.log(tags);

    this.getCategory();

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
          found = 1
          break
        }
      }
    }
    if (0 == found)
      msg = "AI未识别哦，换个角度呗：）"
    console.log(msg)
    this.setData({
      itemCategory: msg
    })
  }


})