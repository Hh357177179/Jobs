// pages/new/new.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  // 跳转第一阶模板
  firstRoute() {
    if (wx.getStorageSync('status') != 2) {
      wx.navigateTo({
        url: '/pages/authentication/authentication',
      })
    } else {
      wx.navigateTo({
        url: '/pages/first/first',
      })
    }
  },

  // 跳转第二阶模板
  secondRoute() {
    if (wx.getStorageSync('status') != 2) {
      wx.navigateTo({
        url: '/pages/authentication/authentication',
      })
    } else {
      wx.navigateTo({
        url: '/pages/second/second',
      })
    }
  },

  // 跳转第三阶模板
  thirdRoute() {
    if (wx.getStorageSync('status') != 2) {
      wx.navigateTo({
        url: '/pages/authentication/authentication',
      })
    } else {
      wx.navigateTo({
        url: '/pages/third/third',
      })
    }
  },

  // 跳转高修模板
  fourthRoute() {
    if (wx.getStorageSync('status') != 2) {
      wx.navigateTo({
        url: '/pages/authentication/authentication',
      })
    } else {
      wx.navigateTo({
        url: '/pages/fourth/fourth',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})