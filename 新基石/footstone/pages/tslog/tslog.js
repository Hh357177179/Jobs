// pages/tslog/tslog.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pagesize: 10,
    counts: 0,
    logArr: []
  },

  // 获取转账日志
  getLogList () {
    let t = this
    let params = {
      token: wx.getStorageSync('openid'),
      page: t.data.page,
      pagesize: t.data.pagesize
    }
    postRequest('/main/transferLog', params).then(res => {
      console.log(res)
      t.setData({
        logArr: t.data.logArr.concat(res.list),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLogList()
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
    var t = this;
    t.data.page * t.data.pagesize < t.data.counts && (t.setData({
      page: t.data.page += 1
    }), t.getLogList());
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})