// pages/detail/detail.js
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banArr:[],
    preCount: 1,
    allCount: '',
    id: '',
    detailObj: {},
    buyShow: false,
    buyNum: 1,
    bindName: 'article',
    article_content: ''
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },

  // 下单购买
  buyOrder () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      good_id: that.data.id,
      num: that.data.buyNum
    }
    console.log(params)
    postRequest('/main/goodOrderCreate', params, true).then(res => {
      console.log(res)
      let parOrder = {
        token: app.globalData.userInfo.openid,
        order_id: res.order_id
      }
      postRequest('/main/goodOrderPay', parOrder, true).then(res => {
        console.log(res)
        let configs = JSON.parse(res.config)
        wx.requestPayment({
          timeStamp: configs.timeStamp,
          nonceStr: configs.nonceStr,
          package: configs.package,
          signType: configs.signType,
          paySign: configs.paySign,
          'success': function (res) {
            console.log('购买成功',res)
            that.setData({
              buyShow: false
            })
            wx.redirectTo({
              url: '/pages/payment/payment'
            })
          },
          'fail': function (res) {
            console.log(res)
            // util.showMsg('购买失败！')
          },
        })
      })
    })
  },

  // 减
  buySubtract () {
    let that = this
    if (that.data.buyNum > 1) {
      that.setData({
        buyNum: that.data.buyNum - 1
      })
    }
  },

  // 加
  buyAdd () {
    let that = this
    if (that.data.buyNum < that.data.detailObj.stock ) {
      that.setData({
        buyNum: that.data.buyNum + 1
      })
    }
  },

  // 点击弹出购买
  openbot () {
    this.setData({
      buyShow: true,
    })
  },

  onClose () {
    this.setData({
      buyShow: false,
    })
  },

  // 轮播改变
  changePic (e) {
    // console.log(e)
    let curNum = e.detail.current
    let that = this
    that.setData({
      preCount: curNum + 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let that = this
    let id = options.id
    that.setData({
      id: id
    })
    let params = {
      id: id
    }
    postRequest('/main/goodsDetail', params, true).then(res => {
      console.log(res)
      // console.log(res.image.split('|'))
      let banarr = res.image.split('|')
      WxParse.wxParse('article', 'html', res.content, that, 20);
      that.setData({
        detailObj: res,
        banArr: banarr,
        allCount: banarr.length
      })
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
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})