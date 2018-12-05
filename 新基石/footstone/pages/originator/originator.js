var a = require("../../utils/util.js");

Page({
    data: {
        date: "",
        infoArr: [],
        showUpload: !0,
        dateText: "项目成立时间",
        nameVal: "",
        ageVal: "",
        locVal: "",
        scVal: "",
        experVal: "",
        caseVal: "",
        infoPic: [],
        stageVal: "",
        iterationVal: "",
        introVal: "",
        holdVal: "",
        situationVal: "",
        futureVal: "",
        proPic: [],
        proList: [],
        proName: "",
        proShowPic: !0
    },
    bindDateChange: function(a) {
        this.setData({
            date: a.detail.value,
            dateText: a.detail.value
        });
    },
    advnameVal: function(a) {
        this.setData({
            nameVal: a.detail.value
        });
    },
    advageVal: function(a) {
        this.setData({
            ageVal: a.detail.value
        });
    },
    advlocVal: function(a) {
        this.setData({
            locVal: a.detail.value
        });
    },
    advscVal: function(a) {
        this.setData({
            scVal: a.detail.value
        });
    },
    advexperVal: function(a) {
        this.setData({
            experVal: a.detail.value
        });
    },
    advcaseVal: function(a) {
        this.setData({
            caseVal: a.detail.value
        });
    },
    chooseImg: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            success: function(e) {
                wx.uploadFile({
                    url: a.baseUrl + "/main/upload",
                    filePath: e.tempFilePaths[0],
                    name: "file",
                    success: function(a) {
                        var e = JSON.parse(a.data).data;
                        t.setData({
                            infoPic: t.data.infoPic.concat(e)
                        });
                    }
                }), t.setData({
                    infoArr: t.data.infoArr.concat(e.tempFilePaths)
                }), 6 == t.data.infoArr.length && t.setData({
                    showUpload: !1
                });
            }
        });
    },
    advproName: function(a) {
        this.setData({
            proName: a.detail.value
        });
    },
    advintroVal: function(a) {
        this.setData({
            introVal: a.detail.value
        });
    },
    advstageVal: function(a) {
        this.setData({
            stageVal: a.detail.value
        });
    },
    adviterationVal: function(a) {
        this.setData({
            iterationVal: a.detail.value
        });
    },
    advholdVal: function(a) {
        this.setData({
            holdVal: a.detail.value
        });
    },
    advsituationVal: function(a) {
        this.setData({
            situationVal: a.detail.value
        });
    },
    advfutureVal: function(a) {
        this.setData({
            futureVal: a.detail.value
        });
    },
    proImage: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            success: function(e) {
                wx.uploadFile({
                    url: a.baseUrl + "/main/upload",
                    filePath: e.tempFilePaths[0],
                    name: "file",
                    success: function(a) {
                        var e = JSON.parse(a.data).data;
                        t.setData({
                            proPic: t.data.proPic.concat(e)
                        });
                    }
                }), t.setData({
                    proList: t.data.proList.concat(e.tempFilePaths)
                }), 6 == t.data.proList.length && t.setData({
                    proShowPic: !1
                });
            }
        });
    },
    submitOrigin: function() {
        var t = this;
        console.log(t.data.infoPic.length), "" != t.data.proName && "" != t.data.date && "" != t.data.nameVal && 0 != t.data.infoPic.length && 0 != t.data.proPic.length ? wx.request({
            url: a.baseUrl + "/main/founderAuth",
            method: "POST",
            data: {
                token: wx.getStorageSync("openid"),
                name: t.data.nameVal,
                age: t.data.ageVal,
                native_place: t.data.locVal,
                school: t.data.scVal,
                experience: t.data.experVal,
                case: t.data.caseVal,
                info_picurl: JSON.stringify(t.data.infoPic),
                title: t.data.proName,
                about: t.data.introVal,
                time: t.data.date,
                stage: t.data.stageVal,
                iteration: t.data.iterationVal,
                activity: t.data.holdVal,
                actualities: t.data.situationVal,
                future: t.data.futureVal,
                project_picurl: JSON.stringify(t.data.proPic)
            },
            success: function(t) {
                200 == t.data.code ? (a.showMsg(t.data.data), wx.navigateBack()) : a.showMsg(t.data);
            }
        }) : a.showMsg("请完善信息！");
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});