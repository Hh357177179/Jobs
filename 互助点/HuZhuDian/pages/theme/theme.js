//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgList: '../images/funit_add_img.png'
  },
  formSubmit: function (e) {
    var that = this
    if (e.detail.value.title == '' || e.detail.value.content == ''){
      wx.showToast({
        title: '标题或内容为空',
        icon: 'loading',
        duration: 1300
      })
    }{
      wx.request({
        url: 'https://wechatsign.zhaodaka.net/api/publishForum',
        data: {
          'title': e.detail.value.title,
          'content': e.detail.value.content,
          'picture': that.data.imgList.indexOf('funit_add_img.png') > 0 ? '' : that.data.imgList,
          'token': app.user.openid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'wechat_host': 'huzhudian',
        },
        success: function(response){
          if(response.data.code == 0){
            wx.showToast({
              title: '提交成功',
              icon: 'loading',
              duration: 1300
            })
            wx.switchTab({
              url: '../themelist/themelist'
            })
          }
        },
        fail: function(response){
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'loading',
            duration: 1300
          })
        }
      })
    }
  },
  onLoad: function () {
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
            },
            method: 'GET',
            success: function (e) {
              wx.hideLoading()
              console.log(e.data);
              if (e.data.code == 0) {
                app.user = e.data.data
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
  importIamge: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://wechatsign.zhaodaka.net/api/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data)
            var arr = ['https://wechatsign.zhaodaka.net'+data.data]
            that.setData({
              imgList: arr[0]
            })
          }
        })
      }
    })
  }
})
