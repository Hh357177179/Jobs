//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },

  // 跳转商品详情
  skipDetail () {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  onLoad: function () {
    
  }
})
