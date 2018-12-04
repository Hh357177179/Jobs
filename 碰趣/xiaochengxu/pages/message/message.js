// pages/message/message.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagedate:[],
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user_id = options.user_id
    this.setData({
      user_id: user_id
    })
    this.getMyComments()
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
  ,
  getMyComments(){
    wx.request({
      url: util.baseUrl + 'getMyComments',
      method: 'GET',
      data: {
        uid: this.data.user_id
      },
      success: res => {
        if (res.data.length != 0) {
          this.setData({
            pagedata: res.data
          })
        } else {
          util.showMsg('暂无数据')
        }
      },
      fail: res => {
        util.showMsg("网络错误")
      }
    })
  }
})