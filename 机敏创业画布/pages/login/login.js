// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  btnGetUserInfo: function (e) {
    let that = this
    // console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      // console.log('授权成功')
      // 进行保存用户信息操作
      wx.getUserInfo({
        success: res => {
          console.log(123213, res)
          let userRes = res.userInfo
          // console.log('个人信息', userRes)
          wx.login({
            success: resCode => {
              // console.log('获取微信code', resCode.code)
              wx.request({
                url: 'https://ssl.zhaodaka.net/huabu/api/user/isLogin',
                data: {
                  code: resCode.code
                },
                success: resUser => {
                  if (resUser.data.code == 200) {
                    // console.log('保存用户信息', resUser)
                    wx.setStorageSync('avatar', resUser.data.data.avatar)
                    wx.setStorageSync('nickname', resUser.data.data.nickname)
                    wx.setStorageSync('openid', resUser.data.data.openid)
                    wx.setStorageSync('status', resUser.data.data.status)
                    wx.setStorageSync('project_title', resUser.data.data.status)
                    wx.setStorageSync('phone', resUser.data.data.status)
                    wx.setStorageSync('realname', resUser.data.data.status)
                    wx.navigateBack()
                  } else {
                    // console.log('没注册过的', resUser.data.data.openid)
                    wx.request({
                      url: 'https://ssl.zhaodaka.net/huabu/api/user/register',
                      data: {
                        openid: resUser.data.data.openid,
                        nickname: userRes.nickName,
                        avatar: userRes.avatarUrl
                      },
                      success: resRigister => {
                        // console.log(resRigister)
                        if (resRigister.data.code == 200) {
                          // console.log(resRigister)
                          wx.setStorageSync('avatar', resRigister.data.data.avatar)
                          wx.setStorageSync('nickname', resRigister.data.data.nickname)
                          wx.setStorageSync('openid', resRigister.data.data.openid)
                          wx.setStorageSync('status', resRigister.data.data.status)
                          wx.setStorageSync('project_title', resRigister.data.data.project_title)
                          wx.setStorageSync('phone', resRigister.data.data.phone)
                          wx.setStorageSync('realname', resRigister.data.data.realname)
                          wx.navigateBack()
                        }
                      }
                    })
                  }
                }
              })
            }
          })
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
      // wx.switchTab({
      //   url: '/pages/index/index',
      // })
        // {
        
      // })({
      //   url: '/pages/index/index',
      // })
    } else {
      wx.redirectTo({
        url: '/pages/index/index',
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