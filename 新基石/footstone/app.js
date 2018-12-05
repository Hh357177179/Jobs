var a = require("./utils/util.js");

App({
  getSq: function() {
    var t = this;
    wx.getSetting({
      success: function(e) {
        e.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function(e) {
            var n = e.userInfo;
            wx.login({
              success: function(t) {
                wx.request({
                  url: a.baseUrl + "/user/isLogin",
                  method: "POST",
                  data: {
                    code: t.code
                  },
                  success: function(e) {
                    200 == e.data.code ? (wx.setStorageSync("openid", e.data.data.openid), wx.setStorageSync("avatar", e.data.data.avatar),
                      wx.setStorageSync("nickname", e.data.data.nickname), wx.setStorageSync("status", e.data.data.status),
                      wx.setStorageSync("phone", e.data.data.phone), wx.setStorageSync("realname", e.data.data.realname),
                      wx.setStorageSync("score", e.data.data.score)) : wx.request({
                      url: a.baseUrl + "/user/register",
                      method: "POST",
                      data: {
                        openid: t.code,
                        nickname: n.nickName,
                        avatar: n.avatarUrl,
                        pid: ""
                      },
                      success: function(a) {
                        200 == a.data.code && (wx.setStorageSync("openid", a.data.data.openid), wx.setStorageSync("avatar", a.data.data.avatar),
                          wx.setStorageSync("nickname", a.data.data.nickname), wx.setStorageSync("status", a.data.data.status),
                          wx.setStorageSync("phone", e.data.data.phone), wx.setStorageSync("realname", e.data.data.realname),
                          wx.setStorageSync("score", e.data.data.score));
                      }
                    });
                  }
                });
              }
            }), t.userInfoReadyCallback && t.userInfoReadyCallback(e);
          }
        }) : wx.redirectTo({
          url: "/pages/login/login"
        });
      }
    });
  },
  onLaunch: function(a) {},
  globalData: {
    userInfo: null,
    openid: null,
    avatar: null
  }
});