//app.js
App({
  globalData: {
    achieve_list: [],
    question: [{ "item": "花", "tag": "厨余垃圾", "egg": "" }, { "item": "女朋友的香水瓶", "tag": "有害垃圾", "egg": "" }, { "item": "男朋友给你剥剩的虾壳", "tag": "湿垃圾", "egg": "" }, { "item": "被舔干净了的酸奶盖", "tag": "干垃圾", "egg": "" }, { "item": "用光的SK-II神仙水玻璃瓶", "tag": "可回收物", "egg": "" }, { "item": "丙烯颜料", "tag": "有害垃圾", "egg": "" }, { "item": "注射器", "tag": "有害垃圾", "egg": "" }, { "item": "弹药", "tag": "有害垃圾", "egg": "" }, { "item": "黑胶唱片", "tag": "有害垃圾", "egg": "" }, { "item": "药物", "tag": "有害垃圾", "egg": "" }, { "item": "熟石膏", "tag": "有害垃圾", "egg": "" }, { "item": "前照灯", "tag": "有害垃圾", "egg": "" }, { "item": "染发", "tag": "有害垃圾", "egg": "" }, { "item": "药物", "tag": "有害垃圾", "egg": "" }, { "item": "枝形吊灯", "tag": "有害垃圾", "egg": "" }, { "item": "指甲油", "tag": "有害垃圾", "egg": "" }, { "item": "大麻", "tag": "有害垃圾", "egg": "" }, { "item": "涂料", "tag": "有害垃圾", "egg": "" }, { "item": "照片", "tag": "有害垃圾", "egg": "" }, { "item": "X光照片", "tag": "有害垃圾", "egg": "" }, { "item": "雪茄", "tag": "有害垃圾", "egg": "" }, { "item": "袋子", "tag": "有害垃圾", "egg": "" }, { "item": "盒饭", "tag": "其他垃圾", "egg": "" }, { "item": "牙刷", "tag": "其他垃圾", "egg": "" }, { "item": "文件", "tag": "其他垃圾", "egg": "" }]
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
