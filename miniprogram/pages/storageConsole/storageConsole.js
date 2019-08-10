// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
    tempFileURL: '',
    categories: {},
    msgs : [],
    itemCategory: 'AI拼命查询中...'
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
    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
    this.analyzeImg(tempFileURL)
  },

  getCategory: function () {
    var tagsTobeCate = getApp().globalData.tagsTobeCate
    var rubbish_table = getApp().globalData.rubbish_table
    var found = 0
    var msg = ""
    var ms = []
    var cates = {"有害垃圾":0, "厨余垃圾": 0 ,"其他垃圾": 0 ,"可回收垃圾": 0}
                
    for (var i = 0; i < tagsTobeCate.length; i++) {
      for (var j = 0; j < rubbish_table.length; j++) {
        if (rubbish_table[j].item == tagsTobeCate[i]) {
          msg = tagsTobeCate[i] + "是" + rubbish_table[j].tag
          cates[rubbish_table[j].tag]++
          ms.push(msg)
          found = 1
          break
        }
      }
    }
    if (0 == found)
      msg = "AI未识别哦，换个角度呗：）"
    console.log(msg)
    this.setData ({
      msgs : ms,
      categories: cates
    })
    console.log(cates)
    console.log(ms)
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
  }
})
