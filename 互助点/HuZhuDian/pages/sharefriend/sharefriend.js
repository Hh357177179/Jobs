// pages/sharefriend/sharefriend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginPic: ''
  },
  saveLogin: function () {
    wx.downloadFile({
      url: this.data.loginPic, //仅为示例，并非真实的资源
      success: function (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(result) {
              console.log(result)
              if (result.errMsg == 'saveImageToPhotosAlbum:ok') {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginPic:'https://wechatsign.zhaodaka.net/api/setewm2?uid=' + wx.getStorageSync('userId')
    })
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (!res.authSetting['scope.writePhotosAlbum']) {
    //      wx.authorize({
    //        scope: 'scope.writePhotosAlbum',
    //        success () {
    //           wx.saveImageToPhotosAlbum()
    //        }
    //      }) 
    //     }
    //   },
    //   fail: res => {
    //     console.log(12123,res)
    //   }
    // })
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
  onShareAppMessage: function () {
  
  }
})