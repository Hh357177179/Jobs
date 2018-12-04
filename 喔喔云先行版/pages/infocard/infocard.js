// pages/infocard/infocard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 点击激活
  btnActivate () {
    wx.showModal({
      title: '提示信息',
      content: '确认激活年卡吗？',
      cancelColor: '#666',
      confirmColor: '#F68B0E',
      confirmText: '激活',
      success: res => {
        if (res.confirm) {
          console.log('激活成功')
        } else {
          console.log('失败')
        }
      }
    })
  },

  // 转赠
  btnGiven () {

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

  }
})