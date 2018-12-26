// pages/collect/collect.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pagesize: 7,
    counts: 0,
    collectArr: []
  },
  
  detailR(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type
    let sid = e.currentTarget.dataset.sid
    if (type == 1) {
      wx.navigateTo({
        url: '/pages/picHome/picHome?pids=' + sid,
      })
    } else if (type == 2) {
      wx.navigateTo({
        url: '/pages/bookDetail/bookDetail?id=' + sid,
      })
    } else if (type == 3) {
      wx.navigateTo({
        url: '/pages/botdetail/botdetail?sid=' + sid,
      })
    } else if (type == 4) {
      wx.navigateTo({
        url: '/pages/groupDetail/groupDetail?gid=' + sid,
      })
    }
  },

  // 获取我的收藏列表
  getCollectList () {
    let that = this
    let params = {
      token: app.globalData.openid,
      cate: '0',
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/user/myList', params, true).then(res => {
      console.log(res)
      that.setData({
        collectArr: that.data.collectArr.concat(res.list),
        counts: res.count
      })
    })
  },

  // 取消收藏
  cancelC (e) {
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    let proId = e.currentTarget.dataset.id
    let types = e.currentTarget.dataset.types
    let params = {
      token: app.globalData.openid,
      type: types,
      project_id: proId
    }
    // console.log(that.data.collectArr[index])
    // that.setData({
    //   collectArr: that.data.collectArr.splice(index,1,null)
    // })
    postRequest('/user/collectionPublish', params, true).then(res => {
      // console.log(res)
      that.setData({
        page: 1,
        collectArr: []
      })
      that.getCollectList()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList()
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
    let that = this
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      that.getCollectList()
    } else {
      util.showMsg('无更多数据')
    }
  }
})