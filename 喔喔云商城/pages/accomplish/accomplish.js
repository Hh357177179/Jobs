// pages/finish/finish.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    orderObj: [],
    addressObj: {},
    allObj: {}
  },

  // 获取详情
  getDetails() {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      delivery_id: that.data.order_id
    }
    postRequest('/main/peisongDetail', params, true).then(res => {
      console.log(213, res)
      if (!res.goods_info) {
        that.setData({
          addressObj: res.address
        })
      } else {
        that.setData({
          orderObj: res.goods_info,
          addressObj: res.address
        })
      }
      that.setData({
        allObj: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderId)
    let that = this
    that.setData({
      order_id: options.orderId
    })
    that.getDetails()
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
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})