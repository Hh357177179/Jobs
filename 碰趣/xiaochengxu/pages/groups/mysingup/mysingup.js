// pages/mysingup/mysingup.js
const util = require('../../../utils/util.js')
import {
  postRequest
} from '../../../utils/HttpRequest'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SingupGroups: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMySingupGroups()
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

  },
  getMySingupGroups: function () {
    const submit_url = `${util.baseUrl}/getMySingupGroups`
    let params = {
      user_id:wx.getStorageSync("userId")
      //user_id:421
    }
    postRequest(submit_url, params, true).then(res => {
      let response = res.data
      this.setData({
        SingupGroups: response.info
      })
    })
  },

})