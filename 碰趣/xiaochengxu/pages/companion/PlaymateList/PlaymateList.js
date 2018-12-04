// pages/companion/PlaymateList/PlaymateList.js
const util = require("../../../utils/util.js");
import { postRequest } from "../../../utils/HttpRequest";

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    PlaymateList: [],
    longitude: "",
    latitude: "",
    mylongitude: "",
    mylatitude: "",
    page: 1,
    limit: 10,
    openSetting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  //地址信息存储
  getLocationAction: function() {
    return new Promise((resolve, resject) => {
      let position = {
        latitude: "",
        longitude: ""
      };
      wx.getLocation({
        type: "wgs84",
        success: res => {
          position.latitude = res.latitude;
          position.longitude = res.longitude;
          this.setData({
            mylongitude: res.longitude,
            mylatitude: res.latitude
          });
          console.log("position", position);
          resolve(position);
        }
      });
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
    console.log("碰游伴页面onshow");
    let _this = this;
    let page = this.data.page;
    let limit = this.data.limit;
    const position = wx.getStorageSync("position");
    console.log(".getStorageSync('position')", position);
    if (position != "") {
      this.setData({
        longitude: position.longitude,
        latitude: position.latitude
      });
    }
    this.setData({
      PlaymateList: [],
      openSetting: false
    });

    wx.getSetting({
      success: setres => {
        console.log("list获取用户信息", setres);

        if (!setres.authSetting["scope.userLocation"]) {
          console.log("oooo");
          _this.setData({
            openSetting: true
          });
          wx.authorize({
            scope: "scope.userLocation",
            success: () => {
              console.log("用户已经同意授权地理位置");
              _this.setData({
                openSetting: false
              });
              _this.getLocationAction().then(() => {
                _this.getPlaymateList(page, limit);
              });
              return;
            },
            fail: () => {
              util.showMsg(
                "您没有打开授权,将不能显示相关信息,请点击授权按钮打开授权"
              );
            }
          });
        } else {
          _this.setData({
            openSetting: false
          });
          _this.getLocationAction().then(() => {
            console.log("已经授权过的,数据显示");
            _this.getPlaymateList(page, limit);
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.removeStorageSync("position");
    this.setData({
      latitude: "",
      longitude: ""
    });
  },

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
  onReachBottom: function() {
    let page = this.data.page + 1;
    let limit = this.data.limit;
    this.getPlaymateList(page, limit);
    this.setData({
      page: page
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  getPlaymateList: function(page, limit) {
    const submit_url = `${util.baseUrl}/getNearList`;
    const { longitude, latitude, mylongitude, mylatitude } = this.data;

    let params = {
      user_id: wx.getStorageSync("userId"),
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      page: page,
      limit: limit
    };
    if (longitude == "" && latitude == "") {
      console.log("bb");
      (params.longitude = mylongitude), (params.latitude = mylatitude);
    }
    let list = this.data.PlaymateList;
    console.log("params--------", params);
    postRequest(submit_url, params, true).then(res => {
      console.log("getPlaymateList", res);
      let response = res.data;

      if (response.info.length != 0) {
        list = [...list, ...response.info];
      } else {
        this.setData({
          page: 1
        });
      }
      this.setData({
        PlaymateList: list
      });
    });
  }
});
