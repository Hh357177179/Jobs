// pages/meorder/meorder.js
const util = require('../../utils/util.js')
const app = getApp()
import {
  postRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    page: 1,
    pagesize: 10,
    type: 2, // 1待领取 2正在配送 3已完成
    orderArr: [],
    counts: 0,
    meorderShow: false,
    idArr: [],
    noDataShow: false,
    nowDate: '',
    hasCard: [],
    distributionArr: [],
    finishArr:[]
  },

  sOrders (e) {
    console.log(e)
    let orderId = e.currentTarget.dataset.ordid
    wx.navigateTo({
      url: '/pages/finish/finish?orderId=' + orderId,
    })
  },
  rNowDetail (e) {
    console.log(e)
    let orderId = e.currentTarget.dataset.ordid
    wx.navigateTo({
      url: '/pages/nowdelivery/nowdelivery?orderId=' + orderId,
    })
  },

  rfinish (e) {
    let orderId = e.currentTarget.dataset.ordid
    wx.navigateTo({
      url: '/pages/accomplish/accomplish?orderId=' + orderId,
    })
  },

  // 点击切换
  changeTop(e) {
    let that = this
    let nums = e.currentTarget.dataset.num
    that.setData({
      num: nums,
      page: 1,
      orderArr: [],
      distributionArr: [],
      finishArr: []
    })
    if (nums == 1) {
      that.getMeOrder()
      that.getCardList()
    } else if (nums == 2) {
      that.getNowList()
    } else {
      that.getFinish()
    }
  },

  // 跳转下单页面
  buyOrder () {
    wx.navigateTo({
      url: '/pages/delivery/delivery',
    })
  },

  // 获取已完成订单
  getFinish () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/peisongDoneList', params, true).then(res => {
      console.log(res)
      if (res.list.length != 0) {
        that.setData({
          meorderShow: true,
          noDataShow: false
        })
      } else {
        that.setData({
          meorderShow: false,
          noDataShow: true
        })
      }
      that.setData({
        finishArr: that.data.finishArr.concat(res.list),
        counts: res.count
      })
    })
  },

  // 获取年卡列表
  getCardList () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
    }
    postRequest('/main/myYearCard', params, true).then(res => {
      console.log(res)
      that.setData({
        hasCard: res
      })
    })
  },

  // 获取正在配送
  getNowList () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/peisongList', params, true).then(res => {
      console.log(res)
      if (res.list.length != 0) {
        that.setData({
          meorderShow: true,
          noDataShow: false
        })
      } else {
        that.setData({
          meorderShow: false,
          noDataShow: true
        })
      }
      that.setData({
        distributionArr: that.data.distributionArr.concat(res.list),
        counts: res.count
      })
    })
  },


  // 获取我的订单列表
  getMeOrder() {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      type: 2,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/goodOrderList', params, true).then(res => {
      console.log(res)
      if (res.list.length != 0) {
        that.setData({
          meorderShow: true,
          noDataShow: false
        })
      } else {
        that.setData({
          meorderShow: false,
          noDataShow: true
        })
      }
      that.setData({
        orderArr: that.data.orderArr.concat(res.list),
        counts: res.count
      })
    })
  },

  // 下单配送
  rDelivery(e) {
    let that = this
    let item = e.currentTarget.dataset.item
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let arrC = []
    let strC = []
    arrC.push(id)
    strC.push(item)
    app.globalData.cid = arrC
    app.globalData.itemArr = strC
    wx.navigateTo({
      url: '/pages/delivery/delivery',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // 获取当前时间
    var myDate = new Date()
    var Y = myDate.getFullYear()
    var M = myDate.getMonth() + 1
    var D = myDate.getDate()
    that.setData({
      nowDate: `${Y}-${M}-${D}`
    })

    if (options.type == 1) {
      that.setData({
        num: options.type
      })
      that.getMeOrder()
      that.getCardList()
    } else if (options.type == 2) {
      that.setData({
        num: options.type
      })
      that.getNowList()
      console.log('正在配送')
    } else if (options.type == 3) {
      that.setData({
        num: options.type
      })
      console.log('已完成')
      that.getFinish()
    } else {
      that.getMeOrder()
      that.getCardList()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    console.log(that.data.num)
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      if (that.data.num == 1) {
        console.log('待领取')
        that.getMeOrder()
      } else if (that.data.num == 2) {
        console.log('正在配送')
        that.getNowList()
      } else if (that.data.num == 3) {
        console.log('已经完成')
        that.getFinish()
      }
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