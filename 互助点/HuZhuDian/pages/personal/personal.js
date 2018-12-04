// pages/personal/personal.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfoAvatar: '',//测试头像 
    startdata:[],
    head_portrait_path:'', //二维码 地址
  },
  looktop:function(){
    wx.navigateTo({
      url: '../rankinglist/rankinglist'
    })
  },
  transfer:function(){
    wx.navigateTo({
      url: '../transfer/transfer?panduan=1'
    })
  },
  looklogs() {
    wx.navigateTo({
      url: '../log/log'
    })
  },
  //注销
  zhuxiao:function(){
    wx.removeStorageSync('pid')
    var page = this
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    // var page=this
    wx.login({
      success: function (res) {
        if (res.code) {
          // page.setData({
          //   code:res.code
          // })
          //发起网络请求
          console.log('code：', res)
          wx.request({
            url: 'https://wechatsign.zhaodaka.net/api/loginout',
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
              ,
              'wechat_host': 'huzhudian'
            },
            method: 'GET',
            success: function (e) {
              wx.hideLoading()
              console.log(e.data);
              if (e.data.code == 0) {
                wx.reLaunch({
                  url: '../index/index'
                })
              }
              else if (e.data.code == 1001) {
                setTimeout(function () {
                  wx.showToast({
                    title: '未知错误',
                    icon: 'loading',
                    duration: 1300
                  })
                }, 1500) //延迟时间 这里是1秒 
                wx.hideLoading();
              }
            }, fail: function () {
              wx.hideLoading()
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  clickFriend: function () {
    wx.navigateTo({
      url: '/pages/sharefriend/sharefriend',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('传值', options)
    var page = this
   console.log(app.user)
   //console.log('https://wechatsign.zhaodaka.net/api/setewm?uid=' + app.user.Id)
    page.Headportrait()
    page.setData({
      startdata: app.user,
      head_portrait_path: 'http://huzhudian.zhaodaka.net/api/setewm?uid=' + wx.getStorageSync('userId')
    })
  },
  /**
   * 头像获取 测试用 可以删除
   */
  Headportrait: function () {
    // 获取微信头像开始
    var page = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        page.setData({
          userInfoAvatar: avatarUrl,
          nickName: nickName
        })
      },
  
    })//获取微信头像结束
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var page = this
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    // var page=this
    wx.login({
      success: function (res) {
        if (res.code) {
          // page.setData({
          //   code:res.code
          // })
          //发起网络请求
          console.log('code：', res)
          wx.request({
            url: 'https://wechatsign.zhaodaka.net/api/getUserInfo',
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
              ,
              'wechat_host': 'huzhudian'
            },
            method: 'GET',
            success: function (e) {
              wx.hideLoading()
              console.log(e.data);
              if (e.data.code == 0) {
                page.setData({
                  startdata:e.data.data,
                  head_portrait_path: 'http://huzhudian.zhaodaka.net/api/setewm?uid=' + app.user.Id
                })
              }
              else if (e.data.code == 1001) {
                // wx.showToast({
                //   title: '请先登录',
                //   icon: 'loading',
                //   duration: 1000
                // })
                wx.reLaunch({
                  url: '/pages/index/index',
                })
                wx.hideLoading();
              }
            }, fail: function () {
              wx.hideLoading()
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: 'EHS互助点',
      path: 'pages/index/index?pid=' + app.user.Id,
      success: res => {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: res => {
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 1000
        })
      }
    }
  },

 
  onReachBottom: function () {

  }
})