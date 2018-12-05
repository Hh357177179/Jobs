//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function(options) {
    // 检查是否授权
    wx.getSetting({
      success: userRes => {
        // console.log('授权', userRes)
        if (userRes.authSetting['scope.userInfo']) {
          // console.log('已经授权')
          wx.getUserInfo({
            success: resUserInfo => {
              // console.log('获取个人用户信息',resUserInfo)
              wx.login({
                success: resCode => {
                  // console.log('获取code',resCode)
                  wx.request({
                    url: `${util.baseUrl}/user/isLogin`,
                    data: {
                      code: resCode.code
                    },
                    method: 'POST',
                    success: resLogin => {
                      // console.log('检查是否注册', resLogin)
                      if (resLogin.data.code == 1002) {
                      // console.log('拿到openid去注册', resLogin.data.data.openid)
                      // console.log('用户信息', resUserInfo.userInfo.avatarUrl, resUserInfo.userInfo.nickName)
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
                              this.globalData.openid = res.data.data.openid,
                              this.globalData.avatar = res.data.data.avatar,
                              this.globalData.nickname = res.data.data.nickname
                            }
                          }
                        })
                      } else {
                        console.log(resLogin)
                        this.globalData.openid = resLogin.data.data.openid,
                        this.globalData.avatar = resLogin.data.data.avatar,
                        this.globalData.nickname = resLogin.data.data.nickname
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          // console.log('没授权')
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },

  onShow () {
    
  },

  globalData: {
    userInfo: '',
    avatar: '',
    openid: '',
    nickname: '',
    picId: null,
    uid: '',
    isIphoneX: null
  }
})