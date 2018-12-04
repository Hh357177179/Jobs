 //index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    countDown: '获取验证码',
    pids: 0
  },
  saveUsername: function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  sendCode: function(){
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (reg.test(this.data.phoneNumber) != '' && this.data.countDown == '获取验证码') {
      var that = this
      wx.request({
        url: 'https://wechatsign.zhaodaka.net/api/regSms',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'wechat_host': 'huzhudian'
        },
        method: 'POST',
        data: {
          username: that.data.phoneNumber
        },
        success: function (response) {
          if (response.data.code == 0) {
            console.log('发送成功')
            that.setData({
              countDown: 60
            })
            var timer = setInterval(function () {
              console.log(that.data.countDown)
              if (that.data.countDown <= 0) {
                that.setData({
                  countDown: '获取验证码'
                })
                clearInterval(timer)
              } else {
                that.setData({
                  countDown: --that.data.countDown
                })
              }
            }, 1000)
          }else{
            wx.showToast({
              title: response.data.message,
              icon: 'none',
              duration: 1300
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 1300
      })
    }
  },
  formSubmit: function (e) {
    console.log(e.detail.value.username + "---" + e.detail.value.password)
    var phoneNumber = e.detail.value.username,
      nickname = app.user.nickname,
      code = e.detail.value.code,
      password = e.detail.value.password;
    if (phoneNumber == '' || code == '' || password == '') {
      wx.showToast({
        title: '请填写完整',
        icon: 'loading',
        duration: 1300
      })
    }else{
      wx.getUserInfo({
        success: res => {
          wx.request({
            url: 'https://wechatsign.zhaodaka.net/api/register',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'wechat_host': 'huzhudian'
            },
            method: 'POST',
            data: {
              username: phoneNumber.replace(/(^\s*)|(\s*$)/g, ""),
              nickname: res.userInfo.nickName,
              password: password.replace(/(^\s*)|(\s*$)/g, ""),
              re_password: password.replace(/(^\s*)|(\s*$)/g, ""),
              tel_code: code,
              pid: this.data.pids
            },
            success: function (e) {
              console.log(e.data)
              if (e.data.code == 0) {
                wx.login({
                  success: function (res) {
                    if (res.code) {
                      wx.request({
                        url: 'https://wechatsign.zhaodaka.net/api/postLogin',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded',
                          'wechat_host': 'huzhudian'
                        },
                        method: 'POST',
                        data: {
                          username: phoneNumber.replace(/(^\s*)|(\s*$)/g, ""),
                          password: password.replace(/(^\s*)|(\s*$)/g, ""),
                          code: res.code
                        },
                        success: function (e) {
                          console.log(e.data)
                          wx.hideLoading()
                          if (e.data.code == 0) {//测试用 正式改回 0 
                            console.log("OK")
                            app.user = e.data.data//把返回的用户信息存入 app。js中
                            wx.setStorageSync('userId', e.data.data.Id)
                            wx.reLaunch({
                              url: '/pages/personal/personal'
                            })
                            wx.hideLoading()
                          } else {
                            wx.showToast({
                              title: e.data.message,
                              icon: 'loading',
                              duration: 1300
                            })
                          }
                        }, fail: function () {
                          wx.reLaunch({
                            url: '/pages/index/index'
                          })
                        }
                      })
                    }
                  }
                })
              }
            }, fail: function () {
              wx.hideLoading()
            }
          })
        },

      })
    }
  },
  onLoad: function (options) {
    if (wx.getStorageSync('pid')) {
      this.setData({
        pids: wx.getStorageSync('pid')
      })
    }
  },
})
