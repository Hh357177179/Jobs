// pages/login/login.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  logins () {
    wx.getUserInfo({
      success: resUserInfo => {
        console.log('获取到用户信息', resUserInfo)
        app.globalData.userInfo = resUserInfo.userInfo
        wx.login({
          success: resCode => {
            wx.request({
              url: `${util.baseUrl}/user/isLogin`,
              data: {
                code: resCode.code
              },
              method: 'POST',
              success: resLogin => {
                if (resLogin.data.code == 1002) {
                  wx.request({
                    url: `${util.baseUrl}/user/register`,
                    data: {
                      openid: resLogin.data.data.openid,
                      nickname: resUserInfo.userInfo.nickName,
                      avatar: resUserInfo.userInfo.avatarUrl
                    },
                    method: 'POST',
                    success: res => {
                      if (res.data.code == 200) {
                        app.globalData.openid = res.data.data.openid,
                        app.globalData.avatar = res.data.data.avatar,
                        app.globalData.nickname = res.data.data.nickname
                        wx.navigateBack()
                      } else {
                        util.showMsg(res.data.msg)
                      }
                    }
                  })
                } else {
                  app.globalData.openid = resLogin.data.data.openid,
                  app.globalData.avatar = resLogin.data.data.avatar,
                  app.globalData.nickname = resLogin.data.data.nickname
                  wx.navigateBack()
                }
              }
            })
          }
        })
      }
    })
  },


  btnGetUserInfo: function (e) {
    let that = this
    // console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log('授权成功')
      // 进行保存用户信息操作
      that.logins()
    } else {
      util.showMsg('拒绝授权将无法使用')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.logins()
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

  }
})