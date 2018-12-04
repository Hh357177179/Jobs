// pages/share/share.js
const util = require('../../utils/util.js')
var id
var title
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vdata: {},
    id: null,
    title: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id,
    title = options.title
    console.log(id)
    console.log(title);
    let aciteve_id = options.id
    this.setData({
      aciteve_id: aciteve_id
    })
    this.getActiveDetails(aciteve_id)
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
  onShareAppMessage: function (e) {
    if (e.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/map/map',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getActiveDetails: function (id) {
    wx.request({
      url: util.baseUrl + 'query?aid=' + id,
     
      success: res => {
        console.log(res)
        let avdata = res.data

        this.setData({
          vdata: avdata
        })
      },
      fail: res => {
        wx.showToast({
          title: '网络错误',
        })
      }
    })
  },
})