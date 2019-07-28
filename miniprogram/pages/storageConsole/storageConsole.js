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