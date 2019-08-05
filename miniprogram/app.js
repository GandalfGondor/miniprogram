//app.js
App({
  globalData: {
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
      tagsTobeCate: [], // 传递给查找逻辑的标签列表，使用全局变量形式传递
      openid: "",       //用户openid
      id: "",           //用户数据库id
      achieve_list: [],   
      gMaxScore: 0,     //最大游戏得分
      gTotalScore: 0,   //总游戏得分
      gTotalScan: 0     //垃圾分类识别总数
    }
  }

})
