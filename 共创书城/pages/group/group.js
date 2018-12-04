// pages/group/group.js
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
    groupArr: [],
    counts: 0
  },

  // 跳转详情
  groupDetail (e) {
    let gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/groupDetail/groupDetail?gid=' + gid,
    })
  },

  // 获取战术小组列表
  getGroupList() {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/groupList', params, true).then(res => {
      console.log(res)
      that.setData({
        groupArr: that.data.groupArr.concat(res.list),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupList()
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
      that.getGroupList()
    } else {
      util.showMsg('无更多数据')
    }
  }
})