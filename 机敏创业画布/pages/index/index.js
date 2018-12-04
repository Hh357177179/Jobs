//index.js
const util = require('../../utils/util.js')
//获取应用实例

Page({
  data: {
    homeList: [],
    page: 1,
    pagesize: 10,
    counts: ''
  },

  searchDetail (e) {
    // console.log(e.currentTarget.dataset.proid)
    if (e.currentTarget.dataset.proid == 1) {
      wx.navigateTo({
        url: '/pages/firstD/firstD?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.proid == 2) {
      wx.navigateTo({
        url: '/pages/secondD/secondD?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.proid == 3) {
      wx.navigateTo({
        url: '/pages/thirdD/thirdD?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/fourthD/fourthD?id=' + e.currentTarget.dataset.id,
      })
    }
    // console.log(e.currentTarget.dataset.id)
  },

  // 获取首页数据
  getHomeList () {
    let that = this
    wx.request({
      url: `${util.baseUrl}/main/projectList`,
      data: {
        token: wx.getStorageSync('openid'),
        page: '1',
        pagesize: '10'
      },
      success: res => {
        if (res.data.code == 200) {
          const response = res.data.data
          for (let i = 0; i < response.list.length; i++) {
            response.list[i].content = JSON.parse(response.list[i].content)
            response.list[i].version = ((response.list[i].version + 10) / 10).toFixed(1)
          }
          that.setData({
            homeList: response.list,
            counts: response.count
          })
          console.log(that.data.homeList)
        }
      }
    })
  },

  // 登录
  getSq () {
    let that = this
    wx.getSetting({
      success: resUserInfo => {
        // console.log('获取用户信息', resUserInfo)
        if (resUserInfo.authSetting['scope.userInfo']) {
          // console.log('已经授权')
          wx.getUserInfo({
            success: res => {
              let userRes = res.userInfo
              console.log('个人信息', userRes)
              wx.login({
                success: resCode => {
                  // console.log('获取微信code',resCode.code)
                  wx.request({
                    url: `${util.baseUrl}/user/isLogin`,
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
                        wx.setStorageSync('phone', resUser.data.data.phone)
                        wx.setStorageSync('realname', resUser.data.data.realname)
                        wx.setStorageSync('project_title', resUser.data.data.project_title)
                      } else {
                        // console.log('没注册过的',resUser.data.data.openid)
                        wx.request({
                          url: `${util.baseUrl}/user/register`,
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
                              wx.setStorageSync('phone', resRigister.data.data.phone)
                              wx.setStorageSync('realname', resRigister.data.data.realname)
                              wx.setStorageSync('project_title', resRigister.data.data.project_title)
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

  onLoad: function () {
    this.getSq()
  },
  onShow:function () {
    console.log('我是首页 onShow')
    this.setData({
      page: 1
    })
    this.getHomeList()
  },
  onReachBottom: function() {
    let _this = this
    if (_this.data.page * _this.data.pagesize < _this.data.counts) {
      _this.setData({
        page: _this.data.page += 1
      })
      wx.request({
        url: `${util.baseUrl}/main/projectList`,
        data: {
          token: wx.getStorageSync('openid'),
          page: _this.data.page,
          pagesize: _this.data.pagesize,
        },
        success: res => {
          if (res.data.code == 200) {
            const response = res.data.data
            for (let i = 0; i < response.list.length; i++) {
              response.list[i].content = JSON.parse(response.list[i].content)
              response.list[i].version = ((response.list[i].version + 10) / 10).toFixed(1)
            }
            _this.setData({
              homeList: _this.data.homeList.concat(response.list),
              counts: response.count
            })
          }
        }
      })
    }
  }
})
