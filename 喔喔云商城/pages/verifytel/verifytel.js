// pages/verifytel/verifytel.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDis: false,
    codeText: '获取验证码',
    phone: '',
    code: ''
  },

  // 获取验证码
  getCode () {
    let that = this
    if (!that.data.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('手机号不正确')
    } else {
      console.log(that.data.phone)
      let params = {
        phone: that.data.phone
      }
      postRequest('/user/sms',params, false).then(res => {
        console.log(res)
        var o = 60
        var t = setInterval(function () {
          that.setData({
            codeText: o + "s",
            btnDis: true
          }), 0 == o && (clearInterval(t), that.setData({
            codeText: "发送验证码",
            btnDis: false
          })), o -= 1;
        }, 1e3);
      })
    }
  },

  verifyBtn () {
    let that = this
    if (!that.data.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('手机号不正确')
    } else if (that.data.code == '') {
      util.showMsg('请填写验证码')
    }
    let params = {
      token: app.globalData.userInfo.openid,
      phone: that.data.phone,
      code: that.data.code
    }
    postRequest('/user/bindPhone', params, true).then(res => {
      console.log(res)
      app.globalData.userInfo.phone = that.data.phone
      wx.navigateBack()
    })
  },

  // 监听手机号码
  advPhone (e) {
    let that = this
    // console.log(e)
    that.setData({
      phone: e.detail.value
    })
  },

  // 监听验证码
  advCode (e) {
    let that = this
    // console.log(e)
    that.setData({
      code: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
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
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})