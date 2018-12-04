// pages/square/square.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pagesize: 7,
    spuareArr:[],
    counts: 0
  },

  // 获取项目列表
  getSquareList () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/projectList', params, true).then(res => {
      console.log(res)
      that.setData({
        spuareArr: that.data.spuareArr.concat(res.list),
        counts: res.count
      })
    })
  },

  // 跳转项目详情
  sgDetail (e) {
    // console.log(e.currentTarget.dataset.sid)
    let sid = e.currentTarget.dataset.sid
    wx.navigateTo({
      url: '/pages/botdetail/botdetail?sid=' + sid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSquareList()
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
    let that = this
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      that.getSquareList()
    } else {
      util.showMsg('无更多数据')
    }
  }
})