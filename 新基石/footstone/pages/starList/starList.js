// pages/starList/starList.js
import {postRequest} from '../../utils/httpRequest.js'
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picList: [],
    picListFirst: {},
    showBig: false,
    bigSrc: '',
    starlen: 0
  },

  srarchBig(e){
    console.log(e)
    let t = this
    if (e.currentTarget.dataset.src) {
      t.setData({
        bigSrc: e.currentTarget.dataset.src,
        showBig: true
      })
    }
  },

  closePic(){
    let t = this
    t.setData({
      bigSrc: '',
      showBig: false
    })
  },

  routeLog(){
    wx.navigateTo({
      url: '/pages/starlog/starlog',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let params = {
      token: wx.getStorageSync('openid')
    }
    postRequest('/user/getMedal', params, true).then(res => {
      console.log(2222,res.length)
      let sliceArr = res.slice(1, res.length + 1)
      // console.log(sliceArr)
      if (res.length != 0) {
        that.setData({
          picListFirst: res[0]
        })
      }
      that.setData({
        picList: sliceArr,
        starlen: res.length
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})