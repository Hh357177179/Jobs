// pages/appoint/appoint.js
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
    activityDetailed: {},
    leader: {},
    group_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pid = options.pid
    this.getActivedetailed(pid)
    this.setData({
      group_id: options.group_id
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
  getActivedetailed: function (pid) {
    let _this = this
    const submit_url = `${util.baseUrl}/getGroupActivityDetail`
    let params = {
      id: pid,
      user_id:wx.getStorageSync("userId")
    }
    postRequest(submit_url, params,true).then(res => {
      _this.setData({
        activityDetailed: res.data.info
      })
      let leader = {
        user_id: this.data.activityDetailed.leader.user_id,
        nick_name: this.data.activityDetailed.leader.nick_name,
        avatar: this.data.activityDetailed.leader.avatar
      }
      this.setData({
        leader: leader
      })

    })
  },
  setLeader: function (e) { 
    const user_id = e.currentTarget.dataset.id
    const nick_name = e.currentTarget.dataset.uname
    const avatar = e.currentTarget.dataset.avatar
    let leader = {
      user_id:user_id,
      nick_name:nick_name,
      avatar:avatar
    }
    this.setData({
      leader:leader
    })
  },
  submitChange: function (e) {
    const submit_url = `${util.baseUrl}/setGroupActivityLeader`
    const group_id = this.data.group_id
    const activity_id = this.data.activityDetailed.id
    const user_id = this.data.leader.user_id
    let params = { 
      id: activity_id,
      user_id: user_id,
    }
    postRequest(submit_url, params,true).then(res => {
      util.showMsg(res.data.msg)
      wx.navigateTo({
        url: `../detailed/detailed?group_id=${group_id}`
      })
    })
  }

})