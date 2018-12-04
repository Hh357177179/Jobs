// pages/realname/realname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInput: true,
    showStart: false,
    disStatus: false,
    getCodeNum: '获取验证码',
    telVal: '',
    codeVal: ''
  },

  // 监听手机号输入
  telBind: function(e) {
    let that = this
    that.setData({
      telVal: e.detail.value
    })
  },

  // 监听验证码输入
  codeBind: function(e) {
    let that = this
    that.setData({
      codeVal: e.detail.value
    })
  },


  // 获取验证码
  getCode: function() {
    let that = this
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (reg.test(this.data.telVal) != '' && this.data.getCodeNum == '获取验证码') {
      console.log(this.data.telVal)
      that.setData({
        getCodeNum: 60,
        disStatus: true
      })
      let timer = setInterval(() => {
        if (this.data.getCodeNum <= 0) {
          that.setData({
            getCodeNum: '获取验证码',
            disStatus: false
          })
          clearInterval(timer)
        } else {
          that.setData({
            getCodeNum: --that.data.getCodeNum
          })
        }
      }, 1000)
    } else {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 1500
      })
    }
  },

  // 完成认证
  clickReal: function() {
    let that = this
    if (this.data.telVal == '' || this.data.telVal.length != 11) {
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.codeVal == '' || this.data.codeVal.length != 6) {
      wx.showToast({
        title: '请输入正确验证码',
        icon: 'none',
        duration: 1500
      })
    } else {
      console.log('本地验证通过，完成认证，发请求')
      console.log('手机号', this.data.telVal, '--验证码', this.data.codeVal)
      setTimeout(() => {
        that.setData({
          showInput: false,
          showStart: true,
        })
      }, 3000)
    }
  },

  // 跳转个人中心
  openPQ: function() {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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