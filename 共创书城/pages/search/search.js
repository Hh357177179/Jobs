// pages/search/search.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clearBtn: false,
    value: '',
    keyword: '',
    page: 1,
    pagesize: 6,
    detailList: [],
    imgArr: []
  },

  // 监听搜索框
  searchVal: function (e) {
    console.log(e)
    // let that = this
    // that.setData({
    //   keyword: e.detail.value
    // })
  },

  variableInput: function (e) {
    let that = this
    if (e.detail.cursor != 0) {
      that.setData({
        clearBtn: true
      })
    } else {
      that.setData({
        clearBtn: false
      })
    }
    that.setData({
      keyword: e.detail.value
    })
  },
  // 点击清除搜索框
  clearInput: function () {
    let that = this
    that.setData({
      keyword: '',
      value: '',
      clearBtn: false,
      // imgArr: []
    })
  },
  // 搜索
  searchBtnD: function () {
    this.setData({
      detailList: [],
      page: 1
    })
    this.searchList()
  },

  // 搜索获取数据
  searchList: function () {
    let _that = this
    wx.showToast({
      title: '正在加载...',
      icon: 'loading',
      duration: 10000,
    })
    wx.request({
      url: `${util.baseUrl}/tujie/search`,
      data: {
        keyword: _that.data.keyword,
        page: _that.data.page,
        pagesize: _that.data.pagesize
      },
      success: res => {
        let response = res.data.data.list
        if (res.data.code == 200) {
          _that.setData({
            detailList: _that.data.detailList.concat(response)
          })
          let iArr = []
          for (var q = 0; q < _that.data.detailList.length; q++) {
            iArr.push({
              img: _that.data.detailList[q].image.split('|'),
              create_time: _that.data.detailList[q].create_time,
              id: _that.data.detailList[q].id,
            })
          }
          _that.setData({
            imgArr: iArr
          })
          console.log(response)
          // console.log('图片集合',_that.data.imgArr)
          wx.hideToast()
        } else {
          wx.hideToast()
        }
      }
    })
  },
  backhome (e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    app.globalData.picId = id
    // wx.redirectTo({
    //   url: `/pages/picHome/picHome?id=${id}`,
    // })
    wx.navigateBack()
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
    this.setData({
      page: this.data.page + 1
    })
    this.searchList()
  }
})