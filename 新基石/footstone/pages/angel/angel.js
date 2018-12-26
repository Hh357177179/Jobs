// pages/angel/angel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesore: ''
  },

  // 日志
  loglist () {
    wx.navigateTo({
      url: '/pages/tslog/tslog',
    })
  },

  // 重置支付密码
  rResetPsw () {
    wx.navigateTo({
      url: '/pages/resetPsw/resetPsw',
    })
  },

  // 我的天使点
  meTransferR () {
    wx.navigateTo({
      url: '/pages/meTs/meTs',
    })
  },

  // 转让天使点
  transferR () {
    if (wx.getStorageSync('transfer_pass') == '') {
      wx.navigateTo({
        url: '/pages/resetPsw/resetPsw',
      })
    } else {
      wx.navigateTo({
        url: '/pages/transferSore/transferSore',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.setData({
      mesore: wx.getStorageSync("score")
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})