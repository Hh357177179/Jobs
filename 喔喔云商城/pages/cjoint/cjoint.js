// pages/cjoint/cjoint.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pagesize: 10,
    counts: 0,
    cjointArr: [],
    chooseArr: []
  },

  // 获取未配送列表
  getNoDelivery () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      type: 2,
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/goodOrderList', params, true).then(res => {
      console.log('全部商品',res)
      let iArr = app.globalData.cid

      for (var i = 0, len = res.list.length; i < len; i++) {
        for (var j = 0, lens = iArr.length; j < lens; j++) {
          // console.log(12,res.list[i])
          // console.log(34,iArr[j])
          if (res.list[i].id == iArr[j]) {
            res.list[i].isCheck = 1
          }
        }
      }

      console.log('处理过数组',res.list)
      that.setData({
        cjointArr: that.data.cjointArr.concat(res.list),
        counts: res.count
      })
    })
  },

  // 确认添加
  sureAdd () {
    let that = this
    let itemArrs = []
    if (that.data.chooseArr.length == 0) {
      // util.showMsg('请选择商品配送')
      that.setData({
        chooseArr: app.globalData.cid
      })
    } else {
      app.globalData.cid = that.data.chooseArr
    }
    // console.log(that.data.chooseArr)
    for (var i = 0, len = that.data.chooseArr.length; i < len; i++) {
      let iArr = []
      // console.log('遍历id', that.data.chooseArr[i])
      iArr = that.data.cjointArr.filter(x => x.id == that.data.chooseArr[i])
      itemArrs = itemArrs.concat(iArr)
    }
    // console.log(123890, itemArrs)
    app.globalData.itemArr = itemArrs
    wx.navigateBack()
  },

  // 获取列表
  checkboxChange (e) {
    console.log(e)
    let that = this
    that.setData({
      chooseArr: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.getNoDelivery()
    // console.log('选择商品的id', app.globalData.cid)
    // console.log('选择的商品', app.globalData.itemArr)
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
      that.getNoDelivery()
    } else {
      util.showMsg('无更多数据')
    }
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})