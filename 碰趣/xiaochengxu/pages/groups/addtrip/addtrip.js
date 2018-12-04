// pages/addtrip/addtrip.js
const util = require("../../../utils/util.js");
import { postRequest, getRequest } from "../../../utils/HttpRequest";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activelist: [],
    selected_active: [],
    candidate: true,
    selected: false,
    group_id: "",
    userId: ""
  },
  tabChange: function(e) {
    console.log(e.currentTarget.dataset.target);
    const target = e.currentTarget.dataset.target;
    if (target == "candidate") {
      this.setData({
        candidate: true,
        selected: false
      });
    } else {
      this.setData({
        candidate: false,
        selected: true
      });
      this.getSelectedActivity();
    }
    //const target = e.curr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      group_id: options.group_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getActivitylist();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

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
  onShareAppMessage: function() {},
  searchAction: function(e) {
    this.getActivitylist(e.detail.value);
  },

  getActivitylist: function(...cityname) {
    let _this = this;
    const submit_url = `${util.baseUrl}/getActivities`;
    let params = {
      city_name: cityname
    };
    postRequest(submit_url, params, true).then(res => {
      this.setData({
        activelist: res.data.info
      });
    });
  },

  getSelectedActivity: function() {
    //getGroupActivities
    let _this = this;
    const submit_url = `${util.baseUrl}/getGroupActivities`;
    let params = {
      group_id: this.data.group_id
    };
    postRequest(submit_url, params, true).then(res => {
      _this.setData({
        selected_active: res.data.info
      });
    });
  },

  addItinerary: function(e) {
    const activity_id = e.currentTarget.dataset.id;
    const submit_url = `${util.baseUrl}/addGroupActivity`;
    let params = {
      group_id: this.data.group_id,
      activity_id: activity_id,
      user_id: wx.getStorageSync("userId")
    };
    postRequest(submit_url, params, true).then(() => {
      util.showMsg("行程添加成功!");
    });
  },
  deltinerary: function(e) {
    const activity_id = e.currentTarget.dataset.id;
    const submit_url = `${util.baseUrl}/delGroupActivity`;
    let params = {
      group_id: this.data.group_id,
      activity_id: activity_id,
      user_id: wx.getStorageSync("userId")
    };
    postRequest(submit_url, params).then(res => {
      util.showMsg(res.data.msg);
      this.getSelectedActivity();
    });
  }
});
