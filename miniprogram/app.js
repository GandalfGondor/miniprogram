//app.js
App({
  globalData: {
    achieve_list: []
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'miniprog-ttsrs',
        traceUser: true,
      })
    }

    this.globalData = {
      rubbish_table: null, // 解析远程json文件并生成的json对象
      tagsTobeCate: null // 传递给查找逻辑的标签列表，使用全局变量形式传递
    }
  }
})
