// pages/grouplist/grouplist.js
const util = require('../../../utils/util.js')
import {
  postRequest
} 
from '../../../utils/HttpRequest'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGrouplist: [],

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
    this.getMyGroupList()
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

  },
  getMyGroupList: function () {
    const submit_url = `${util.baseUrl}getMyGroup`
    let params = {
      user_id: wx.getStorageSync("userId"),
    }
    postRequest(submit_url, params, true).then(res => {
      console.log('我创建的团', res.data)
      let response = res.data

      // response.info.forEach((item,index) => {
      //   item.img_url= this.imageToarray(item.img_url)
      // });    
      this.setData({
        myGrouplist: response.info
      })
    })
  },
  imageToarray: function (img_url) {
    let imgArray = []
    if (img_url != "") {
      imgArray = img_url.split(",")
      console.log(imgArray)
    }
    return imgArray
  }


})