// pages/login/login.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  logis () {
    console.log('点击授权')
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.login({
      success: resCode => {
        // console.log('获取code', resCode.code)
        wx.request({
          url: `${util.baseUrl}/user/isLogin`,
          data: {
            code: resCode.code
          },
          method: 'POST',
          success: resLogin => {
            // console.log('检查是否注册', resLogin.data)
            if (resLogin.data.code == 1002) {
              //  console.log(resLogin.data.data)
              wx.getUserInfo({
                success: resUserInfo => {
                  // console.log('用户信息', resUserInfo.userInfo)
                  wx.request({
                    url: `${util.baseUrl}/user/register`,
                    data: {
                      openid: resLogin.data.data.openid,
                      nickname: resUserInfo.userInfo.nickName,
                      avatar: resUserInfo.userInfo.avatarUrl
                    },
                    method: 'POST',
                    success: res => {
                      //  console.log(res)
                      app.globalData.userInfo = res.data.data
                      app.globalData.openid = res.data.data.openid
                      app.globalData.avatar = res.data.data.avatar
                      app.globalData.id = res.data.data.id
                      app.globalData.nickname = res.data.data.nickname
                      app.globalData.phone = res.data.data.phone
                      app.globalData.pid = res.data.data.pid
                      app.globalData.status = res.data.data.status
                      wx.hideLoading()
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }
                  })
                }
              })
            } else {
              // console.log('已经注册过，返回用户信息', resLogin.data.data)
              app.globalData.userInfo = resLogin.data.data
              app.globalData.openid = resLogin.data.data.openid
              app.globalData.avatar = resLogin.data.data.avatar
              app.globalData.id = resLogin.data.data.id
              app.globalData.nickname = resLogin.data.data.nickname
              app.globalData.phone = resLogin.data.data.phone
              app.globalData.pid = resLogin.data.data.pid
              app.globalData.status = resLogin.data.data.status
              wx.hideLoading()
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  },

  // 点击授权按钮
  // 授权按钮
  btnGetUserInfo(e) {
    if (e.detail.userInfo) {
      console.log('授权成功')
      // 保存用户信息
      // this.logis()
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      util.showMsg('拒绝授权将无法使用')
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})