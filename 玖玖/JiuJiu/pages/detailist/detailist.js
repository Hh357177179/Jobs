// pages/detailist/detailist.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodel: false,
    detailist: [],
    page: 1,
    pagesize: 10,
    allCount: '',
    payShow: false
  },

  orderBtn: function() {
    let _this = this
    _this.setData({
      showmodel: true
    })
  },

  // 关闭弹窗
  closeModel: function () {
    let _this = this
    _this.setData({
      showmodel: false
    })
  },

  // 获取下单详情
  getDetail: function() {
    let _this = this
    wx.showLoading({
      title: '正在加载...'
    })
    wx.request({
      url: `${util.baseUrl}api/project/xiadanList`,
      data: {
        openid: app.globalData.openId,
        page: _this.data.page,
        pagesize: _this.data.pagesize
      },
      method: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          _this.setData({
            detailist: _this.data.detailist.concat(res.data.data.list),
            allCount: res.data.data.count
          })
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 1500
          })
        }
        wx.hideLoading()
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail()
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
    let _this = this
    if (_this.data.page * _this.data.pagesize < this.data.allCount) {
      _this.setData({
        page: _this.data.page + 1
      })
      _this.getDetail()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})