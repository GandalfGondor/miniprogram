// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
    tempFileURL: '',
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

    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  

    var tagsTobeCate = getApp().globalData.tagsTobeCate;
    var rubbish_table = getApp().globalData.rubbish_table;
    for(var i = 0; i<tagsTobeCate.length; i++) {
    var found = 0;
    var msg = "";
    for (var item in rubbish_table) {
      if (item == tagsTobeCate[i]) {
        var category = rubbish_table[item];
        msg = tagsTobeCate[i] + "是" + category[0].tag;
        found = 1;
        break;
      }
    }
    if (!found)
      msg = tagsTobeCate[i] + "不在垃圾分类仓库中";
    var key = "itemAndCategories[" + i + "]";
    this.setData({
      key: msg
    })
  }
  },

  analyzeImg: function (imgUrl) {
    // 根据区域和Url分析图片
    let that = this
    wx.cloud.callFunction({
      name: 'getImageLabels',
      data: {
        Region: 'ap-beijing',
        // ImageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563993315738&di=d6781d6de191a010ad80ec828c7a424b&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111127%2F8682081_220648268180_2.jpg'
        ImageUrl: imgUrl
      },
      success: function (res) {
        console.log(res.result.Labels)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }

})