// pages/found/found.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  data: {
    theme: true,
    back: false,
    pagedata: [],
    finisheddata:[]
  },

  onShareAppMessage: function (e) {
    if (e.from === 'button') {
    }
    return {
      title: e.target.value,
      path: '/pages/active/active?id=' + e.target.id,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getActivitylist()
    // this.getFinishedActivity()
  },
  /**
   * 生命周期函数--监听页面显示刷新
   */
  onShow:function(options)
  {
    this.getActivitylist()
    this.getFinishedActivity()
  },
  theme: function (e) {
    this.setData({
      back: false,
      theme: true
    })
  },
  back: function (e) {
    this.setData({
      theme: false,
      back: true
    })
  },
  like:function(e)
  {
    //console.log(e);
    wx.request({
      // url: "https://www.cupidocoffee.com/setMyLikeActivity",
      url: util.baseUrl +"setMyLikeActivity",
      data: {
        uid: wx.getStorageSync("userId"),
        activity_id: e.currentTarget.id
      },
      method: 'GET',
      success: res => {
       
      },
      fail(res) {

      }
    })
  },

  getActivitylist: function () {
   
    let pd = []
    wx.request({
      url: util.baseUrl+"getActivityByDate",
      data: {
        uid: wx.getStorageSync("userId")

      },
      method: 'GET',
      success: res => {
         console.log(res.data)
        pd = res.data
        this.setData({
          pagedata: pd
        })
        
      },
      fail(res) {

      }
    })
  },

  getFinishedActivity:function(){
    let pd = []
    wx.request({
      url: util.baseUrl + "getFinishedActivity",
      data: {
        uid: wx.getStorageSync("userId")
      },
      method: 'GET',
      success: res => {
        console.log(res.data)
        pd = res.data
        this.setData({
          finisheddata: pd
        })

      },
      fail(res) {

      }
    })
  },

})