const app = getApp()
Page({
  data:{

  },
  goto_game1:function(e){
    wx.navigateTo({
      url: '../game1/game1',
    })
  },
  goto_game2:function(e){
    wx.navigateTo({
      url: '../game2/game2',
    })
  }
})