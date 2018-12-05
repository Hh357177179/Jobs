var t = require("../../utils/util.js");

Page({
    data: {
        showCode: !1,
        avatar: "",
        identity: "",
        nickName: "",
        openid: "",
        status: "",
        realname: "",
        phone: "",
        score: "",
        codeImg: "",
        parentNum: "",
        bothName: {},
        codeUrl: "",
        attentionN: "",
        collectN: ""
    },
    getAttentionN: function() {
        var e = this;
        wx.request({
            url: t.baseUrl + "/main/myInvestCount",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                200 == t.data.code && e.setData({
                    attentionN: t.data.data.count
                });
            }
        });
    },
    getCollectN: function() {
        var e = this;
        wx.request({
            url: t.baseUrl + "/main/myLikeProject",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                200 == t.data.code && e.setData({
                    collectN: t.data.data.length
                });
            }
        });
    },
    attentionR: function() {
        wx.navigateTo({
            url: "/pages/attention/attention"
        });
    },
    collectR: function() {
        wx.navigateTo({
            url: "/pages/collect/collect"
        });
    },
    phoneVerify: function() {
        wx.navigateTo({
            url: "/pages/phoneVerify/phoneVerify"
        });
    },
    integral: function() {
        wx.navigateTo({
            url: "/pages/given/given"
        });
    },
    partnerBtn: function() {
        wx.navigateTo({
            url: "/pages/partnership/partnership"
        });
    },
    clientBtn: function() {
        wx.navigateTo({
            url: "/pages/client/client"
        });
    },
    mpClick: function() {
        wx.request({
            url: t.baseUrl + "/main/getMyProject",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(e) {
                1001 == e.data.code ? "您的资料还未通过审核！" == e.data.msg ? t.showMsg("您的资料还未通过审核！请耐心等待！") : wx.navigateTo({
                    url: "/pages/originator/originator"
                }) : (wx.setStorageSync("status", 2), wx.navigateTo({
                    url: "/pages/prodetail/prodetail"
                }));
            }
        });
    },
    getParentList: function() {
        var e = this;
        wx.request({
            url: t.baseUrl + "/main/myPartProject",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                var a = t.data.data;
                200 == t.data.code && e.setData({
                    parentNum: a.length
                });
            }
        });
    },
    getScore: function() {
        var e = this;
        wx.login({
            success: function(a) {
                a.code && wx.request({
                    url: t.baseUrl + "/user/isLogin",
                    data: {
                        code: a.code
                    },
                    success: function(t) {
                        console.log(t), 200 == t.data.code && (wx.setStorageSync("score", t.data.data.score), 
                        e.setData({
                            score: t.data.data.score,
                            bothName: t.data.data
                        }));
                    }
                });
            }
        });
    },
    alertCode: function() {
        var t = this;
        t.setData({
            showCode: !0
        }), t.setData({
            codeUrl: "https://ssl.zhaodaka.net/xinjishi/api/main/qrcode?token=" + wx.getStorageSync("openid")
        });
    },
    closeModal: function() {
        this.setData({
            showCode: !1
        });
    },
    onLoad: function(t) {
        var e = this;
        e.getParentList(), e.setData({
            avatar: wx.getStorageSync("avatar"),
            nickName: wx.getStorageSync("nickname"),
            status: wx.getStorageSync("status"),
            realname: wx.getStorageSync("realname"),
            phone: wx.getStorageSync("phone"),
            score: wx.getStorageSync("score")
        });
        var a = wx.getStorageSync("status");
        1 == a ? e.setData({
            identity: "会员"
        }) : 2 == a ? e.setData({
            identity: "项目创始人"
        }) : 3 == a ? e.setData({
            identity: "项目合伙人"
        }) : 4 == a && e.setData({
            identity: "项目天使"
        }), e.getAttentionN();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.getScore(), t.setData({
            realname: wx.getStorageSync("realname"),
            phone: wx.getStorageSync("phone"),
            status: wx.getStorageSync("status")
        });
        var e = wx.getStorageSync("status");
        1 == e ? t.setData({
            identity: "会员"
        }) : 2 == e ? t.setData({
            identity: "项目创始人"
        }) : 3 == e ? t.setData({
            identity: "项目合伙人"
        }) : 4 == e && t.setData({
            identity: "项目天使"
        }), t.getCollectN();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});