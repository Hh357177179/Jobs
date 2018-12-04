// pages/authentication/authentication.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pro_title: '',
    realName: '',
    userTel: ''
  },

  advPro_title(e) {
    let that = this
    that.setData({
      pro_title: e.detail.value
    })
  },
  advRealName(e) {
    let that = this
    that.setData({
      realName: e.detail.value
    })
  },
  advUserTel(e) {
    let that = this
    that.setData({
      userTel: e.detail.value
    })
  },

  showMsg(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },

  // 获取创始人认证状态
  getOriginator() {
    let that = this
    // console.log(that.data.pro_title, that.data.realName, that.data.userTel)
    if (that.data.pro_title == '') {
      that.showMsg('请填写项目名称')
    } else if (that.data.realName == '') {
      that.showMsg('请填写真实姓名')
    } else if (!that.data.userTel.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      that.showMsg('请填写正确手机号码')
    } else {
      wx.request({
        url: `${util.baseUrl}/user/authentication`,
        data: {
          token: wx.getStorageSync('openid'),
          project_title: that.data.pro_title,
          realname: that.data.realName,
          phone: that.data.userTel
        },
        success: res => {
          if (res.data.code == 200) {
            wx.setStorageSync('project_title', that.data.pro_title)
            wx.setStorageSync('realname', that.data.realName)
            wx.setStorageSync('phone', that.data.userTel)
            wx.setStorageSync('status', 2)
            wx.navigateBack()
          }
        }
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