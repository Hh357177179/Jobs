// pages/bills/bills.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    _clicknum: 1,
    showHide: true,
    _pos: '',
    page: 1,
    pagesize: 10,
    incomeList: [],
    withdrawList: [],
    userPic: '',
    textShow: false
  },

  // 收入列表
  getIncome: function () {
    let _that = this
    const incomeUrl = `${util.baseUrl}api/balance/getIncomeList`
    const params = {
      "user_id": wx.getStorageSync("userId"),
      // "user_id": 1,
      "page": _that.data.page,
      "pagesize": _that.data.pagesize
    }
    wx.request({
      url: incomeUrl,
      method: 'POST',
      data: params,
      success: res => {
        console.log('收入列表')
        if (res.data.code == 200) {
          if (_that.data.page == 1) {
            _that.setData({
              incomeList: res.data.data.list,
              allcount: res.data.data.count
            })
          } else {
            _that.setData({
              incomeList: _that.data.incomeList.concat(res.data.data.list),
              allcount: res.data.data.count,
              textShow: false
            })
          }
        }
        wx.stopPullDownRefresh()
      }
    })
  },

  // 提现列表
  getWithdraw: function () {
    let _that = this
    const incomeUrl = `${util.baseUrl}api/balance/getWithdrawList`
    const params = {
      "user_id": wx.getStorageSync("userId"),
      // "user_id": 1,
      "page": _that.data.page,
      "pagesize": _that.data.pagesize
    }
    wx.request({
      url: incomeUrl,
      method: 'POST',
      data: params,
      success: res => {
        console.log('提现列表')
        if (res.data.code == 200) {
          if (_that.data.page == 1) {
            _that.setData({
              withdrawList: res.data.data.list,
            })
          } else {
            _that.setData({
              withdrawList: _that.data.withdrawList.concat(res.data.data.list),
              textShow: false
            })
          }
        }
        console.log(res.data)
        wx.stopPullDownRefresh()
      }
    })
  },
  setpage() {
    this.setData({
      page: this.data.page + 1
    })
  },

  // 判断点击哪一个
  clickNumNow(e) {
    let that = this
    let clicknum = e.target.dataset.clicknum
    that.setData({
      _clicknum: clicknum
    })
    if (clicknum == 1) {
      that.setData({
        incomeList: [],
        page: 1,
        showHide: true
      })
      that.getIncome()
    }
    if (clicknum == 2) {
      that.setData({
        withdrawList: [],
        page: 1,
        showHide: false
      })
      that.getWithdraw()
    }
    // wx.pageScrollTo({
    //   scrollTop: 0
    // })
  },
  onPageScroll: function (e) {
    const _that = this
    if (e.scrollTop > 0) {
      _that.setData({
        _pos: 'fixed'
      })
    } else {
      _that.setData({
        _pos: ''
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIncome()
    // 获取用户头像
    this.setData({
      userPic: wx.getStorageSync("userInfo").avatarUrl
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
    this.setData({
      page: 1
    })
    if (this.data._clicknum == 1) {
      this.getIncome()
    } else {
      this.getWithdraw()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setpage()
    this.setData({
      textShow: true
    })
    if (this.data._clicknum == 1) {
      this.getIncome()
    } else {
      this.getWithdraw()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})