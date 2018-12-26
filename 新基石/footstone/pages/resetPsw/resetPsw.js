// pages/resetPsw/resetPsw.js
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    transfer_pass: '',
    codeMsg: "发送验证码",
    codeBtn: false
  },

  advcode(e) {
    let that = this
    that.setData({
      code: e.detail.value
    })
  },
  advtransferpass(e) {
    let that = this
    that.setData({
      transfer_pass: e.detail.value
    })
  },

  getCode() {
    let that = this
    let params = {
      token: wx.getStorageSync('openid')
    }
    postRequest('/user/transferSms', params).then(res => {
      console.log(res)
      var o = 60,
        t = setInterval(() => {
          that.setData({
            codeMsg: o + "s",
            codeBtn: true
          }), 0 == o && (clearInterval(t), that.setData({
            codeMsg: "发送验证码",
            codeBtn: false
          })), o -= 1;
        }, 1e3);
    })
  },

  subBtn() {
    let that = this
    if (that.data.code == '') {
      util.showMsg('验证码不能为空')
    } else if (that.data.transfer_pass == '') {
      util.showMsg('密码不能为空')
    } else {
      let params = {
        token: wx.getStorageSync('openid'),
        code: that.data.code,
        transfer_pass: that.data.transfer_pass
      }
      console.log(params)
      postRequest('/main/setTransferPass', params).then(res => {
        console.log(res)
        wx.setStorageSync('transfer_pass', that.data.transfer_pass)
        util.showMsg('设置成功')
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})