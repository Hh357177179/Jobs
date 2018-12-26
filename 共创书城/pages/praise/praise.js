// pages/praise/praise.js
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
    praiseArr: [],
    counts: 0
  },

  detailR(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type
    let sid = e.currentTarget.dataset.sid
    if (type == 1) {
      wx.navigateTo({
        url: '/pages/picHome/picHome?pids=' + sid,
      })
    } else if (type == 2) {
      wx.navigateTo({
        url: '/pages/bookDetail/bookDetail?id=' + sid,
      })
    } else if (type == 3) {
      wx.navigateTo({
        url: '/pages/botdetail/botdetail?sid=' + sid,
      })
    } else if (type == 4) {
      wx.navigateTo({
        url: '/pages/groupDetail/groupDetail?gid=' + sid,
      })
    }
  },

  // 获取我的点赞列表
  getPraiseList() {
    let that = this
    let params = {
      token: app.globalData.openid,
      cate: '1',
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/myList', params, true).then(res => {
      console.log(res)
      that.setData({
        praiseArr: that.data.praiseArr.concat(res.list),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPraiseList()
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
      that.getPraiseList()
    } else {
      util.showMsg('无更多数据')
    }
  }
})