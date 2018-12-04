// pages/release/release.js
const util = require('../../utils/util.js')
const app = getApp();
//var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagedata: [],
 
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getActivitylist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示刷新
   */
  onShow: function () {
    this.getActivitylist();
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
  

  getActivitylist: function () {
    let pd = [];
    let _this = this;
    let img_paths = [];
    wx.request({
      url: util.baseUrl+"/getMyActivity" ,
      data: {
        uid: wx.getStorageSync("userId")
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        if (res.data.length != 0) {
          pd = res.data;
          _this.setData({
            pagedata: pd,
          });
        }
        else{
        // util.showMsg("暂无数据")
        }
      },
      fail: function (res) {
      }
    })
  },

  deleteActivity: function(e) {
    console.log(e.detail.value.aid);
    wx.request({
      // url: 'http://localhost/remove',
      url: util.baseUrl + 'remove',
      data: {
        aid: e.detail.value.aid
      },
      success: function(result) {
        console.log(result.data.msg)
        wx.showToast({
          title: result.data.msg,
          icon: 'none'
        })
      }
    })
  } 

})