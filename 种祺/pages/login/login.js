// pages/login/login.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 授权流程
  logins() {
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.getUserInfo({
      success: resUserInfo => {
        console.log('获取到用户信息', resUserInfo)
        app.globalData.userInfo = resUserInfo.userInfo
        wx.login({
          success: resCode => {
            console.log('获取到code换openid', resCode.code)
            wx.request({
              url: `${util.baseUrl}/user/isLogin`,
              data: {
                code: resCode.code
              },
              method: "POST",
              success: resLogin => {
                console.log('用户登录状态', resLogin)
                if (resLogin.data.code == 1002) {
                  console.log('拿到openid去注册', resLogin.data.data.openid)
                  console.log('拿到用户信息去注册', resUserInfo.userInfo.avatarUrl, resUserInfo.userInfo.nickName)
                  wx.request({
                    url: `${util.baseUrl}/user/register`,
                    data: {
                      openid: resLogin.data.data.openid,
                      nickname: resUserInfo.userInfo.nickName,
                      avatar: resUserInfo.userInfo.avatarUrl
                    },
                    method: "POST",
                    success: res => {
                      console.log(res)
                      if (res.data.code == 200) {
                        app.globalData.openid = res.data.data.openid,
                        app.globalData.nickname = res.data.data.nickname,
                        app.globalData.avatar = res.data.data.avatar,
                        app.globalData.status = res.data.data.status,
                        app.globalData.identity = res.data.data.identity,
                        app.globalData.phone = res.data.data.phone,
                        app.globalData.realname = res.data.data.realname,
                        app.globalData.gender = res.data.data.gender,
                        app.globalData.uid = res.data.data.id
                        wx.hideLoading()
                        wx.navigateBack()
                      } else {
                        util.showMsg(res.data.msg)
                      }
                    }
                  })
                } else {
                  console.log('已经注册过的保存用户信息', resLogin)
                  app.globalData.openid = resLogin.data.data.openid,
                  app.globalData.nickname = resLogin.data.data.nickname,
                  app.globalData.avatar = resLogin.data.data.avatar,
                  app.globalData.status = resLogin.data.data.status,
                  app.globalData.identity = resLogin.data.data.identity,
                  app.globalData.phone = resLogin.data.data.phone,
                  app.globalData.realname = resLogin.data.data.realname,
                  app.globalData.gender = resLogin.data.data.gender
                  app.globalData.uid = resLogin.data.data.id
                  wx.hideLoading()
                  wx.navigateBack()
                }
              }
            })
          }
        })
      }
    })
  },

  btnGetUserInfo(e) {
    if (e.detail.userInfo) {
      console.log('授权成功')
      // 保存用户信息
      this.logins()
    } else {
      wx.showModal({
        title: '授权提示',
        content: '如果拒绝授权，可能会导致无法正常使用该小程序',
        confirmText: '开启授权',
        confirmColor: '#345391',
        cancelText: '仍然拒绝',
        cancelColor: '#999999',
        success: res => {
          if (res.confirm) {
            wx.openSetting({
              success: res => {
                console.log(res)
                console.log('open授权之后')
                if (res.authSetting['scope.userInfo'] == true) {
                  this.logins()
                } else {
                  util.showMsg('授权失败')
                }
              }
            })
          } else {
            wx.navigateBack()
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    // this.btnGetUserInfo()
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
})