var t = require("../../utils/util.js");

Page({
    data: {
        parentList: []
    },
    searchDet: function(t) {
        wx.navigateTo({
            url: "/pages/onlyDetail/onlyDetail?id=" + t.currentTarget.dataset.id
        });
    },
    getParentList: function() {
        var n = this;
        wx.request({
            url: t.baseUrl + "/main/myPartProject",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                var a = t.data.data;
                if (console.log(a), 200 == t.data.code) {
                    for (var e = 0; e < a.length; e++) a[e].picurl = JSON.parse(a[e].picurl);
                    n.setData({
                        parentList: a
                    });
                }
            }
        });
    },
    onLoad: function(t) {
        this.getParentList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});