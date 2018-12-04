//index.js
//获取应用实例
var panduan = 0
const app = getApp()
Page({
  data: {
    form_info: "",
    tranfer_type: '0'
  },
  fanhui: function () {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  //点击转账事件
  formSubmit: function (e) {
    console.log(e)
    var page = this
    page.setData({
      form_info: '',
      name: ''
    })
    console.log('本人id：' + app.user.Id + '对方用户名：' + e.detail.value.username)
    console.log("转账额度：" + e.detail.value.number + '备注：' + e.detail.value.remarks)
    var num = e.detail.value.number
    var remarks = e.detail.value.remarks
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(e.detail.value.number) || regNeg.test(e.detail.value.number)) {
      if (e.detail.value.username == '' || e.detail.value.number == '') {
        wx.showToast({
          title: '用户或助点为空',
          icon: 'loading',
          duration: 1300
        })
      } else {
        wx.showLoading({
          title: 'Loading',
          mask: true
        })
        wx.request({
          url: "https://wechatsign.zhaodaka.net/api/getuserinfos",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
            ,
            'wechat_host': 'huzhudian'
          },
          method: 'POST',
          data: {
            name: e.detail.value.username,
          },
          success: function (e) {
            console.log(e.data)
            wx.hideLoading()
            if (e.data.code == 0) {
              console.log("OK")
              wx.request({
                url: "https://wechatsign.zhaodaka.net/api/confirm_transfer",
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'wechat_host': 'huzhudian'
                },
                method: 'POST',
                data: {
                  uid: app.user.Id,
                  to_uid: e.data.data.userinfo.Id,
                  amount: num,
                  remark: remarks
                },
                success: function (e) {
                  console.log(e.data)
                  console.log("返回look：" + JSON.stringify(e.data))
                  wx.hideLoading()
                  if (e.data.code == 0) {
                    console.log("OK")
                    wx.showToast({
                      title: '转账成功',
                      icon: 'loading',
                      duration: 1300
                    })
                    setTimeout(function () {
                      page.setData({
                        form_info: '',
                        name: ''
                      })
                    }, 1500) //延迟时间 这里是1秒 

                  } else if (e.data.code = 1001) {
                    wx.showToast({
                      title: '找不到用户',
                      icon: 'loading',
                      duration: 1300
                    })
                  } else {
                    page.setData({
                      form_info: '',
                      name: ''
                    })
                    wx.showToast({
                      title: '网络异常',
                      icon: 'loading',
                      duration: 1300
                    })
                  }
                }, fail: function () {
                  wx.hideLoading()
                }
              })

            } else if (e.data.code = 1001) {
              wx.showToast({
                title: '用户不存在',
                icon: 'loading',
                duration: 1300
              })
            } else {
              page.setData({
                form_info: '',
                name: ''
              })
              wx.showToast({
                title: '网络异常',
                icon: 'loading',
                duration: 1300
              })
            }
          }, fail: function () {
            wx.hideLoading()
          }
        })
        //  zuan zhang
      }
    } else {
      wx.showToast({
        title: '错误的助点',
        icon: 'loading',
        duration: 1300
      })
    }

  },
  onLoad: function (options) {
    console.log(123,options)
    var page = this
    var name = ''
    // console.log(options.panduan)
    if (options.q !== undefined) {
      var scan_url = decodeURIComponent(options.q);
      console.log(scan_url);
      var surls = scan_url.split("name=")
      var surls1 = surls[1]
      var surls2 = surls1.split("&id=")
      name = surls2[0]
      console.log(name)
    } else {
      console.log('错误');
    }
    if (options.panduan == 1) {
      page.setData({
        tranfer_type: 'tranfer_type'
      })
    }
    page.setData({
      name: name
    })
    page.code()
  },
  onShow: function () {
    var page = this
  },
  //直接code方法
  code: function () {
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
              'content-type': 'application/x-www-form-urlencoded',
              'wechat_host': 'huzhudian'
              //'content-type': 'application/json'
            },
            method: 'GET',
            success: function (e) {
              wx.hideLoading()
              console.log(e.data);
              if (e.data.code == 0) {
                app.user = e.data.data;
              }
              else if (e.data.code == 1001) {
                setTimeout(function () {
                  wx.showToast({
                    title: '请先登录',
                    icon: 'loading',
                    duration: 1300
                  })
                }, 1500) //延迟时间 这里是1秒 
                wx.redirectTo({
                  url: '../index/index'
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
  }
})
