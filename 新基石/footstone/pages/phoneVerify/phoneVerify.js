var e = require("../../utils/util.js");

Page({
  data: {
    passWord: '',
    userName: "",
    userPhone: "",
    code: "",
    codeMsg: "发送验证码",
    codeBtn: !1,
  },
  passWordVal(e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  userNameVal: function(e) {
    console.log(e.detail.value), this.setData({
      userName: e.detail.value
    });
  },
  phoneVal: function(e) {
    console.log(e.detail.value), this.setData({
      userPhone: e.detail.value
    });
  },
  codeVal: function(e) {
    console.log(e.detail.value), this.setData({
      code: e.detail.value
    });
  },
  getCode: function() {
    console.log(this.data.userPhone);
    var a = this;
    a.data.userPhone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/) ? wx.request({
      url: e.baseUrl + "/user/sms",
      data: {
        phone: a.data.userPhone
      },
      success: function(e) {
        if (console.log(e), 200 == e.data.code) var o = 60,
          t = setInterval(function() {
            a.setData({
              codeMsg: o + "s",
              codeBtn: !0
            }), 0 == o && (clearInterval(t), a.setData({
              codeMsg: "发送验证码",
              codeBtn: !1
            })), o -= 1;
          }, 1e3);
      }
    }) : e.showMsg("请输入正确手机号!");
  },
  phoneClick: function() {
    var a = this;
    "" == a.data.userName ? e.showMsg("姓名不能为空!") : "" == a.data.passWord ? e.showMsg("密码不能为空!") : "" == a.data.userPhone ? e.showMsg("电话号码不能为空!") : "" == a.data.code ? e.showMsg("验证码不能为空!") : wx.request({
      url: e.baseUrl + "/user/authentication",
      data: {
        token: wx.getStorageSync("openid"),
        realname: a.data.userName,
        phone: a.data.userPhone,
        smscode: a.data.code,
        password: a.data.passWord
      },
      success: function(o) {
        console.log(o), 200 == o.data.code ? (wx.setStorageSync("phone", a.data.userPhone),
          wx.setStorageSync("realname", a.data.userName), e.showMsg("认证成功！"), wx.navigateBack()) : e.showMsg(o.data.msg);
      }
    });
  },
  onLoad: function(e) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});