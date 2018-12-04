// pages/my/my.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    balanceMoney: 0,
    user_id: '',
    showRealName: true
  },

  // 实名认证
  goRealName: function(){
    wx.navigateTo({
      url: '/pages/realname/realname'
    })
  },

  closeRealName: function(){
    this.setData({
      showRealName: false
    })
  },


  // 获取账户余额
  // getBalance: function () {
  //   let _that = this
  //   const balanceUrl = `${util.baseUrl}api/balance/getBalance`
  //   wx.request({
  //     url: balanceUrl,
  //     method: 'POST',
  //     data: {
  //       "user_id": wx.getStorageSync("userId")
  //     },
  //     // header: {
  //     //   'content-type': 'application/x-www-form-urlencoded'
  //     // },
  //     success: res => {
  //       if (res.data.code == 200) {
  //         _that.setData({
  //           balanceMoney: parseInt(res.data.data.balance) + parseInt(res.data.data.lock_balance)
  //         })
  //       } else if (res.data.code == 1001) {
  //         wx.showToast({
  //           title: '用户不存在',
  //           icon: 'none',
  //           duration: 2000
  //         })
  //       }
  //       wx.stopPullDownRefresh()
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:wx.getStorageSync("userInfo"),
      user_id: wx.getStorageSync("userId")
    })
    console.log(wx.getStorageSync("userInfo"))
    // this.getBalance()
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
    // this.getBalance()
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
    // this.getBalance()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (e.from === 'button') {
    }
    return {
      title: '碰趣',
      path: '/pages/map/map',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }
})