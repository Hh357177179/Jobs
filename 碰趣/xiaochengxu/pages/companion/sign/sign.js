// pages/companion/sign/sign.js
const util = require("../../../utils/util.js");
import { postRequest } from "../../../utils/HttpRequest";
var globalData = getApp().globalData;
Page({
  data: {
    localaddress: "",
    latitude: "",
    longitude: "",
    beginDate: util.dateFormat(new Date()),
    beginTime: util.timeFormat(new Date()),
    endDate: util.dateFormat(new Date()),
    endTime: util.timeFormat(new Date()),
    startDate: util.dateFormat(new Date()),
    startTime: util.timeFormat(new Date()),
    openSetting: false
  },
  onLoad: function(options) {},
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    this.isAuthorize();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  submit: function(e) {
    //写入参数
    const submit_url = `${util.baseUrl}/signin`;
    const position = {
      longitude: this.data.longitude,
      latitude: this.data.latitude
    };
    const start_time = `${this.data.beginDate} ${this.data.beginTime}`;
    const end_time = `${this.data.endDate} ${this.data.endTime}`;
    const params = {
      user_id: wx.getStorageSync("userId"),
      ...e.detail.value,
      ...position,
      start_time: start_time,
      end_time: end_time
    };
    if (start_time == end_time) {
      util.showMsg("结束时间和开始时间相同");
      return;
    }
    if (start_time > end_time) {
      util.showMsg("开始时间大于结束时间请重新选择");
      return;
    }
    console.log("params", params);
    util.Validate(e.detail.value, {
        rules: {
          address: {
            required: true,
            message: "请填写地址"
          },
          reason: {
            required: true,
            message: "请填写内容"
          }
        }
      })
      .then(res => {
        postRequest(submit_url, params, true)
          .then(res => {
            util.showMsg("提交成功");
            wx.navigateBack({
              url: `../PlaymateList/PlaymateList?longitude=${position.longitude}&latitude=${position.latitude}`
            });
          })
          .catch(err => {
            util.showMsg("提交失败");
            console.log(err);
          });
      })
      .catch(err => {
        console.log("err", err);
        util.showMsg(err.msg);
      });
  },
  //开始日期
  bindBeginDateChange: function(e) {
    this.setData({
      beginDate: e.detail.value
    });
  },
  //开始时间
  bindBeginTimeChange: function(e) {
    this.setData({
      beginTime: e.detail.value
    });
  },
  //结束日期
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    });
  },
  //结束时间
  bindEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    });
  },
  chooseAddressAction: function() {
    wx.getSetting({
      success: res => {
        if (!res.authSetting["scope.userLocation"]) {
          this.setData({
            openSetting: true
          });
          wx.authorize({
            scope: "scope.userLocation",
            success: () => {
              console.log("用户已经同意授权地理位置");
              _this.setData({
                openSetting: false
              });
              wx.chooseLocation({
                success: res => {
                  if (res) {
                    this.setData({
                      localaddress: res.address,
                      latitude: res.latitude,
                      longitude: res.longitude
                    });
                  }
                },
                fail: res => {},
                complete: res => {}
              });
              return;
            }
          });
          util.showMsg(
            "您没有打开授权,将不能使用地图获取位置,请手动填写或者点击授权按钮设置"
          );
        } else {
          this.setData({
            openSetting: false
          });
          wx.chooseLocation({
            success: res => {
              if (res) {
                this.setData({
                  localaddress: res.address,
                  latitude: res.latitude,
                  longitude: res.longitude
                });
              }
            },
            fail: res => {},
            complete: res => {}
          });
        }
      }
    });
  },
  isAuthorize: function() {
    let _this = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting["scope.userLocation"]) {
          _this.setData({
            openSetting: true
          });
          wx.authorize({
            scope: "scope.userLocation",
            success: () => {
              _this.setData({
                openSetting: false
              });
            }
          });
        } else {
          _this.setData({
            openSetting: false
          });
        }
      }
    });
  }
});
