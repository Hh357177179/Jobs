var t = require("../../utils/util.js");

Page({
    data: {
        clientList: [],
        listNum: ""
    },
    getClientList: function() {
        var n = this, i = this;
        wx.request({
            url: t.baseUrl + "/main/myCustomer",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    i.setData({
                        clientList: e,
                        listNum: e.length
                    }), wx.setNavigationBarTitle({
                        title: "我的客户（" + n.data.listNum + "）"
                    });
                }
            }
        });
    },
    onLoad: function(t) {
        this.getClientList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});