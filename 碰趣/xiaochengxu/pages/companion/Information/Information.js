// pages/companion/Information/Information.js
import { postRequest, getRequest } from "../../../utils/HttpRequest.js";
const util = require("../../../utils/util");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,
    myuser_id: "",
    personal: {},
    picture_path: [],
    triplist: [],
    msglist: [],
    createactivity: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const user_id = options.user_id;
    this.setData({
      myuser_id: wx.getStorageSync("userId"),
      user_id: user_id
    });
    this.getUserInfo();
    this.getLatestGroup();
    this.getMyComments();
    this.getCreateActivity();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHuser_ide: function() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    if (e.from === "button") {
    }
    return {
      title: "碰趣",
      path: "pages/companion/describe/describe",
      success: function(res) {},
      fail: function(res) {}
    };
  },
  getUserInfo: function() {
    const submit_url = `${util.baseUrl}/getUserInfo`;
    let parmas = {
      user_id: this.data.user_id
    };
    postRequest(submit_url, parmas).then(res => {
      const response = res.data;
      this.setData({
        personal: response.info,
        picture_path: response.info.picture_path.split(",")
      });
    });
  },
  getLatestGroup: function() {
    const submit_url = `${util.baseUrl}/getLatestGroup`;
    let parmas = {
      user_id: this.data.user_id
    };
    postRequest(submit_url, parmas).then(res => {
      const response = res.data;
      this.setData({
        triplist: response.info
      });
    });
  },
  getMyComments: function() {
    const submit_url = `${util.baseUrl}/getMyComments`;
    let parmas = {
      uid: this.data.user_id
    };
    getRequest(submit_url, parmas).then(res => {
      console.log(31213123123123)
      const response = res.data;
      let msglist = [];
      if (response[0].comments.length <= 3) {
        for (let i = 0; i < response[0].comments.length; i++) {
          console.log("留言", response[0].comments[i]);
          msglist.push(response[0].comments[i]);
        }
        console.log(msglist);
      } else {
        for (let i = 0; i < 3; i++) {
          msglist.push(response[0].comments[i]);
        }
        console.log(msglist);
      }

      this.setData({
        msglist: msglist
      });
    });
  },
  getCreateActivity: function() {
    const submit_url = `${util.baseUrl}/getMyActivity`;
    let parmas = {
      uid: this.data.user_id
    };
    getRequest(submit_url, parmas).then(res => {
      this.setData({
        createactivity: res.data
      });
    });
  }
});
