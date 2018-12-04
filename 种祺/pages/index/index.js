//index.js
//获取应用实例
const util = require('../../utils/util.js')
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()

Page({
  data: {
    showAudit: false,
    showMain: false,
    searchVal: '',
    latitude: '',
    longitude: '',
    nowCity: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    homeArr: [],
    page: 1,
    pagesize: 10,
    counts: ''
  },

  // 获取门店列表
getStoreList () {
  let that = this
  let params =  {
    page: 1,
    pagesize: 10,
    keyword: that.data.searchVal,
    city: that.data.nowCity
  }
  postRequest('/main/shopList', params, true).then(res => {
    // console.log('首页门店列表',res)
    for (let i = 0, len = res.list.length; i < len; i ++) {
      // console.log(res.list[i].shop_special)
      if (res.list[i].shop_special != '') {
        res.list[i].shop_special = JSON.parse(res.list[i].shop_special)
      }
      if (res.list[i].shop_url != '') {
        res.list[i].shop_url = JSON.parse(res.list[i].shop_url)[0]
      }
    }
    that.setData({
      homeArr: res.list,
      counts: res.count
    })
  })
},

  onLoad: function () {
    let that = this
    wx.request({
      url: `${util.baseUrl}/main/isLock`,
      success: res => {
        // console.log(123123,res)
        if (res.data.code == 200) {
          console.log('审核中')
          that.setData({
            showAudit: true
          })
        } else {
          that.setData({
            showMain: true
          })
        }
      }
    })
    // console.log('load', app.globalData.openid)
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = resUserInfo => {
        that.setData({
          userInfo: resUserInfo.userInfo,
          hasUserInfo: true
        })
      }
    }
    // console.log(app.globalData.userInfo)
    that.getOnloadLocal()
  },
  // 搜索框输入
  advSearch(e) {
    let that = this
    let sVal = e.detail.value
    that.setData({
      searchVal: sVal
    })
  },

  // 点击选择城市
  openLocal() {
    wx.navigateTo({
      url: '/pages/chooseCity/chooseCity',
    })
  },

  // 进入获取用户地理位置
  getOnloadLocal() {
    let that = this
    wx.getLocation({
      success: res => {
        // console.log('已经授权过--返回', res)
        var analysis = new QQMapWX({
          key: 'UVOBZ-O6SKQ-XFU5E-GQMYL-H4IDJ-6AB3Q'
        });
        analysis.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            // console.log(res)
            const response = res.result.address_component.city
            that.setData({
              nowCity: response,
            })
            // console.log('发请求', response)
            this.getStoreList()
          },
          fail: res => {
            // console.log(res)
          }
        })
      },
      fail: res => {
        // console.log('拒绝授权', res)
        if (res.errMsg == 'getLocation:fail auth deny') {
          util.showMsg('无法获取到当前城市')
        } else if (res.errMsg == 'getLocation:fail 1') {
          util.showMsg('请开启手机定位或手动选择')
        }
      }
    })
  },

  // 搜索
  searchBtn() {
    let that = this
    that.getStoreList()
  },
  onShow() {
    // console.info('首页onshow')
    // console.log('show',app.globalData.openid)
    let that = this
    if (app.citys != undefined && app.citys != '' && app.citys != null) {
      let ctiyS = app.citys
      that.setData({
        nowCity: ctiyS,
      })
      // console.log('手动选择请求', ctiyS)
      that.getStoreList()
    } else {
      wx.getSetting({
        success: res => {
          // console.log('判断是否授权', res)
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '位置信息授权',
              content: '需要获取您的地理位置，请打开手机定位，并且确认授权，否则无法获取当前城市',
              confirmText: '开启授权',
              confirmColor: '#345391',
              cancelText: '仍然拒绝',
              cancelColor: '#999999',
              success: res => {
                if (res.confirm) {
                  wx.openSetting({
                    success: res => {
                      if (res.authSetting["scope.userLocation"] == true) {
                        // console.log(123123)
                        that.getOnloadLocal()
                      }
                    }
                  })
                } else {
                  console.log('仍然拒绝')
                }
              }
            })
          } else {
            that.getOnloadLocal()
          }
        }
      })
    }
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
      let params = {
        page: that.data.page,
        pagesize: that.data.pagesize,
        keyword: that.data.searchVal,
        city: that.data.nowCity
      }
      postRequest('/main/shopList', params, true).then(res => {
        // console.log('首页门店列表', res)
        for (let i = 0, len = res.list.length; i < len; i++) {
          // console.log(res.list[i].shop_special)
          if (res.list[i].shop_special != '') {
            res.list[i].shop_special = JSON.parse(res.list[i].shop_special)
          }
          if (res.list[i].shop_url != '') {
            res.list[i].shop_url = JSON.parse(res.list[i].shop_url)[0]
          }
        }
        that.setData({
          homeArr: that.data.homeArr.concat(res.list),
          counts: res.count
        })
      })
    }
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },

  // 查看详情
  lookdetails(e) {
    // console.log(e.currentTarget.dataset.shopid)
    let shopId = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '/pages/details/details?shopId=' + shopId,
    })
  }
})
