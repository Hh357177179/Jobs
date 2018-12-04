// pages/inside/inside.
const util = require('../../../utils/util.js')
import {
  postRequest
} from '../../../utils/HttpRequest'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityDetail: {} ,
    uid: wx.getStorageSync("userId")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: wx.getStorageSync("userId")
    }),
    this.getGroupActivityDetail(options.group_activity_id)
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
  getGroupActivityDetail: function (group_activity_id) {
    const submit_url = `${util.baseUrl}/getGroupActivityDetail`
    let params = {
      id: group_activity_id,
      user_id: wx.getStorageSync("userId")
    }
    postRequest(submit_url, params).then(res => {
      //res.data
      this.setData({
        activityDetail: res.data.info
      })

    })
  },
  vote:function(){
    //data.info.activity_id
    //userid
    console.log("投票")
    const submit_url = `${util.baseUrl}/singupGroupActivity`
    let params = {
      group_activity_id :this.data.activityDetail.id,
      user_id:wx.getStorageSync("userId")
    }
    this.setData({
      "activityDetail.is_singup": 1
    })
    postRequest(submit_url,params).then(res=>{
      util.showMsg(res.data.msg)
    })
  },
  vote_cancel: function () {
    //data.info.activity_id
    //userid
    console.log("取消投票")
    const submit_url = `${util.baseUrl}/cancelSingupGroupActivity`
    let params = {
      id: this.data.activityDetail.id,
      user_id: wx.getStorageSync("userId")
    }

    this.setData({
      "activityDetail.is_singup": 0
    })
    postRequest(submit_url, params).then(res => {
      util.showMsg(res.data.msg)
    })
  },
  gotoAssistant:function(e){
    let user_id =e.currentTarget.dataset.userId
    wx.navigateTo({
      url: `../assistant/assistant?user_id=${user_id}`
    })
  }
})