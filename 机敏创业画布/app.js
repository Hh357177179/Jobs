//app.js
App({
  onLaunch: function (options) {
    this.getSq()
  },
  // 登录
  getSq() {
    let that = this
    wx.getSetting({
      success: resUserInfo => {
        console.log('获取用户信息', resUserInfo)
        if (resUserInfo.authSetting['scope.userInfo']) {
          console.log('已经授权')
          wx.getUserInfo({
            success: res => {
              console.log(123213,res)
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
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})