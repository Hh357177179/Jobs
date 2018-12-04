// pages/other/other.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeList: [],
    page: 1,
    pagesize: 10,
    counts: ''
  },
  searchDetail(e) {
    // console.log(e.currentTarget.dataset.proid)
    if (e.currentTarget.dataset.proid == 1) {
      wx.navigateTo({
        url: '/pages/firstD/firstD?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.proid == 2) {
      wx.navigateTo({
        url: '/pages/secondD/secondD?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.proid == 3) {
      wx.navigateTo({
        url: '/pages/thirdD/thirdD?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/fourthD/fourthD?id=' + e.currentTarget.dataset.id,
      })
    }
    // console.log(e.currentTarget.dataset.id)
  },

  // 获取首页数据
  getHomeList() {
    let that = this
    wx.request({
      url: `${util.baseUrl}/main/otherList`,
      data: {
        token: wx.getStorageSync('openid'),
        page: '1',
        pagesize: '10'
      },
      success: res => {
        if (res.data.code == 200) {
          const response = res.data.data
          for (let i = 0; i < response.list.length; i++) {
            response.list[i].content = JSON.parse(response.list[i].content)
            response.list[i].version = ((response.list[i].version + 10) / 10).toFixed(1)
          }
          that.setData({
            homeList: response.list,
            counts: response.count
          })
          console.log(that.data.homeList)
        }
      }
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
    this.setData({
      page: 1
    })
    this.getHomeList()
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
    if (_this.data.page * _this.data.pagesize < _this.data.counts) {
      _this.setData({
        page: _this.data.page += 1
      })
      wx.request({
        url: `${util.baseUrl}/main/otherList`,
        data: {
          token: wx.getStorageSync('openid'),
          page: _this.data.page,
          pagesize: _this.data.pagesize,
        },
        success: res => {
          if (res.data.code == 200) {
            const response = res.data.data
            for (let i = 0; i < response.list.length; i++) {
              response.list[i].content = JSON.parse(response.list[i].content)
              response.list[i].version = ((response.list[i].version + 10) / 10).toFixed(1)
            }
            _this.setData({
              homeList: _this.data.homeList.concat(response.list),
              counts: response.count
            })
          }
        }
      })
    }
  }
})