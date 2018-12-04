// pages/detailed/detailed.js 
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
    group_details: {},
    group_users: [],
    base_img_url: util.baseUrl + 'uploads/images/',
    selected: true,
    selected1: false,
    isPostback: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
        id: 1,
        latitude: 23.099994,
        longitude: 113.324520,
        name: 'T.I.T 创意园'
      },
      {
        latitude: 23.099994,
        longitude: 113.344520,
        width: 55,
        height: 55,
        iconPath: '/images/location.png'
      },
      {
        latitude: 23.099994,
        longitude: 113.304520,
        width: 55,
        height: 55,
        iconPath: '/images/location.png'
      }
    ],
    polyline: [{
      points: [{
        latitude: 23.099994,
        longitude: 113.324520,
      }, {
        latitude: 23.099994,
        longitude: 113.304520,
      }],
      color: "#ff6600",
      width: 2,
      dottedLine: false,
      arrowLine: true,
      arrowIconPath: '/images/arrow.png',
      borderColor: "#000",
      borderWidth: 5
    }],

  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options", options)
    this.getGroupDetails(options.group_id)

    this.setData({
      group_id: options.group_id,
      isPostback: 1
    })

    // if (wx.getStorageSync("userInfo")==""){
    //   wx.navigateTo({
    //     url: '/page/login/login',
    //   })
    // }
    console.log("userid.app",app.globalData.userId)
    console.log("userid",wx.getStorageSync("userId"))

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const isPostback = this.data.isPostback
    if (isPostback == 0) {
      console.log("onShow")
      this.getGroupDetails(this.data.group_id)
    }
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
    const nickname = app.globalData.userName
    const group_title = this.data.group_details.title
    const group_id = this.data.group_id
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${nickname}邀请你加入${group_title}`,
      path: `/pages/groups/detailed/detailed?group_id=${group_id}`
    }
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
      this.getGroupDetails(this.data.group_id)
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
      this.getGroupDetails(this.data.group_id)
    })
  },
  click_img: function (e) {
    wx.navigateTo({
      url: '../inside/inside?group_activity_id=' + e.currentTarget.id,
    })
  },
  apply_activity_leader: function (e) {
    console.log('申请');
    const is_singup = e.currentTarget.dataset.singup
    console.log(e)
    const submit_url = `${util.baseUrl}/setGroupActivityLeader`
    let params = {
      id: e.currentTarget.id,
      user_id: wx.getStorageSync("userId")
    }
    if (is_singup != 0) {
      postRequest(submit_url, params, true).then(res => {
        // console.log(res.data.info);
        this.getGroupDetails(this.data.group_id)
        this.setData({
          // group_details: res.data.info
        })
      })
    } else {
      util.showMsg("您还未报名,不能申请团长")
    }

  },
  apply: function (e) {
    let _this = this
    const submit_url = `${util.baseUrl}/singupGroupActivity`
    let params = {
      group_activity_id: e.currentTarget.id,
      user_id: wx.getStorageSync("userId")
    }
    postRequest(submit_url, params, true).then(res => {
      // console.log(res.data.info);
      this.setData({
        group_details: res.data.info
      })
    })
  },
  getGroupDetails: function (group_id) {
    let _this = this
    const submit_url = `${util.baseUrl}/getGroupDetail`
    let params = {
      id: group_id,
      user_id: wx.getStorageSync("userId")
    }
    postRequest(submit_url, params, true).then(res => {
      console.log(res.data.info);
      if (res.data.status != 0) {
        this.setData({
          group_details: res.data.info,
          isPostback: 0
        })
        this.getGroupUsers(group_id)
      } else {
        util.showMsg(res.data.msg)
      }

    })
  },
  getGroupUsers: function (group_id) {

    const submit_url = `${util.baseUrl}/getGroupUsers`
    let params = {
      group_id: group_id,
    }
    postRequest(submit_url, params).then(res => {
      this.setData({
        group_users: res.data.info
      })
    })
  },




})