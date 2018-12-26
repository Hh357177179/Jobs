// pages/delivery/delivery.js
const app = getApp()
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyShow: false,
    noAddress: false, // 新增地址
    choAddress: false, // 选择地址
    localObj: {},
    localNum: 0,
    cardList: [],
    buyNum: 15,
    shopArr: [],

    card_id: '',
    send_day: '',
    send_time: '',

    eggNum: '',
    eggCard: {},

    visible1: false,
    frameArr: ['8:00~15:00', '13:00~20:00'],
    cText: '',
    dayList: [],
    type: '',
    dateArr: []
  },
  

  radioListC(e) {
    let that = this
    console.log(e.detail.value)
    that.setData({
      send_day: e.detail.value,
      buyShow: false
    })
  },

  bindPickerChange(e) {
    let that = this
    console.log(e)
    if (e.detail.value == '0') {
      that.setData({
        cText: '8:00~15:00',
        send_time: '1'
      })
    } else {
      that.setData({
        cText: '13:00~20:00',
        send_time: '2'
      })
    }
  },

  // 点击弹出购买
  openbot() {
    let that = this
    if (that.data.card_id == '') {
      util.showMsg('未选择鸡蛋年卡')
    } else {
      that.setData({
        buyShow: true,
      })
      let params = {
        egg_type: that.data.type
      }
      // console.log(params)
      postRequest('/main/getStock', params, true).then(res => {
        // console.log(res)
        let arr = []
        let item = 0
        for (item of Object.keys(res)) {
          console.log('key: ', item, ',value: ', res[item])
          var obj = {}
          obj.key = item
          obj.value = res[item]
          arr.push(obj)
        }
        that.setData({
          dateArr: arr
        })
      })
    }
  },

  onClose() {
    this.setData({
      buyShow: false,
    })
  },

  ctype(e) {
    console.log(e)
    let that = this
    that.setData({
      type: e.currentTarget.dataset.type
    })
  },

  cRadioId(e) {
    let that = this
    console.log(e.detail.value)
    that.setData({
      card_id: e.detail.value
    })
  },

  // 减
  buySubtract() {
    let that = this
    if (that.data.buyNum > 15) {
      that.setData({
        buyNum: that.data.buyNum - 15
      })
    }
  },

  // 提交订单
  submitOrder() {
    let that = this
    if (that.data.address_id == '') {
      util.showMsg('未选择配送地址')
    } else if (that.data.card_id == '') {
      util.showMsg('未选择鸡蛋年卡')
    } else if (that.data.send_day == '') {
      util.showMsg('未选择配送日期')
    } else if (that.data.send_time == '') {
      util.showMsg('未选择配送时段')
    } else {
      let params = {
        token: app.globalData.userInfo.openid,
        address_id: that.data.localObj.id,
        card_id: that.data.card_id,
        order_ids: JSON.stringify(app.globalData.cid),
        egg_number: that.data.buyNum,
        send_day: that.data.send_day,
        send_time: that.data.send_time
      }
      console.log(params)
      postRequest('/main/delivery', params, false).then(res => {
        console.log(res)
        wx.showToast({
          title: '下单成功',
          icon: 'success',
          duration: 2000
        })
        app.globalData.cid = []
        app.globalData.itemArr = []
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/me/me',
          })
        }, 2000)
      })
    }
  },

  // 添加商品
  addCommodity() {
    wx.navigateTo({
      url: '/pages/cjoint/cjoint',
    })
  },

  // 加
  buyAdd() {
    let that = this
    if (that.data.card_id == '') {
      util.showMsg('请先选择年卡')
    } else if (that.data.send_day == '') {
      util.showMsg('请先选择日期')
    } else {
      that.setData({
        buyNum: that.data.buyNum + 15
      })
    }
  },

  // // 选择时段
  // cframe () {

  // },

  // 获取有效年卡
  getCardlist() {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
    }
    postRequest('/main/myYearCard', params, true).then(res => {
      console.log(res)
      that.setData({
        cardList: res
      })
    })
  },

  rClocal() {
    wx.navigateTo({
      url: '/pages/selectaddress/selectaddress',
    })
  },

  // 跳转新增收货地址
  rAddLocal() {
    wx.navigateTo({
      url: '/pages/addlocal/addlocal',
    })
  },

  // 我的地址
  getLocal() {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
    }
    postRequest('/user/addressList', params, true).then(res => {
      // console.log(res)
      if (res.length == 0) {
        that.setData({
          noAddress: true,
          choAddress: false,
        })
      } else {
        that.setData({
          noAddress: false,
          choAddress: true,
          localObj: res[app.globalData.aress]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
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
    let that = this
    console.log('选择商品的id', app.globalData.cid)
    that.setData({
      shopArr: app.globalData.itemArr
    })
    console.log('选择的商品', that.data.shopArr)
    that.getLocal()
    that.getCardlist()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})