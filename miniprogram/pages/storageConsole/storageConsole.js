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

    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  },

})