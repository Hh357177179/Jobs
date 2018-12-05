var a = require("../../utils/util.js");

Page({
    data: {
        partner_realname: "",
        partner_nickname: "",
        partner_avatar: "",
        title: "",
        noperson: !0,
        sendVal: "",
        mePic: "",
        content: [],
        otherId: ""
    },
    backChat: function() {
        wx.switchTab({
            url: "/pages/chat/chat"
        });
    },
    getChart: function() {
        var t = this;
        wx.request({
            url: a.baseUrl + "/main/messageLog",
            data: {
                token: wx.getStorageSync("openid"),
                other_id: t.data.partner_id
            },
            success: function(a) {
                console.log(a);
            }
        });
    },
    advSendVal: function(a) {
        this.setData({
            sendVal: a.detail.value
        });
    },
    sendBtn: function() {
        var t = this;
        "" == t.data.sendVal ? a.showMsg("请输入留言！") : wx.request({
            url: a.baseUrl + "/main/messageTo",
            data: {
                token: wx.getStorageSync("openid"),
                other_id: t.data.otherId,
                content: t.data.sendVal
            },
            success: function(a) {
                console.log(a), 200 == a.data.code && (t.setData({
                    content: t.data.content.concat(t.data.sendVal),
                    sendVal: ""
                }), console.log(t.data.content));
            }
        });
    },
    onLoad: function(a) {
        var t = this;
        if (a.chartObj) {
            var e = JSON.parse(a.chartObj);
            t.setData({
                otherId: e.partner_id,
                partner_avatar: e.partner_avatar,
                partner_nickname: e.partner_nickname,
                partner_realname: e.partner_realname,
                title: e.title
            }), "" == e.partner_realname ? wx.setNavigationBarTitle({
                title: t.data.title + "项目合伙人" + t.data.partner_nickname
            }) : wx.setNavigationBarTitle({
                title: t.data.title + "项目合伙人" + t.data.partner_realname
            });
        }
        t.setData({
            mePic: wx.getStorageSync("avatar")
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});