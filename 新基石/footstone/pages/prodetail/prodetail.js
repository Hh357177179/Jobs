var t = require("../../utils/util.js");

Page({
    data: {
        projectDetail: {},
        proPiclist: []
    },
    issueBtn: function() {
        wx.navigateTo({
            url: "/pages/issue/issue"
        });
    },
    searchDetail: function() {
        var a = this;
        wx.request({
            url: t.baseUrl + "/main/getMyProject",
            data: {
                token: wx.getStorageSync("openid")
            },
            success: function(e) {
                if (200 == e.data.code) {
                    var n = [];
                    "" != e.data.data.picurl && (n = JSON.parse(e.data.data.picurl)), a.setData({
                        projectDetail: e.data.data,
                        proPiclist: n
                    });
                } else t.showMsg("网络错误，请重试！");
            }
        });
    },
    onLoad: function(t) {
        this.searchDetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});