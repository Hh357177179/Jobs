//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function() {
    console.log('apponload')
    // 登录
    // wx.login({
    //   success: resCode => {
    //     console.log('code',resCode.code)
    //     wx.request({
    //       url: `${util.baseUrl}/user/isLogin`,
    //       data: {
    //         code: resCode.code
    //       },
    //       method: "POST",
    //       success: resopenid => {
    //         console.log(123231,resopenid)
    //         console.log('openid',resopenid.data.data.openid)
    //         // 获取用户信息
    //         wx.getSetting({
    //           success: res => {
    //             if (res.authSetting['scope.userInfo']) {
    //               // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //               wx.getUserInfo({
    //                 success: res => {
    //                   // 可以将 res 发送给后台解码出 unionId
    //                   this.globalData.userInfo = res.userInfo

    //                   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                   // 所以此处加入 callback 以防止这种情况
    //                   if (this.userInfoReadyCallback) {
    //                     this.userInfoReadyCallback(res)
    //                   }
    //                 }
    //               })
    //             } else {
    //               console.log('未授权')
    //               wx.navigateTo({
    //                 url: '/pages/login/login',
    //               })
    //             }
    //           }
    //         })
    //       }
    //     })
    //   }
    // })

    // 检查是否授权
    wx.getSetting({
      success: userRes => {
        // console.log('授权', userRes)
        if (userRes.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框')
          wx.getUserInfo({
            success: resUserInfo => {
              // console.log('获取个人信息', resUserInfo)
              this.globalData.userInfo = resUserInfo.userInfo
              wx.login({
                success: resCode => {
                  // console.log('获取code', resCode.code)
                  wx.request({
                    url: `${util.baseUrl}/user/isLogin`,
                    data: {
                      code: resCode.code
                    },
                    method: "POST",
                    success: resLogin => {
                      // console.log('登录状态', resLogin)
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
                          method: "POST",
                          success: res => {
                            // console.log(res)
                            if (res.data.code == 200) {
                              this.globalData.openid = res.data.data.openid,
                              this.globalData.nickname = res.data.data.nickname,
                              this.globalData.avatar = res.data.data.avatar,
                              this.globalData.status = res.data.data.status,
                              this.globalData.identity = res.data.data.identity,
                              this.globalData.phone = res.data.data.phone,
                              this.globalData.realname = res.data.data.realname,
                              this.globalData.gender = res.data.data.gender
                              this.globalData.uid = res.data.data.id
                            } else {
                              util.showMsg(res.data.msg)
                            }
                          }
                        })
                      } else {
                        // console.log('已经注册过，返回用户信息',resLogin)
                        this.globalData.openid = resLogin.data.data.openid,
                        this.globalData.nickname = resLogin.data.data.nickname,
                        this.globalData.avatar = resLogin.data.data.avatar,
                        this.globalData.status = resLogin.data.data.status
                        this.globalData.identity = resLogin.data.data.identity,
                        this.globalData.phone = resLogin.data.data.phone,
                        this.globalData.realname = resLogin.data.data.realname,
                        this.globalData.gender = resLogin.data.data.gender,
                        this.globalData.uid = resLogin.data.data.id
                      }
                    }
                  })
                }
              })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(resUserInfo)
              }
            }
          })
        } else {
          // console.log('跳转授权页面')
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })

  },
  onShow() {
    // console.log('apponshow')
  },
  globalData: {
    userInfo: null,
    citys: '',
    openid: '',
    avatar: '',
    nickname: '',
    status: '',
    identity: '',
    phone: '',
    realname: '',
    gender: '',
    uid: ''
  }
})