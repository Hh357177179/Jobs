//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    // 检查是否授权
    wx.getSetting({
      success: userRes => {
        // console.log('授权',userRes)
        if (userRes.authSetting['scope.userInfo']) {
          // 已经授权
          wx.getUserInfo({
            success: resUserInfo => {
              //  console.log('获取个人用户信息',resUserInfo)
               this.globalData.userInfo = resUserInfo.userInfo
               wx.login({
                 success: resCode => {
                  //  console.log('获取code', resCode.code)
                   wx.request({
                     url: `${util.baseUrl}/user/isLogin`,
                     data: {
                       code: resCode.code
                     },
                     method: 'POST',
                     success: resLogin => {
                      //  console.log('检查是否注册', resLogin)
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
                              this.globalData.nickname = res.data.data.nickname,
                              this.globalData.status = res.data.data.status,
                              this.globalData.uid = res.data.data.uid
                              if (res.data.data.status == 1) {
                                wx.redirectTo({
                                  url: '/pages/perfectinfo/perfectinfo'
                                })
                              } else {
                                wx.switchTab({
                                  url: '/pages/index/index',
                                })
                              }
                            } else {
                              util.showMsg(res.data.msg)
                            }
                          }
                        })
                       } else {
                        //  console.log('已经注册过，返回用户信息',resLogin)
                         this.globalData.openid = resLogin.data.data.openid,
                         this.globalData.avatar = resLogin.data.data.avatar,
                         this.globalData.nickname = resLogin.data.data.nickname,
                         this.globalData.status = resLogin.data.data.status,
                          this.globalData.uid = resLogin.data.data.uid
                         if (resLogin.data.data.status == 1) {
                           wx.redirectTo({
                             url: '/pages/perfectinfo/perfectinfo'
                           })
                         } else {
                           wx.switchTab({
                             url: '/pages/index/index',
                           })
                         }
                       }
                     }
                   })
                 }
               })
            }
          })
        } else {
          // 没授权
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: '',
    avatar: '',
    nickname: '',
    status: null,
    phone: '',
    realname: '',
    address: '',
    uid: null
  }
})