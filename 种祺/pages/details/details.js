// pages/details/details.js
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNum: 0,
    shop_id: '',
    shopDetail: {},
    detailTeacher: [],
    detailSpecial: [],
    tel: ''
  },

  // 打电话
  callTel () {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    })
  },

  // 切换效果
  clickTab(e) {
    let that = this
    let tabNum = e.currentTarget.dataset.tabnum
    // console.log(tabNum)
    that.setData({
      tabNum: tabNum
    })
    if (tabNum == 0) {
      that.getTeacher()
    } else {
      that.getSpecial()
    }
  },

  // 点击地址查看
  searchMap (e) {
    // console.log(e.currentTarget.dataset)
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    wx.navigateTo({
      url: `/pages/searchMap/searchMap?latitude=${latitude}&&longitude=${longitude}`,
    })
  },

  // 获取详情信息
  getDetail () {
    let that = this
    let params = {
      shop_id: that.data.shop_id
    }
    postRequest('/main/shopDetail', params, true).then(res => {
      console.log(res)
      if (res.shop_special != '') {
        res.shop_special = JSON.parse(res.shop_special)
      }
      if (res.shop_url != '') {
        res.shop_url = JSON.parse(res.shop_url)
      }
      that.setData({
        shopDetail: res,
        tel: res.phone
      })
    })
  },

  // 获取店铺特色服务
  getSpecial () {
    let that = this
    let params = {
      shop_id: that.data.shop_id
    }
    postRequest('/main/getShopService', params, true).then(res => {
      console.log(res)
      for (let i = 0,len = res.length; i < len; i ++) {
        res[i].picurl = JSON.parse(res[i].picurl)
      }
      that.setData({
        detailSpecial: res
      })
    })
  },

  // 获取店铺医师列表
  getTeacher () {
    let that = this
    let params = {
      shop_id: that.data.shop_id
    }
    postRequest('/main/getShopDocter', params, true).then(res => {
      // console.log(res)
      for (let i = 0,len = res.length; i < len; i++) {
        if (res[i].special != '') {
          res[i].special = JSON.parse(res[i].special)
        }
      }
      that.setData({
        detailTeacher: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let shopId = options.shopId
    that.setData({
      shop_id: shopId
    })
    that.getDetail()
    that.getTeacher()
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