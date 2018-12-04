//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    openid: app.user.openid
  },
  formSubmit: function(e){
    const comments = e.detail.value.comments
    var that = this
    console.log(that)
    if (comments == ''){
      wx.showToast({
        title: '请填写评论',
        duration: 1300
      })
    }else{
      wx.request({
        url: 'https://wechatsign.zhaodaka.net/api/publishComment',
        data: {
          token: app.user.openid,
          forum_id: that.data.themeId,
          comment: comments
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'wechat_host': 'huzhudian'
        },
        methods: 'POST',
        success: function(response){
          if(response.data.code == 0){
            wx.showToast({
              title: '评论成功',
              duration: 1300
            })
            // const time = new Date()
            // const Y = time.getFullYear() + '-'
            // const M = time.getMonth() + 1 + '-'
            // const D = time.getDate() + ' '
            // const h = time.getHours() + ':'
            // const m = time.getMinutes() + ':'
            // const s = time.getSeconds()
            // const myComment = [{
            //   content: comments,
            //   author: app.user.nickname,
            //   create_time: Y+M+D+h+m+s,
            // }]
            // that.setData({
            //   commentsList: that.data.commentsList.push(myComment)
            // })
            that.getDetail()
          }
        }
      })
    }
  },
  getDetail () {
    var page = this
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    wx.request({
      url: 'https://wechatsign.zhaodaka.net/api/getForumDetail',
      data: {
        id: page.data.themeId,
        token: app.user.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'wechat_host': 'huzhudian'
      },
      methods: 'GET',
      success: function (response) {
        if (response.data.code == 0) {
          const data = response.data.data
          const time = new Date(data.create_time * 1000)
          const Y = time.getFullYear() + '-'
          const M = time.getMonth() + 1 + '-'
          const D = time.getDate() + ' '
          const h = time.getHours() + ':'
          const m = time.getMinutes() + ':'
          const s = time.getSeconds()
          page.setData({
            title: data.title,
            author: data.author,
            content: data.content,
            commentsList: page.formateTime(data.comments),
            create_time: Y + M + D + h + m + s,
            myself: data.myself,
            picture: data.picture
          })
        }
        wx.hideLoading()
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      themeId: options.id
    })
    this.getDetail()
  },
  deleteTheme: function(){ // 关闭主题
    var that = this
    wx.showModal({
      title: '是否删除你的主题',
      content: that.data.title,
      confirmText: '删除',
      confirmColor: 'red',
      success: function(){
        wx.request({
          url: 'https://wechatsign.zhaodaka.net/api/delForum',
          data: {
            token: app.user.openid,
            id: that.data.themeId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'wechat_host': 'huzhudian'
          },
          methods: 'POST',
          success: function(response){
            if(response.data.code == 0){
              wx.showLoading({
                title: '删除成功',
                mask: true,
                duration: 500
              })
              wx.switchTab({
                url: '../themelist/themelist'
              })
            }
          }
        })
      }
    })
  },
  deleteComment: function(){
    var that = this
    wx.showModal({
      title: '是否删除你的回复',
      content: that.data.title,
      confirmText: '删除',
      confirmColor: 'red',
      success: function () {
        wx.request({
          url: 'https://wechatsign.zhaodaka.net/api/delComment',
          data: {
            token: app.user.openid,
            id: that.data.themeId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'wechat_host': 'huzhudian'
          },
          methods: 'POST',
          success: function (response) {
            if (response.data.code == 0) {
              wx.showLoading({
                title: '删除成功',
                mask: true,
                duration: 500
              })
              that.getDetail()
            }
          }
        })
      }
    })
  },
  onShareAppMessage: function(){ // 分享功能
    return {
      title: this.data.title,
      desc: '',
      path: '/pages/themedetail/themedetail?id='+this.data.themeId
    }
  },
  formateTime: function(data){
    var lists = []
    data.forEach((item,index) => {
      const time = new Date(item.create_time * 1000)
      const Y = time.getFullYear() + '-'
      const M = time.getMonth() + 1 + '-'
      const D = time.getDate() + ' '
      const h = time.getHours() + ':'
      const m = time.getMinutes() + ':'
      const s = time.getSeconds()
      item.create_time = Y + M + D + h + m + s
      lists.push(item)
    })
    return lists
  },
  imgPreview: function(){
    wx.previewImage({
      urls: [this.data.picture] // 需要预览的图片http链接列表
    })
  },
  download: function(){
    var that = this
    wx.downloadFile({
      url: that.data.picture, 
      success: function (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              console.log(res)
            },
            fail: function (res) {
              console.log(res)
              console.log('fail')
            }
          })  
        }
      }
    })
  }
})
