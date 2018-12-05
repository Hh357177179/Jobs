var t = require("../../utils/util.js");

Page({
    data: {
        status: "",
        chatList: [],
        uid: ""
    },
    getChartList: function() {
        var a = this;
        wx.request({
            url: t.baseUrl + "/main/messageList",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data), 200 == t.data.code && a.setData({
                    chatList: t.data.data
                });
            }
        });
    },
    searchChart: function(a) {
        console.log(a), "" == wx.getStorageSync("phone") ? t.showMsg("请完成手机认证！") : wx.navigateTo({
            url: "/pages/otherchat/otherchat?id=" + a.currentTarget.dataset.id
        });
    },
    onLoad: function(t) {
        this.setData({
            status: wx.getStorageSync("status"),
            uid: wx.getStorageSync("uid")
        });
    },
    onReady: function() {},
    onShow: function() {
        2 == wx.getStorageSync("status") && 3 == wx.getStorageSync("status") ? wx.showToast({
            title: "您没有权限！",
            icon: "none",
            duration: 2e3
        }) : this.getChartList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});