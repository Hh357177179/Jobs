// pages/transferSore/transferSore.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to_phone: '',
    number: '',
    transfer_pass: '',
    note: '',
    sort: ''
  },

  advto_phone (e) {
    console.log(e)
    let t = this
    t.setData({
      to_phone: e.detail.value
    })
  },

  advnumber(e) {
    let t = this
    t.setData({
      number: e.detail.value
    })
  },
  advtransfer_pass(e) {
    let t = this
    t.setData({
      transfer_pass: e.detail.value
    })
  },
  advnote(e) {
    let t = this
    t.setData({
      note: e.detail.value
    })
  },

  // 转赠
  transferSub () {
    let t = this
    if (!t.data.to_phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('请输入手机号码')
    } else if (t.data.number == '') {
      util.showMsg('请输入转赠数量')
    } else if (t.data.transfer_pass == '') {
      util.showMsg('请输入支付密码')
    } else {
      let params = {
        token: wx.getStorageSync('openid'),
        to_phone: t.data.to_phone,
        number: t.data.number,
        note: t.data.note,
        transfer_pass: t.data.transfer_pass
      }
      postRequest('/main/transfer', params).then(res => {
        console.log(res)
        util.showMsg('转赠成功！')
        let scores = parseInt(parseInt(wx.getStorageSync('score')) - parseInt(t.data.number))
        wx.setStorageSync('score', scores)
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(123123,options)
    let that = this
    let a = options.q
    if (a) {
      var o = decodeURIComponent(a)
      var n = o.split("phone=");
      console.log(o)
      console.log(n[1])
      that.setData({
        to_phone: n[1]
      })
    }
    that.setData({
      sort: wx.getStorageSync("score")
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
  // onShareAppMessage: function () {

  // }
})