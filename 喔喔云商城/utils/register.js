const util = require('./util.js')
const app = getApp()
const logins = function () {
  // 检查是否授权
  wx.getSetting({
    success: userRes => {
      // console.log('授权',userRes)
      if (userRes.authSetting['scope.userInfo']) {
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
                //  console.log('检查是否注册', resLogin.data)
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
                }
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
}

module.exports = {
  logins: logins
}