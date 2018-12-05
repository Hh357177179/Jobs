var t = require("../../utils/util.js");

Page({
    data: {
        id: "",
        proDetail: {},
        proPiclist: []
    },
    searchPerson: function(t) {
        wx.navigateTo({
            url: "/pages/psrsonDetail/personDetail?id=" + t.currentTarget.dataset.id
        });
    },
    chartPerson: function(a) {
        if (4 == wx.getStorageSync("status") || 1 == wx.getStorageSync("status")) if ("" == wx.getStorageSync("phone")) t.showMsg("请完成手机认证！"); else {
            var e = {
                title: this.data.proDetail.title,
                partner_id: this.data.proDetail.partner_id,
                partner_realname: this.data.proDetail.partner_realname,
                partner_nickname: this.data.proDetail.partner_nickname,
                partner_avatar: this.data.proDetail.partner_avatar
            };
            wx.navigateTo({
                url: "/pages/establish/establish?chartObj=" + JSON.stringify(e)
            });
        } else t.showMsg("只有手机注册才可以与合伙人建立对话");
    },
    searchList: function() {
        var a = this;
        wx.request({
            url: t.baseUrl + "/main/getProject",
            data: {
                project_id: a.data.id
            },
            success: function(t) {
                if (200 == t.data.code) {
                    console.log(t.data.data.picurl);
                    var e = [];
                    "" != t.data.data.picurl && (e = JSON.parse(t.data.data.picurl)), a.setData({
                        proDetail: t.data.data,
                        proPiclist: e
                    });
                }
            }
        });
    },
    onLoad: function(t) {
        console.log(t.id);
        var a = this;
        a.setData({
            id: t.id
        }), a.searchList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            title: "项目详情",
            path: "pages/onlyDetail/onlyDetail?id=" + this.data.id,
            success: function(t) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "转发失败",
                    icon: "none",
                    duration: 1e3
                });
            }
        };
    }
});