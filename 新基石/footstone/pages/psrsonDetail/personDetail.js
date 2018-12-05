var n = require("../../utils/util.js");

Page({
    data: {
        originatorPer: {}
    },
    onLoad: function(o) {
        var t = this;
        wx.request({
            url: n.baseUrl + "/main/getFounder",
            data: {
                user_id: o.id
            },
            success: function(n) {
                if (200 == n.data.code) {
                    var o = n.data.data;
                    console.log(o), t.setData({
                        originatorPer: o
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});