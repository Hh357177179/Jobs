var t = require("../../utils/util.js");

Page({
    data: {
        phone: "",
        quantity: "",
        remark: "",
        integral: ""
    },
    phoneVal: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    quantityVal: function(t) {
        this.setData({
            quantity: t.detail.value
        });
    },
    remarkVal: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    givenBtn: function() {
        var a = this;
        "" == a.data.phone ? t.showMsg("手机号不能为空！") : a.data.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/) ? "" == this.data.quantity ? t.showMsg("转赠数量不能为空!") : wx.request({
            url: t.baseUrl + "/main/transfer",
            data: {
                token: wx.getStorageSync("openid"),
                to_phone: a.data.phone,
                number: a.data.quantity,
                note: a.data.remark
            },
            success: function(a) {
                console.log(a), 200 == a.data.code ? wx.switchTab({
                    url: "/pages/me/me"
                }) : t.showMsg(a.data.msg);
            }
        }) : t.showMsg("请输入正确手机号!");
    },
    onLoad: function(t) {
        this.setData({
            integral: wx.getStorageSync("score")
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});