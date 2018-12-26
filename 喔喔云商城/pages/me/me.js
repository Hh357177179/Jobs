// pages/me/me.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meShow: false,
    noAttestation: false,
    userObj: {},
    balanceNum: '',
    drawNum: '',
    drawShow: false,
    focusBlur: false,
    page: 1,
    pagesize: 10,
    counts: 0,
    listArr: []
  },

  // 获取正在配送订单
  getNowList () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/peisongList', params, false).then(res => {
      console.log(res)
      that.setData({
        counts: res.count,
        listArr: that.data.listArr.concat(res.list)
      })
    })
  },

  // 跳转返利日志
  rebateLog () {
    wx.navigateTo({
      url: '/pages/rebate/rebate',
    })
  },

  rWithdraw () {
    this.setData({
      drawShow: true,
      focusBlur: true
    })
  },

  advDrawNum (e) {
    console.log(e.detail.value)
    let that = this
    that.setData({
      drawNum: e.detail.value
    })
  },

  closeMask () {
    this.setData({
      drawShow: false
    })
  },
  rNowDetail(e) {
    console.log(e)
    let orderId = e.currentTarget.dataset.ordid
    wx.navigateTo({
      url: '/pages/nowdelivery/nowdelivery?orderId=' + orderId,
    })
  },

  // 获取账户余额
  getBalance () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
    }
    postRequest('/main/myBalance', params, false).then(res => {
      console.log(res)
      that.setData({
        balanceNum: res.money
      })
    })
  },

  // 查看我的订单
  searchOrder () {
    wx.navigateTo({
      url: '/pages/meorder/meorder',
    })
  },

  // 验证手机号
  verifyTel () {
    wx.navigateTo({
      url: '/pages/verifytel/verifytel',
    })
  },

  drawBtn () {
    let that = this
    if (that.data.drawNum == '') {
      util.showMsg('请输入提现金额')
    } else {
      let params = {
        token: app.globalData.userInfo.openid,
        money: that.data.drawNum
      }
      postRequest('/main/withdraw', params, false).then(res => {
        console.log(res)
        wx.showToast({
          title: '您的提现申请已经提交，我们将在3个工作日内处理，请耐心等待',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          drawShow: false
        })
        that.getBalance()
      })
    }
  },

  // 跳转待领取
  waitGet () {
    wx.navigateTo({
      url: '/pages/meorder/meorder?type=' + 1,
    })
  },

  distribution () {
    wx.navigateTo({
      url: '/pages/meorder/meorder?type=' + 2,
    })
  },

  achieve () {
    wx.navigateTo({
      url: '/pages/meorder/meorder?type=' + 3,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo.id)
    let that = this
    that.setData({
      userObj: app.globalData.userInfo
    })
    that.getNowList()
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
    // if (app.globalData.userInfo.phone == '') {
    //   that.setData({
    //     noAttestation: true,
    //     meShow: false
    //   })
    // } else {
      that.setData({
        meShow: true,
        noAttestation: false
      })
    // }
    that.getBalance()
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
  onReachBottom: function () {
    console.log(1)
    let that = this
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      that.getNowList()
    } else {
      util.showMsg('无更多数据')
    }
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