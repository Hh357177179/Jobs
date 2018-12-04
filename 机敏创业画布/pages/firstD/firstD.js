// pages/firstD/firstD.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    detailObj: [],
    uNames: ''
  },

  getDetail () {
    let that = this
    wx.request({
      url: `${util.baseUrl}/main/detail`,
      data: {
        token: wx.getStorageSync('openid'),
        project_id: that.data.userId
      },
      success: res => {
        if (res.data.code == 200) {
          console.log(res)
          const response = res.data.data.content
          let objArr = JSON.parse(res.data.data.content)
          that.setData({
            detailObj: objArr,
            uNames: res.data.data.name
          })
          console.log(objArr)
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      userId: options.id
    })
    // that.getDetail()
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
    this.getDetail()
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
    return {
      path: 'pages/firstD/firstD?id=' + this.data.userId
    }
  }
})