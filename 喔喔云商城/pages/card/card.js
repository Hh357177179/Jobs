// pages/yearcard/yearcard.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actNum: '',
    actPsw: '',
    activeShow: false,
    buyShow: false,
    buyArr: [],
    cardId: '',
    order_id: '',
    cardArr: [],
    configs: {},
    timeStamp: ''
  },

  advActNum (e) {
    let that = this
    that.setData({
      actNum: e.detail.value
    })
  },

  advActPsw (e) {
    let that = this
    let cardPsws = e.detail.value
    that.setData({
      actPsw: cardPsws
    })
  },

  activeBtn () {
    let that = this
    if (that.data.actNum == '') {
      util.showMsg('请输入卡号')
    } else if (that.data.actPsw == '') {
      util.showMsg('请输入密码')
    } else {
      let params = {
        token: app.globalData.userInfo.openid,
        card_no: that.data.actNum,
        card_pass: that.data.actPsw
      }
      console.log(params)
      // postRequest('/main/cardGift', params, false).then(res => {
      //   console.log(res)
      //   wx.showToast({
      //     title: '激活成功',
      //     icon: 'success',
      //     duration: 1500
      //   })
      //   that.setData({
      //     actNum: '',
      //     actPsw: '',
      //     activeShow: false
      //   })
      // })
    }
  },

  closeActive () {
    let that = this
    that.setData({
      activeShow: false
    })
  },

  // 激活年卡
  activeCard () {
    let that = this
    that.setData({
      activeShow: true
    })
  },

  // 跳转年卡介绍
  rCardInfo () {
    wx.navigateTo({
      url: '/pages/cardinfo/cardinfo',
    })
  },

  // 跳转下单配送
  rDelivery () {
    wx.navigateTo({
      url: '/pages/delivery/delivery',
    })
  },

  // 点击购买年卡
  buyCard () {
    console.log(1)
    let that = this
    let params = {}
    postRequest('/main/cardList', params, true).then(res => {
      console.log(res)
      that.setData({
        buyArr: res,
        buyShow: true
      })
    })
  },
  
  // 跳转年卡信息
  cardInfo (e) {
    let str = e.currentTarget.dataset.str
    let cardinfo = JSON.stringify(str)
    wx.navigateTo({
      url: `/pages/infocard/infocard?str=` + cardinfo,
    })
  },
  
  closeMask () {
    let that = this
    that.setData({
      buyShow: false
    })
  },

  // 获取我的年卡列表
  getCardList () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
    }
    postRequest('/main/myCardList', params, false).then(res => {
      for (var i = 0, len = res.length; i < len; i++) {
        console.log(res[i])
        console.log(new Date(res[i].expire_time).getTime())
        if (that.data.timeStamp + 1000 * 60 * 60 * 24 * 10 == new Date(res[i].expire_time).getTime()) {
          res[i].showDate = 1
        } else {
          res[i].showDate = 0
        }
      }
      that.setData({
        cardArr: res
      })
      console.log(res)
    })
  },

  radioChange (e) {
    console.log(e)
    let that = this
    let cid = e.detail.value
    that.setData({
      cardId: cid
    })
  },

  // 购买年卡
  buyBtn () {
    let that = this
    console.log(that.data.cardId)
    let params = {
      token: app.globalData.userInfo.openid,
      card_id: that.data.cardId
    }
    postRequest('/main/cardOrderCreate', params, true).then(res => {
      console.log(res)
      let pOrder = {
        token: app.globalData.userInfo.openid,
        order_id: res.order_id
      }
      postRequest('/main/cardOrderPay', pOrder, true).then(res => {
        let configs = JSON.parse(res.config)
        wx.requestPayment({
          timeStamp: configs.timeStamp,
          nonceStr: configs.nonceStr,
          package: configs.package,
          signType: configs.signType,
          paySign: configs.paySign,
          'success': function (res) {
            console.log(res)
            that.setData({
              buyShow: false
            })
          },
          'fail': function (res) {
            console.log(res)
            util.showMsg('购买失败！')
           },
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
    console.log(app.globalData.scene)
    let that = this
    var time = new Date().getTime()
    // console.log(time)
    // console.log(time + 1000*60*60*24*10)
    that.setData({
      timeStamp: time
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
    if (app.globalData.scene) {
      console.log('扫码绑定')
      wx.request({
        url: `${util.baseUrl}/main/receiveCardGift`,
        data: {
          token: app.globalData.userInfo.openid,
          card_sn: app.globalData.scene
        },
        method: 'POST',
        success: res => {
          console.log(res)
          app.globalData.scene = ''
          if (res.data.code == 200) {
            console.log('领取年卡成功')
            util.showMsg('领取年卡成功')
          } else {
            console.log('失败')
            util.showMsg(res.data.msg)
          }
          this.getCardList()
        }
      })
    } else {
      console.log('正常进入')
      this.getCardList()
    }
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