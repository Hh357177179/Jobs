// pages/mine/mine.js
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAudit: false,
    showMain: false,
    avatar: '',
    status: 1,
    nickname: '',
    identity: '',
    openid: '',
    uid: ''
  },

  // 跳转店铺特色
  storeSpecial () {
    wx.navigateTo({
      url: '/pages/storeSpecial/storeSpecial',
    })
  },

  // 跳转我的资料
  rMedata() {
    wx.navigateTo({
      url: '/pages/medata/medata',
    })
  },


  // 跳转到店铺入驻
  rStoreEnter() {
    let that = this
    wx.request({
      url: `${util.baseUrl}/main/getShop`,
      data: {
        token: that.data.openid
      },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.data.status == 0) {
          wx.navigateTo({
            url: `/pages/auditresult/auditresult?state=${1}&reason=${res.data.data.reason}`
          })
        } else if (res.data.data.status == 2) {
          app.globalData.status = 3
          that.setData({
            status: 3
          })
          wx.navigateTo({
            url: '/pages/auditresult/auditresult?state=' + 2,
          })
        } else if (res.data.data.status == 1) {
          wx.navigateTo({
            url: '/pages/auditresult/auditresult?state=' + 0,
          })
        } else {
          wx.navigateTo({
            url: '/pages/storeenter/storeenter',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    if (app.globalData.openid == '') {
      wx.showModal({
        title: '提示',
        content: '因为您没有授权，无法获取到个人信息',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    } else {
      // console.log('other获取到openid',app.globalData.openid)
      // console.log('认证状态', app.globalData.status)
      // console.log('姓名', app.globalData.nickname)
      // console.log('身份', app.globalData.identity)
      that.setData({
        avatar: app.globalData.avatar,
        status: app.globalData.status,
        nickname: app.globalData.nickname,
        openid: app.globalData.openid,
        uid: app.globalData.uid
      })
      if (app.globalData.identity != '') {
        that.setData({
          identity: app.globalData.identity,
        })
      }
    }
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

  }
})