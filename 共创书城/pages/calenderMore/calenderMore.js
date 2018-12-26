// pages/calenderMore/calenderMore.js
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    noDataShow: false
  },

  routerImg (e) {
    let id = e.currentTarget.dataset.id
    app.globalData.picId = id
    // wx.redirectTo({
    //   url: '/pages/picHome/picHome?id=' + id,
    // })
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.date)
    let that = this
    let date = options.date
    let params = {
      date: date
    }
    postRequest('/tujie/searchByDay', params, true).then(res => {
      console.log(res)
      if (res.length == 0) {
        that.setData({
          noDataShow: true
        })
      }
      that.setData({
        imgArr: res
      })
    })
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

  }
})