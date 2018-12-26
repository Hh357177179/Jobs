//index.js
//获取应用实例
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
import { logins } from '../../utils/register.js'
const app = getApp()

Page({
  data: {
    topObj: {},
    page: 1,
    pagesize: 10,
    counts: 0,
    commodityArr: [],
    noDataShow: false,
    imgUrls: [],
    autoplay: true,
    duration: 1000,
    interval: 2500,
    circular: true
  },

  rCard () {
    wx.switchTab({
      url: '/pages/card/card',
    })
  },

  // 获取banner
  getBanner () {
    let that = this
    let params = {}
    postRequest('/main/banner', params, true).then(res => {
      console.log(res)
      that.setData({
        imgUrls: res
      })
    })
  },

  // 跳转商品详情
  skipDetail (e) {
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  // 获取置顶商品
  getTopShop () {
    let that = this
    let params = {}
    postRequest('/main/goodsListStick', params, true).then(res => {
      // console.log(res)
      that.setData({
        // topObj: res[0]
      })
    })
  },

  // 获取推荐列表
  getRecomList () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/goodsList', params, true).then(res => {
      // console.log(res)
      that.setData({
        counts: res.count,
        commodityArr: that.data.commodityArr.concat(res.list)
      })
    })
  },

  logins () {
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
                            avatar: resUserInfo.userInfo.avatarUrl,
                            pid: app.globalData.pid
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
                    console.log('已经注册过，返回用户信息', resLogin.data.data)
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
  },
  

  onLoad: function (options) {
    console.log(123123, options)
    let that = this
    if (options.pid) {
      let pid = options.pid
      app.globalData.pid = pid
      that.logins()
    } else if (options.scene) {
      let sceneStr = decodeURIComponent(options.scene)
      // console.log(scene)
      let scene = sceneStr.split('=')
      app.globalData.scene = scene[1]
      that.logins()
    } else {
      that.logins()
    }
  },

  onShow () {
    let that = this
    that.setData({
      commodityArr: []
    })
    that.getTopShop()
    that.getRecomList()
    that.getBanner()
  },

    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      that.getRecomList()
    } else {
      // that.setData({
      //   noDataShow: true
      // })
      util.showMsg('已经到底了')
    }
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})
