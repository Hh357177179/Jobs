// pages/changeTel/changeTel.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeText: '发送验证码',
    old_phone: '',
    new_phone_code: '',
    new_phone: '',
    codeBtn: false
  },

  advoldphone (e) {
    let that = this
    console.log(e)
    that.setData({
      old_phone: e.detail.value
    })
  },
  advnewphone(e) {
    let that = this
    console.log(e)
    that.setData({
      new_phone: e.detail.value
    })
  },
  advnewcode(e) {
    let that = this
    console.log(e)
    that.setData({
      new_phone_code: e.detail.value
    })
  },

  getCode () {
    let that = this
    if (that.data.new_phone != '') {
      let params = {
        phone: that.data.new_phone
      }
      postRequest('/user/sms', params).then(res => {
        console.log(res)
        var o = 60
        var t = setInterval(function () {
          that.setData({
            codeText: o + "s",
            codeBtn: true
          }), 0 == o && (clearInterval(t), that.setData({
            codeText: "发送验证码",
            codeBtn: false
          })), o -= 1;
        }, 1e3);
      })
    } else {
      util.showMsg('请输入手机号码')
    }
  },

  subBtn () {
    let that = this
    let params = {
      token: wx.getStorageSync('openid'),
      old_phone: that.data.old_phone,
      new_phone: that.data.new_phone,
      new_phone_code: that.data.new_phone_code
    }
    postRequest('/user/changePhone', params).then(res => {
      console.log(res)
      wx.setStorageSync('phone', that.data.new_phone)
      util.showMsg('修改成功')
      setTimeout(() =>{
        wx.navigateBack()
      }, 2000)
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})