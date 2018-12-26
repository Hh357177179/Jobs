var a = require("../../utils/util.js");

Page({
  data: {
    page: 1,
    pagesize: 10,
    homeList: [],
    counts: "",
    pid: "",
    srclocal: '',
    showPics: false
  },

  rproDetail (e) {
    console.log(e)
    let t = this
    let id = e.currentTarget.dataset.proid
    wx.navigateTo({
      url: '/pages/onlyDetail/onlyDetail?id=' + id,
    })
  },
  
  sBpic (e) {
    let t = this
    console.log(e.currentTarget.dataset.src)
    let src = e.currentTarget.dataset.src
    t.setData({
      srclocal: src,
      showPics: true
    })
  },

  picMask () {
    let t = this
    t.setData({
      showPics: false
    })
  },

  getSq: function() {
    var t = this,
      e = this;
    wx.getSetting({
      success: function(o) {
        console.log("获取用户信息", o), o.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function(o) {
            var n = o.userInfo;
            console.log("个人信息", n), wx.login({
              success: function(t) {
                console.log("获取code", t.code), wx.request({
                  url: a.baseUrl + "/user/isLogin",
                  method: "POST",
                  data: {
                    code: t.code
                  },
                  success: function(t) {
                    console.log("检查是否注册", t), 200 == t.data.code ? (wx.getStorageSync("qid") && (console.log("获取pid", e.data.pid),
                        console.log(t.data.data.openid), wx.request({
                          url: a.baseUrl + "/main/beCustomer",
                          method: "POST",
                          data: {
                            token: t.data.data.openid,
                            pid: wx.getStorageSync("qid")
                          },
                          success: function(a) {
                            console.log(a);
                          }
                        })), wx.setStorageSync("openid", t.data.data.openid), wx.setStorageSync("avatar", t.data.data.avatar),
                      wx.setStorageSync("nickname", t.data.data.nickname), wx.setStorageSync("status", t.data.data.status),
                      wx.setStorageSync("phone", t.data.data.phone), wx.setStorageSync("realname", t.data.data.realname),
                      wx.setStorageSync("is_chuangshiren", t.data.data.is_chuangshiren), wx.setStorageSync("is_hehuoren", t.data.data.is_hehuoren), wx.setStorageSync("is_tianshi", t.data.data.is_tianshi), wx.setStorageSync("score", t.data.data.score), wx.setStorageSync("password", t.data.data.password), wx.setStorageSync("transfer_pass", t.data.data.transfer_pass), wx.setStorageSync("uid", t.data.data.id)) : (console.log("没注册过的", t),
                      console.log("没注册过获取pid", wx.getStorageSync("qid")), wx.request({
                        url: a.baseUrl + "/user/register",
                        method: "POST",
                        data: {
                          openid: t.data.data.openid,
                          nickname: n.nickName,
                          avatar: n.avatarUrl,
                          pid: wx.getStorageSync("qid")
                        },
                        success: function(a) {
                          200 == a.data.code && (console.log("注册成功", a), wx.setStorageSync("openid", a.data.data.openid),
                            wx.setStorageSync("avatar", a.data.data.avatar), wx.setStorageSync("nickname", a.data.data.nickname),
                            wx.setStorageSync("status", a.data.data.status), wx.setStorageSync("phone", a.data.data.phone),
                            wx.setStorageSync("realname", a.data.data.realname), wx.setStorageSync("score", a.data.data.score),
                            wx.setStorageSync("is_tianshi", a.data.data.is_tianshi), wx.setStorageSync("is_hehuoren", a.data.data.is_hehuoren), wx.setStorageSync("is_chuangshiren", a.data.data.is_chuangshiren), wx.setStorageSync("uid", a.data.data.id), wx.setStorageSync("transfer_pass", t.data.data.transfer_pass), wx.setStorageSync("password", a.data.data.password));
                        }
                      }));
                  }
                });
              }
            }), t.userInfoReadyCallback && t.userInfoReadyCallback(o);
          }
        }) : wx.redirectTo({
          url: "/pages/login/login"
        });
      }
    });
  },
  getDynamic: function() {
    var t = this;
    wx.showLoading({
      title: "正在加载"
    }), wx.request({
      url: a.baseUrl + "/main/dynamicList",
      method: "POST",
      data: {
        page: t.data.page,
        pagesize: t.data.pagesize
      },
      success: function(a) {
        var e = a.data.data;
        console.log(123213,e)
        if (200 == a.data.code) {
          wx.hideLoading();
          for (var o = 0; o < e.list.length; o++) {
            e.list[o].picurl = e.list[o].picurl.split('|')
          }
          t.setData({
            homeList: t.data.homeList.concat(e.list),
            counts: e.count
          });
        }
      }
    });
  },
  onLoad: function(a) {
    console.log("获取options", a);
    var t = this,
      e = a.q;
    if (console.log("options.pid", e), e) {
      console.log("if判断里面有pid", e);
      var o = decodeURIComponent(e),
        n = o.split("pid=");
      console.log("转码pid", o), console.log("得到pid", n[1]), wx.setStorageSync("qid", n[1]),
        wx.showModal({
          title: "提示",
          content: "进入小程序",
          showCancel: !1,
          success: function(a) {
            t.getSq(), t.getDynamic();
          }
        });
    } else console.log("不是扫码进入"), t.getSq(), t.getDynamic();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    var t = this;
    t.setData({
      page: 1,
      pagesize: 10
    }), wx.request({
      url: a.baseUrl + "/main/dynamicList",
      data: {
        page: t.data.page,
        pagesize: t.data.pagesize
      },
      success: function(a) {
        var e = a.data.data;
        if (200 == a.data.code) {
          wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
          // for (var o = 0; o < e.list.length; o++) e.list[o].picurl = JSON.parse(e.list[o].picurl);
          for (var o = 0; o < e.list.length; o++) {
            e.list[o].picurl = e.list[o].picurl.split('|')
          }
          t.setData({
            homeList: e.list,
            counts: e.count
          });
        }
      }
    });
  },
  onReachBottom: function() {
    var a = this;
    a.data.page * a.data.pagesize < a.data.counts && (a.setData({
      page: a.data.page + 1
    }), a.getDynamic());
  },
  onShareAppMessage: function() {}
});