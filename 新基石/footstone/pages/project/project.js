var t = require("../../utils/util.js");

Page({
    data: {
        status: "",
        page: 1,
        pagesize: 10,
        keyword: "",
        proList: [],
        counts: "",
        project_id: ""
    },
    searchDet: function(t) {
        wx.navigateTo({
            url: "/pages/onlyDetail/onlyDetail?id=" + t.currentTarget.dataset.id
        });
    },
    searchBtn: function() {
        this.setData({
            proList: []
        }), this.getProList();
    },
    getCollect: function() {
        var a = this;
        wx.request({
            url: t.baseUrl + "/main/collection",
            data: {
                token: wx.getStorageSync("openid"),
                project_id: a.data.project_id
            },
            success: function(a) {
                200 == a.data.code && (1 == a.data.data.status ? wx.showToast({
                    title: "收藏成功",
                    icon: "success",
                    duration: 2e3
                }) : t.showMsg("取消收藏"));
            }
        });
    },
    collectIcon: function(t) {
        var a = this;
        a.setData({
            project_id: t.currentTarget.dataset.id
        });
        var e = a.data.proList.find(function(t) {
            return t.id == a.data.project_id;
        });
        a.getCollect(), e.is_collection = !e.is_collection;
        var i = a.data.proList;
        i.splice(t.currentTarget.dataset.index, 1, e), a.setData({
            proList: i
        });
    },
    ccollectIcon: function(t) {
        var a = this;
        a.setData({
            project_id: t.currentTarget.dataset.id
        });
        var e = a.data.proList.find(function(t) {
            return t.id == a.data.project_id;
        });
        a.getCollect(), e.is_collection = !e.is_collection;
        var i = a.data.proList;
        i.splice(t.currentTarget.dataset.index, 1, e), a.setData({
            proList: i
        });
    },
    searchText: function(t) {
        this.setData({
            keyword: t.detail.value
        });
    },
    getProList: function() {
        var a = this;
        wx.request({
            url: t.baseUrl + "/main/projectList",
            data: {
                token: wx.getStorageSync("openid"),
                page: a.data.page,
                pagesize: a.data.pagesize,
                keyword: a.data.keyword
            },
            method: "POST",
            success: function(t) {
                var e = t.data.data;
                if (200 == t.data.code) {
                    for (var i = 0; i < e.list.length; i++) "" != e.list[i].picurl && (e.list[i].picurl = JSON.parse(e.list[i].picurl));
                    console.log(e), a.setData({
                        proList: a.data.proList.concat(e.list),
                        counts: e.count
                    });
                }
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            status: wx.getStorageSync("status")
        }), a.getProList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();
        var a = this;
        a.setData({
            page: 1,
            pagesize: 10
        }), wx.request({
            url: t.baseUrl + "/main/projectList",
            data: {
                token: wx.getStorageSync("openid"),
                page: a.data.page,
                pagesize: a.data.pagesize,
                keyword: a.data.keyword
            },
            success: function(t) {
                var e = t.data.data;
                if (200 == t.data.code) {
                    for (var i = 0; i < e.list.length; i++) 0 != e.list[i].picurl && (e.list[i].picurl = JSON.parse(e.list[i].picurl));
                    wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), a.setData({
                        proList: e.list,
                        counts: e.count
                    });
                }
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        t.data.page * t.data.pagesize < t.data.counts && (t.setData({
            page: t.data.page += 1
        }), t.getProList());
    }
});