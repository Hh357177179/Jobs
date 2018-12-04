// pages/library/library.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList: [],
    hostList: [],
    allList: [],
    page: 1,
    pagesize: 3,
    searchMain: true,
    searchVal: '',
    cIcon: false,
    allStatus: false,
    Pages: 1,
    PageSize: 10,
    counts: ''
  },
  // 跳转分类页面
  detailRouter () {
    wx.navigateTo({
      url: '/pages/bookTab/bookTab',
    })
  },
  // 查看详情
  Rdetail(e) {
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${e.currentTarget.dataset.bookid}`,
    })
  },

  advSearch (e) {
    let that = this
    // console.log(e.detail.value)
    that.setData({
      searchVal: e.detail.value
    })
    if (e.detail.cursor > 0) {
      that.setData({
        cIcon: true,
      })
    } else {
      that.setData({
        cIcon: false
      })
    }
  },

  clearInput () {
    let that = this
    that.setData({
      searchVal: '',
      cIcon: false,
      allStatus: false,
      searchMain: true
    })
  },

  scrollBot(e){
    let that = this
    console.log(123)
    if (that.data.Pages * that.data.PageSize < that.data.counts) {
      that.setData({
        Pages: that.data.Pages += 1
      })
      that.seaList()
    } else {
      util.showMsg('没有更多数据啦')
    }
  },

  // 搜索
  searchBtn () {
    let that = this
    if (that.data.searchVal != '') {
      that.setData({
        Pages: 1,
        allList: []
      })
      that.seaList()
    } else {
      that.setData({
        searchMain: true,
        allStatus: false
      })
    }
  },

  // 搜索方法
  seaList(){
    wx.showLoading({
      title: 'loading...',
    })
    let that = this
    wx.request({
      url: `${util.baseUrl}/book/byKey`,
      data: {
        key: that.data.searchVal,
        page: that.data.Pages,
        pagesize: that.data.PageSize
      },
      method: "POST",
      success: res => {
        // console.log(res)
        if (res.data.code == 200) {
          wx.hideLoading()
          if (res.data.data.list.length > 0) {
            that.setData({
              allList: that.data.allList.concat(res.data.data.list),
              searchMain: false,
              allStatus: true,
              counts: res.data.data.count
            })
          } else {
            util.showMsg('未搜索到相关资料')
          }
        }
      }
    })
  },

  // 获取最新列表
  getNewList () {
    wx.showLoading({
      title: 'loading...',
    })
    let that = this
    wx.request({
      url: `${util.baseUrl}/book/byNew`,
      data: {
        page: that.data.page,
        pagesize: that.data.pagesize
      },
      method: "POST",
      success: res => {
        wx.hideLoading()
        // console.log(res)
        if (res.data.code == 200) {
          that.setData({
            newList: res.data.data.list
          })
        } else {
          util.showMsg(res.data.msg)
        }
      }
    })
  },

  // 获取最热列表
  getHostList () {
    wx.showLoading({
      title: 'loading...',
    })
    let that = this
    wx.request({
      url: `${util.baseUrl}/book/byHot`,
      data: {
        page: that.data.page,
        pagesize: that.data.pagesize
      },
      method: "POST",
      success: res => {
        wx.hideLoading()
        if (res.data.code == 200) {
          that.setData({
            hostList: res.data.data.list
          })
        } else {
          util.showMsg(res.data.msg)
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewList(),
    this.getHostList()
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

  }

})