// pages/perfectinfo/perfectinfo.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoname: '',   // 姓名
    infotel: '',  // 电话
    infolocal: '',  // 地址
  },

  // 输入姓名
  advinfoname (e) {
    let that = this
    that.setData({
      infoname: e.detail.value
    })
  },
  // 输入电话
  advinfotel(e) {
    let that = this
    that.setData({
      infotel: e.detail.value
    })
  },
  // 输入地址
  advinfolocal(e) {
    let that = this
    that.setData({
      infolocal: e.detail.value
    })
  },


  // 提交表单
  submit_info() {
    let that = this
    let params = {
      token: app.globalData.openid,
      realname: that.data.infoname,
      phone: that.data.infotel,
      address: that.data.infolocal
    }
    if (that.data.infoname == '') {
      util.showMsg('请输入姓名')
    } else if (!that.data.infotel.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('请输入正确电话号码')
    } else if (that.data.infolocal == '') {
      util.showMsg('请输入地址')
    } else {
      postRequest('/user/authentication', params, true).then(res => {
        console.log(res)
        app.globalData.realname = that.data.infoname,
        app.globalData.phone = that.data.phone,
        app.globalData.status = 2
        wx.switchTab({
          url: '/pages/index/index',
        })
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

  }
})