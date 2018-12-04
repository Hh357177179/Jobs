//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
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
    console.log(options)
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
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})