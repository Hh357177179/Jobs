// pages/assistant/assistant.js
const util = require('../../../utils/util.js')
import {
  postRequest,
  getRequest
} from '../../../utils/HttpRequest'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trip:{},
    group_id:"",
    user_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user_id = options.user_id
    
    this.get_trip(user_id, options.group_id);
    this.setData({
      group_id: options.group_id,
      user_id:user_id
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
  
  },
  get_trip: function (user_id,group_id) {
    let _this = this
    const submit_url = `${util.baseUrl}/getHisActivity`
    let params = {
      user_id: wx.getStorageSync("userId"),
      group_id: group_id,
      his_user_id: user_id
    }
    postRequest(submit_url, params, true).then(res => {
      // console.log(res.data.info);
      this.setData({
        trip: res.data.info
      })
    })
  },
  vote: function (e) {

    // wx.showToast({
    //   title: '您尚未报名该团，请点击下方按钮报名',
    //   icon: 'success',
    //   duration: 1500
    // })
    //console.log(e);
    let _this = this
    const submit_url = `${util.baseUrl}/singupGroupActivity`
    let params = {
      group_activity_id: e.currentTarget.id,
      user_id: wx.getStorageSync("userId")
    }
    postRequest(submit_url, params, true).then(res => {
      console.log(res.data.info);
      this.get_trip(params.user_id,this.data.group_id)
    })
  },
  vote_cancel: function (e) {
    //console.log(e);
    let _this = this
    const submit_url = `${util.baseUrl}/cancelSingupGroupActivity`
    let params = {
      id: e.currentTarget.id,
      user_id: wx.getStorageSync("userId")
    }
    postRequest(submit_url, params, true).then(res => {
      //console.log(res.data.info);
      this.get_trip(params.user_id,this.data.group_id)
    })
  },
})