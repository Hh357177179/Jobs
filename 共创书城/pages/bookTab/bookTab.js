// pages/bookTab/bookTab.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 3,
    hpage: 1,
    hpagesize: 10,
    hotArr:[],
    hcounts: '',
    npage: 1,
    npagesize: 10,
    newArr: [],
    ncounts: '',
    pid: 0,
    firstArr: [],
    cate_id: 0,
    allArr: [],
    cpage: 1,
    cpagesize: 10,
    ccounts: '',
    secondArr: [],
    threeArr: [],
    firstVal: '选择一级分类',
    secondVal: '选择二级分类',
    threeVal: '选择三级分类'
  },

  changeOli(e) {
    let that = this
    that.setData({
      num: e.target.dataset.num
    })
    if (e.target.dataset.num == 1) {
      wx.setNavigationBarTitle({
        title: '最热'
      })
      that.setData({
        hotArr: [],
        hpage: 1
      })
      that.getHotList()
    } else if (e.target.dataset.num == 2) {
      wx.setNavigationBarTitle({
        title: '最新'
      })
      that.setData({
        newArr: [],
        npage: 1
      })
      that.getNewList()
    } else {
      wx.setNavigationBarTitle({
        title: '分类'
      })
    }
  },

  // 获取最热列表
  getHotList () {
    let that = this
    wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: `${util.baseUrl}/book/byHot`,
      data: {
        page: that.data.hpage,
        pagesize: that.data.hpagesize
      },
      method: "POST",
      success: res => {
        wx.hideLoading()
        if (res.data.code == 200) {
          that.setData({
            hotArr: that.data.hotArr.concat(res.data.data.list),
            hcounts: res.data.data.count
          })
        } else {
          wx.showMsg(res.data.msg)
        }
      }
    })
  },

  // 获取最新列表
  getNewList () {
    let that = this
    wx.showLoading({
      title: 'loading...'
    })
    wx.request({
      url: `${util.baseUrl}/book/byNew`,
      data: {
        page: that.data.npage,
        pagesize: that.data.npagesize
      },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          wx.hideLoading()
          that.setData({
            newArr: that.data.newArr.concat(res.data.data.list),
            ncounts: res.data.data.count
          })
        } else {
          util.showMsg(res.data.msg)
        }
      }
    })
  },

  // 改变一级分类
  firstChange (e) {
    var that = this;
    let index = e.detail.value;
    that.setData({
      Index: index,
      cate_id: that.data.firstArr[index].id,
      pid: that.data.firstArr[index].id,
      firstVal: that.data.firstArr[index].title,
      secondVal: '选择二级分类',
      threeVal: '选择三级分类',
      secondArr: [],
      threeArr: [],
      allArr: []
    })
    that.getSclass()
    that.getAllBook()
  },

  // 改变二级分类
  secondChange (e) {
    let that = this
    let index = e.detail.value
    if (that.data.secondArr.length != 0) {
      that.setData({
        index: index,
        cate_id: that.data.secondArr[index].id,
        pid: that.data.secondArr[index].id,
        secondVal: that.data.secondArr[index].title,
        threeVal: '选择三级分类',
        allArr: []
      })
      console.log('二级pid', that.data.pid)
      that.getTclass()
      that.getAllBook()
    }
  },
  // 改变三级分类
  threeChange(e) {
    let that = this
    let index = e.detail.value
    if (that.data.threeArr.length != 0) {
      that.setData({
        tindex: index,
        cate_id: that.data.threeArr[index].id,
        pid: that.data.threeArr[index].id,
        threeVal: that.data.threeArr[index].title,
        allArr: []
      })
      console.log('三级pid', that.data.pid)
      that.getAllBook()
    }
  },

  // 获取全部分类图书
  getAllBook () {
    wx.showLoading({
      title: 'loading...',
    })
    let that = this
    wx.request({
      url: `${util.baseUrl}/book/byCate`,
      data: {
        cate_id: that.data.cate_id,
        page: that.data.cpage,
        pagesize: that.data.cpagesize
      },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          wx.hideLoading()
          console.log(res.data.data)
          console.log(res.data.data.list.length)
          that.setData({
            allArr: that.data.allArr.concat(res.data.data.list),
            ccounts: res.data.data.count
          })
        } else {
          util.showMsg(msg)
        }
      }
    })
  },

  // 获取一级分类
  getClassify () {
    let that = this
    wx.request({
      url: `${util.baseUrl}/book/cateList`,
      data: {
        pid: that.data.pid
      },
      method: "POST",
      success: res => {
        // console.log(res)
        if (res.data.code == 200) {
          that.setData({
            firstArr: res.data.data
          })
        } else {
          util.showMsg(msg)
        }
      }
    })
  },

  // 获取二级分类
  getSclass () {
    let that = this
    console.log('获取二级分类',that.data.pid)
    wx.request({
      url: `${util.baseUrl}/book/cateList`,
      data: {
        pid: that.data.pid
      },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          console.log('二级',res.data.data)
          if (res.data.data.length == 0) {
            that.setData({
              threeArr: []
            })
          }
          that.setData({
            secondArr: res.data.data
          })
        } else {
          util.showMsg(msg)
        }
      }
    })
  },

  // 获取三级分类
  getTclass() {
    let that = this
    console.log('获取三级分类', that.data.pid)
    wx.request({
      url: `${util.baseUrl}/book/cateList`,
      data: {
        pid: that.data.pid
      },
      method: "POST",
      success: res => {
        if (res.data.code == 200) {
          console.log('三级', res.data.data)
          that.setData({
            threeArr: res.data.data
          })
        } else {
          util.showMsg(msg)
        }
      }
    })
  },

  rDetail (e) {
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${e.currentTarget.dataset.id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.getClassify()
    that.getAllBook()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    if (that.data.num == 1) {
      if (that.data.hpage * that.data.hpagesize < that.data.hcounts) {
        that.setData({
          hpage: that.data.hpage += 1
        })
        that.getHotList()
      } else {
        util.showMsg('没有更多数据啦')
      }
    } else if(that.data.num == 2) {
      if (that.data.npage * that.data.npagesize < that.data.ncounts) {
        that.setData({
          npage: that.data.npage += 1
        })
        that.getNewList()
      } else {
        util.showMsg('没有更多数据啦')
      }
    } else {
      console.log('分类下拉')
      if (that.data.cpage * that.data.cpagesize < that.data.ccounts) {
        that.setData({
          cpage: that.data.cpage += 1
        })
        that.getAllBook()
      } else {
        util.showMsg('没有更多数据啦')
      }
    }
  }
})