var t = require("../../utils/util.js");

Page({
    data: {
        otherId: "",
        chatArr: [],
        chatList: [],
        uid: "",
        scrollTop: "607",
        Allheight: "",
        minePic: "",
        sendVal: "",
        oid: ""
    },
    getChatSearch: function() {
        var a = this;
        wx.request({
            url: t.baseUrl + "/main/messageLog",
            data: {
                token: wx.getStorageSync("openid"),
                other_id: a.data.otherId
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    a.setData({
                        chatList: e
                    });
                }
            }
        });
    },
    advSendVal: function(t) {
        this.setData({
            sendVal: t.detail.value
        });
    },
    sendBtn: function() {
        var a = this, e = a.data.chatList.length - 1, n = a.data.chatList[e];
        a.data.uid == n.from_id ? a.setData({
            oid: n.to_id
        }) : a.setData({
            oid: n.from_id
        }), wx.request({
            url: t.baseUrl + "/main/messageTo",
            data: {
                token: wx.getStorageSync("openid"),
                other_id: a.data.oid,
                content: a.data.sendVal
            },
            success: function(e) {
                200 == e.data.code ? (wx.showToast({
                    title: "发送成功！"
                }), a.setData({
                    chatArr: a.data.chatArr.concat(a.data.sendVal),
                    sendVal: ""
                })) : t.showMsg("发送失败！");
            }
        });
    },
    onLoad: function(t) {
        this.setData({
            otherId: t.id,
            uid: wx.getStorageSync("uid"),
            minePic: wx.getStorageSync("avatar")
        }), this.getChatSearch();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});