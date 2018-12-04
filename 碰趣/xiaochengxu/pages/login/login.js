// pages/login/login.js
const util = require('../../utils/util')
import {
  getRequest,
  postRequest
} from '../../utils/HttpRequest'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ""
  },

  btnGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.userName = e.detail.userInfo.nickName;
    app.globalData.userImage = e.detail.userInfo.avatarUrl;


    wx.setStorageSync("userInfo", e.detail.userInfo)





    const saveInfo_url = `${util.baseUrl}/saveInfo`;
    const getUserInfo_url = `${util.baseUrl}/getUserInfo`;
    const userId = wx.getStorageSync('userId');
    const userInfo = wx.getStorageSync('userInfo');
    let saveInfo_params = {
      uid: userId,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
    };
    let getUserInfo_params = {
      user_id: userId,
    };

    postRequest(getUserInfo_url, getUserInfo_params).then(res => {
      const response = res.data;
      console.log("重新赋值头像的操作", response)

      if (
        response.info.avatar == '' ||
        response.info.avatar == 'null ' ||
        response.info.avatar == null
      ) {
        console.log('要 save 的 userinfo', userId);
        getRequest(saveInfo_url, saveInfo_params).then(() => {
          console.log("跳转")
         
        });
      }
      wx.navigateBack({
        delta: 1
      })

    });





  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const userInfo = wx.getStorageSync("userInfo")
    const author = options.author
    console.log(userInfo)
    if (author != 'page' && userInfo != "") {
      wx.reLaunch({
        url: '/pages/trip/trip',
      })
    } else if (author == 'page' && userInfo != "") {
      this.setData({
        userInfo: userInfo
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
  onShareAppMessage: function () {

  },

})