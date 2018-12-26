//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    nickName: '',
    avatar: ''
  },

  // 跳转我的
  setMe () {
    wx.navigateTo({
      url: '/pages/meset/meset',
    })
  },

  // 跳转设置
  homeSet () {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  // 跳转项目广场
  squareR () {
    wx.navigateTo({
      url: '/pages/square/square',
    })
  },

  // 跳转战术小组
  groupR () {
    wx.navigateTo({
      url: '/pages/group/group',
    })
  },

  // 跳转资料库
  libraryRoute() {
    wx.navigateTo({
      url: '/pages/library/library',
    })
  },

  // 跳转到图解
  RoutePic () {
    wx.navigateTo({
      url: '/pages/picHome/picHome',
    })
  },

  onLoad: function(options) {
    console.log(12312312321,options)
    if (JSON.stringify(options) != "{}") {
      console.log('扫码')
      let scene = decodeURIComponent(options.scene)
      console.log(scene)
      let param = scene.split("&")
      let types = param[0].split('=')[1]
      let proId = param[1].split('=')[1]
      console.log(types, proId)
      if (types == '1') {
        wx.navigateTo({
          url: `/pages/picHome/picHome?pids=${proId}`,
        })
      } else if (types == '2') {
        wx.navigateTo({
          url: `/pages/bookDetail/bookDetail?id=${proId}`,
        })
      } else if (types == '3') {
        wx.navigateTo({
          url: `/pages/botdetail/botdetail?sid=${proId}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/groupDetail/groupDetail?gid=${proId}`,
        })
      }
      console.log(types,proId)
    } else {
      console.log('正常进入')
    }
  },

  onShow: function () {
    wx.showLoading({
      title: '正在加载...',
      mask: 'true'
    })
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
                console.log('检查是否注册', resLogin)
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
                      // if (res.data.code == 200) {
                        app.globalData.openid = res.data.data.openid,
                          app.globalData.avatar = res.data.data.avatar,
                          app.globalData.nickname = res.data.data.nickname
                        this.setData({
                          nickName: res.data.data.nickname,
                          avatar: res.data.data.avatar
                        })
                      // }
                    }
                  })
                } else {
                  console.log(resLogin)
                  app.globalData.openid = resLogin.data.data.openid,
                  app.globalData.avatar = resLogin.data.data.avatar,
                  app.globalData.nickname = resLogin.data.data.nickname
                  this.setData({
                    nickName: resLogin.data.data.nickname,
                    avatar: resLogin.data.data.avatar
                  })
                }
              }
            })
          }
        })
      }
    })
    wx.hideLoading()
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})