// pages/meset/meset.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    browse: '',
    collection: '',
    comment: '',
    like: '',
    share: ''
  },

  // 获取各种数量
  getAllCount () {
    let params = {
      token: app.globalData.openid
    }
    postRequest('/user/myAllCount', params, true).then(res => {
      // console.log(res)
      this.setData({
        browse: res.browse.count,
        collection: res.collection.count,
        comment: res.comment.count,
        like: res.like.count,
        share: res.share.count
      })
    })
  },

  // 跳转我的评论
  cComment () {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },

  // 跳转我的分享
  cShare () {
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },

  // 跳转点赞
  cPraise () {
    wx.navigateTo({
      url: '/pages/praise/praise',
    })
  },

  // 跳转共创力
  cTogether () {
    wx.navigateTo({
      url: '/pages/creation/creation',
    })
  },

  // 跳转习学
  cStudy () {
    wx.navigateTo({
      url: '/pages/study/study',
    })
  },
  
  // 跳转我的收藏
  cCollect () {
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllCount()
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