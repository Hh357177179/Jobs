// pages/auditresult/auditresult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    let state = options.state
    that.setData({
      state: state,
      textStatus: state
    })
    if (options.reason) {
      that.setData({
        reason: options.reason
      })
    }
  },

  // 回到个人中心
  backMine () {
    wx.navigateBack()
  },

  // 从新填写入驻资料
  fillAgain () {
    wx.navigateTo({
      url: '/pages/storeenter/storeenter?again=' + 1,
    })
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