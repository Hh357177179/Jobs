// pages/starlog/starlog.js
import { postRequest } from '../../utils/httpRequest.js'
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [],
    pagesize: 10,
    page: 1,
    counts: 0
  },

  // 获取列表
  getList () {
    let t = this
    let params = {
      token: wx.getStorageSync('openid'),
      page: t.data.page,
      pagesize: t.data.pagesize
    }
    postRequest('/user/medalLog', params, true).then(res => {
      console.log(res)
      t.setData({
        counts: res.count,
        listArr: t.data.listArr.concat(res.list)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    var a = this;
    a.data.page * a.data.pagesize < a.data.counts && (a.setData({
      page: a.data.page + 1
    }), a.getList());
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})