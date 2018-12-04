// pages/study/study.js
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
    counts: 0,
    listArr: []
  },

  // 获取习学列表
  getStudyList () {
    let that = this
    let params = {
      token: app.globalData.openid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/myBrowseList', params, true).then(res => {
      console.log(res)
      let resopnse = res.list
      that.setData({
        listArr: that.data.listArr.concat(resopnse),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.openid)
    let that = this
    that.getStudyList()
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
      that.getStudyList()
    } else {
      util.showMsg('无更多数据')
    }
  }
})