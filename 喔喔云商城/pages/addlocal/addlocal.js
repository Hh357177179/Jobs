// pages/addlocal/addlocal.js
import data from '../../utils/data.js'
const app = getApp()
import { postRequest } from '../../utils/httpRequest.js'
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options1: data,
    value1: [],
    title1: '省份、城市、区县',
    address: '',
    phone: '',
    name: '',
    province: '',
    city: '',
    area: '',
    is_default: '0',
    checkedState: false,
    saveShow: false,
    revampShow: false,
    aid: ''
  },

  // 姓名
  advName (e) {
    let that = this
    console.log(e)
    that.setData({
      name: e.detail.value
    })
  },

  advPhone (e) {
    let that = this
    console.log(e)
    that.setData({
      phone: e.detail.value
    })
  },

  advAddress (e) {
    let that = this
    console.log(e)
    that.setData({
      address: e.detail.value
    })
  },

  onOpen1() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    if (e.detail.options.length == 3) {
      this.setData({
        title1: e.detail.options.map((n) => n.label).join('-'),
        province: e.detail.options[0].label,
        city: e.detail.options[1].label,
        area: e.detail.options[2].label
      })
    }
    console.log('onChange1', e.detail)
  },

  // 设置默认地址
  switchChange (e) {
    let that = this
    // console.log(e.detail.value)
    if (e.detail.value == true) {
      console.log('设置')
      that.setData({
        is_default: '1'
      })
    } else {
      console.log('不设置')
      that.setData({
        is_default: '0'
      })
    }
  },

  saveAddress () {
    let that = this
    if (that.data.name == '') {
      util.showMsg('姓名不能为空')
    } else if (!that.data.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('电话号码不正确')
    } else if (that.data.province == '' || that.data.city == '' || that.data.area == '') {
      util.showMsg('收货地址不能为空')
    } else if (that.data.address == '') {
      util.showMsg('详细地址不能为空')
    } else {
      let params = {
        token: app.globalData.userInfo.openid,
        name: that.data.name,
        phone: that.data.phone,
        province: that.data.province,
        city: that.data.city,
        area: that.data.area,
        address: that.data.address,
        is_default: that.data.is_default
      }
      console.log(params)
      postRequest('/user/addressAdd', params, true).then(res => {
        console.log(res)
        wx.navigateBack()
      })
    }
  },

  // 修改地址
  revampAddress () {
    console.log(1)
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      address_id: that.data.aid,
      name: that.data.name,
      phone: that.data.phone,
      province: that.data.province,
      city: that.data.city,
      area: that.data.area,
      address: that.data.address,
      is_default: that.data.is_default
    }
    console.log(params)
    postRequest('/user/addressUpdate', params, true).then(res => {
      wx.navigateBack()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
    let that = this
    console.log(options)
    if (options.id) {
      let aid = options.id
      that.setData({
        revampShow: true,
        aid: aid
      })
      let params = {
        token: app.globalData.userInfo.openid,
        address_id: aid
      }
      postRequest('/user/addressDetail', params, true).then(res => {
        console.log(res)
        if (res.is_default == '0') {
          that.setData({
            checkedState: false
          })
        } else {
          that.setData({
            checkedState: true
          })
        }
        that.setData({
          address: res.address,
          area: res.area,
          city: res.city,
          name: res.name,
          phone: res.phone,
          province: res.province,
          is_default: res.is_default,
          title1: `${res.province}-${res.city}-${res.area}`
        })
      })
    } else {
      console.log('新增地址进入')
      that.setData({
        saveShow: true
      })
    }
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
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})