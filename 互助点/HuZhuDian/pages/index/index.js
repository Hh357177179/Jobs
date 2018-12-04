//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    pid:''
  },
  formSubmit: function (e) {
    console.log(e.detail.value.username + "---" + e.detail.value.password)
    if (e.detail.value.username == '' || e.detail.value.password == '') {
      wx.showToast({
        title: '账号或密码为空',
        icon: 'loading',
        duration: 1300
      })
    } else {
      wx.showLoading({
        title: 'Loading',
        mask: true
      })
      var page = this
      //登录
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({    
              url: 'https://wechatsign.zhaodaka.net/api/postLogin',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'wechat_host':'huzhudian'

              },
              method: 'POST',
              data: {
                username: e.detail.value.username.replace(/(^\s*)|(\s*$)/g, ""),
                password: e.detail.value.password.replace(/(^\s*)|(\s*$)/g, "") ,
                 code: res.code
              },
              success: function (e) {
                console.log(e.data)
                wx.hideLoading()
                if (e.data.code == 0) {//测试用 正式改回 0 
                  console.log("OK")
                  app.user = e.data.data//把返回的用户信息存入 app。js中
                  wx.setStorageSync('userId', e.data.data.Id)
                  wx.switchTab({
                    url: '../personal/personal'
                  })
                  wx.hideLoading()
                } else {
                  wx.showToast({
                    title: '账号或密码错误',
                    icon: 'loading',
                    duration: 1300
                  })
                }
              }, fail: function () {
                wx.hideLoading()
              }
            })
          }
        }
      })
    }
  },
  onLoad: function (options) {
    var page = this
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    if (options.pid) {
      console.log('分享进入')
      wx.setStorageSync('pid', options.pid)
    }
    if (options.q) {
      console.log('扫码二维码进入')
      var sharePicUrl = decodeURIComponent(options.q)
      var shareId = sharePicUrl.split("pid=")
      wx.setStorageSync('pid', shareId[1])
    }
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
              'content-type': 'application/x-www-form-urlencoded',
             'wechat_host': 'huzhudian'
            },
            method: 'GET',
            success: function (e) {
              wx.hideLoading()
              console.log(e.data);
              if (e.data.code == 0) {
                app.user = e.data.data
                wx.setStorageSync('userId', e.data.data.Id)
                wx.switchTab({
                  url: '../personal/personal'
                })
              }
              else {
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
})
