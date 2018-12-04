// pages/contact/contact.js
const util = require('../../utils/util.js')
const app = getApp();
var aid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagedata: [],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    aid = options.aid;
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
    this.getActivitylist();
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
  getActivitylist: function () {

    let pd = []
    wx.request({
      url: util.baseUrl + "getParticipaters",
      data: {
        aid: aid
      },
      method: 'GET',
      success: res => {
        console.log(res.data)
        pd = res.data
        this.setData({
          pagedata: pd
        })

      },
      fail(res) {

      }
    })
  },
})