// pages/deposits/deposits.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    money: '',
    allBalance: 0,
    userbalance: 0
  },

  // 提现金额数值监听
  checkVal: function (e) {
    this.data.money = e.detail.value
  },
  // 申请提现
  withdraws: function () {
    let that = this
    const withdrawUrl = `${util.baseUrl}api/balance/withdraw`
    wx.request({
      url: withdrawUrl,
      method: 'POST',
      data: {
        "user_id": wx.getStorageSync("userId"),
        "money": that.data.money
      },
      success: res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '提现成功',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              setTimeout(() => {
                wx.switchTab({
                  url: '../my/my'
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: '提现失败！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 提现逻辑
  trueWithdraw: function () {
    if (this.data.money < 2) {
      wx.showToast({
        title: '金额最少为￥2',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.money > this.data.userbalance) {
      wx.showToast({
        title: '可用余额不足！',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认提现？',
        success: res => {
          if (res.confirm) {
            console.log(1)
            this.withdraws()
          } else if (res.cancel) { }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _that = this
    const balanceUrl = `${util.baseUrl}api/balance/getBalance`
    wx.request({
      url: balanceUrl,
      method: 'POST',
      data: {
        "user_id": wx.getStorageSync("userId")
      },
      success: res => {
        if (res.data.code == 200) {
          _that.setData({
            allBalance: parseInt(res.data.data.balance) + parseInt(res.data.data.lock_balance),
            userbalance: res.data.data.balance
          })
        } else if (res.data.code == 1001) {
          wx.showToast({
            title: '用户不存在',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
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
  onShareAppMessage: function () {

  }
})