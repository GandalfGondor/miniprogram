// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
    tempFileURL: '',
    //itemCategory: 'AI拼命查询中...',
    categories :{},
    msgs : [],
    nr : 0,
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
    var isg = ''
    var cates = {"有害垃圾":0, "厨余垃圾":0,"其他垃圾": 0,"可回收垃圾":0}

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
    if (ms.length == 1) {
      if (cates["有害垃圾"] == 1) 
        isg = '有害垃圾指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物，含有有害重金属或有毒物质，常见包括废电池、废荧光灯管、废灯泡、废水银温度计等等。'
      if (cates["厨余垃圾"] == 1)
        isg = '厨余垃圾即易腐垃圾，又称湿垃圾，有机垃圾，指易腐烂的生活废弃物。'
      if (cates["其他垃圾"] == 1)
        isg = '其他垃圾指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。投入干垃圾收集容器，并保持周边环境整洁。'
      if (cates["可回收垃圾"] == 1)
        isg = '可回收物就是可以再生循环利用的垃圾，主要包括废纸、塑料、玻璃、金属和布料五大类。'
    }
 
    this.setData ({
      msgs : ms,
      categories: cates,
      nr : ms.length,
      iconMsg : isg
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
  }
}) 

