// pages/physician/physician.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAudit: false,
    showMain: false,
    page: 1,
    pagesize: 10,
    specialist: [],
    counts: ''
  },

  // 获取专家讲师列表
  getSpecialist () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/expert', params, true).then(res => {
      console.log(res)
      for (let i = 0,len = res.list.length;i < len; i ++ ) {
        if (res.list[i].record != '') {
          res.list[i].record = JSON.parse(res.list[i].record)
        }
      }
      that.setData({
        specialist: that.data.specialist.concat(res.list),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: `${util.baseUrl}/main/isLock`,
      success: res => {
        // console.log(123123,res)
        if (res.data.code == 200) {
          console.log('审核中')
          that.setData({
            showAudit: true
          })
        } else {
          that.setData({
            showMain: true
          })
        }
      }
    })
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
    let that = this
    that.setData({
      specialist: [],
      page: 1,
      pagesize: 10,
    })
    that.getSpecialist()
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
      that.getSpecialist()
    }
  }
})