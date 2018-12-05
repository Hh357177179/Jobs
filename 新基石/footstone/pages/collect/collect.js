var t = require("../../utils/util.js");

Page({
    data: {
        collectArr: []
    },
    getCollect: function() {
        var e = this;
        wx.request({
            url: t.baseUrl + "/main/myLikeProject",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    for (var n = t.data.data, o = 0; o < n.length; o++) n[o].picurl = JSON.parse(n[o].picurl);
                    e.setData({
                        collectArr: n
                    }), console.log(n);
                }
            }
        });
    },
    searchDet: function(t) {
        wx.navigateTo({
            url: "/pages/onlyDetail/onlyDetail?id=" + t.currentTarget.dataset.id
        });
    },
    onLoad: function(t) {
        this.getCollect();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});