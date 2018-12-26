// pages/selectaddress/selectaddress.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressArr: [],
    aListCheck: false,
    checkStatus: 0
  },
  
  // 选择地址
  clocals (e) {
    let that = this
    console.log(e)
    let aress = e.currentTarget.dataset.num
    app.globalData.aress = aress
    wx.navigateBack()
  },

  // 点击编辑
  editTap (e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/addlocal/addlocal?id=' + id,
    })
  },

  // 跳转新增地址
  rEdit () {
    wx.navigateTo({
      url: '/pages/addlocal/addlocal',
    })
  },

  // // radio编辑
  // radioChange (e) {
  //   console.log(e)
  // },

  // 获取我的地址列表
  getMeAddress () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid
    }
    postRequest('/user/addressList', params, true).then(res => {
      console.log(res)
      that.setData({
        addressArr: res
      })
    })
  },

  // 删除
  deleteList (e) {
    console.log(e)
    let that = this
    let address_id = e.currentTarget.dataset.did
    let params = {
      token: app.globalData.userInfo.openid,
      address_id: address_id
    }
    postRequest('/user/addressDel', params, true).then(res => {
      console.log(res)
      that.getMeAddress()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    let that = this
    // if (app.globalData.aress == '') {
    //   that.setData({
    //     checkStatus: 0
    //   })
    // } else {
      that.setData({
        checkStatus: app.globalData.aress
      })
    // }
    // that.getMeAddress()
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
    let that = this
    that.getMeAddress()
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
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})