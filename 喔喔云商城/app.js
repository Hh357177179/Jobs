//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function(options) {
    // console.log(options)
    // // 检查是否授权
    // wx.getSetting({
    //   success: userRes => {
    //     // console.log('授权',userRes)
    //     if (userRes.authSetting['scope.userInfo']) {
    //       wx.login({
    //         success: resCode => {
    //           // console.log('获取code', resCode.code)
    //           wx.request({
    //             url: `${util.baseUrl}/user/isLogin`,
    //             data: {
    //               code: resCode.code
    //             },
    //             method: 'POST',
    //             success: resLogin => {
    //               //  console.log('检查是否注册', resLogin.data)
    //               if (resLogin.data.code == 1002) {
    //                 //  console.log(resLogin.data.data)
    //                 wx.getUserInfo({
    //                   success: resUserInfo => {
    //                     // console.log('用户信息', resUserInfo.userInfo)
    //                     wx.request({
    //                       url: `${util.baseUrl}/user/register`,
    //                       data: {
    //                         openid: resLogin.data.data.openid,
    //                         nickname: resUserInfo.userInfo.nickName,
    //                         avatar: resUserInfo.userInfo.avatarUrl
    //                       },
    //                       method: 'POST',
    //                       success: res => {
    //                         //  console.log(res)
    //                         this.globalData.userInfo = res.data.data
    //                         this.globalData.openid = res.data.data.openid
    //                         this.globalData.avatar = res.data.data.avatar
    //                         this.globalData.id = res.data.data.id
    //                         this.globalData.nickname = res.data.data.nickname
    //                         this.globalData.phone = res.data.data.phone
    //                         this.globalData.pid = res.data.data.pid
    //                         this.globalData.status = res.data.data.status
    //                       }
    //                     })
    //                   }
    //                 })
    //               } else {
    //                 // console.log('已经注册过，返回用户信息', resLogin.data.data)
    //                 this.globalData.userInfo = resLogin.data.data
    //                 this.globalData.openid = resLogin.data.data.openid
    //                 this.globalData.avatar = resLogin.data.data.avatar
    //                 this.globalData.id = resLogin.data.data.id
    //                 this.globalData.nickname = resLogin.data.data.nickname
    //                 this.globalData.phone = resLogin.data.data.phone
    //                 this.globalData.pid = resLogin.data.data.pid
    //                 this.globalData.status = resLogin.data.data.status
    //               }
    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       // 没授权
    //       wx.redirectTo({
    //         url: '/pages/login/login',
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: '',
    avatar: '',
    id: '',
    nickname: '',
    openid: '',
    phone: '',
    pid: 0,
    status: '',
    money: '',
    aress: 0,
    cid: [],
    itemArr: [],
    scene: ''
  }
})