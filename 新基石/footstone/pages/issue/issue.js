var a = require("../../utils/util.js");

Page({
  data: {
    showUpload: !0,
    localImg: [],
    addPic: [],
    issueVal: ""
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
          success: function(e) {
            if (200 == e.code) {
              var o = JSON.parse(e.data).data;
              t.setData({
                addPic: t.data.addPic.concat(o)
              });
            } else a.showMsg(e.msg);
          }
        }), t.setData({
          localImg: t.data.localImg.concat(e.tempFilePaths)
        }), 9 == t.data.localImg.length && t.setData({
          showUpload: !1
        });
      }
    });
  },
  advissyeVal: function(a) {
    this.setData({
      issueVal: a.detail.value
    });
  },
  publishBtn: function() {
    var t = this;
    "" == t.data.issueVal && 0 == t.data.addPic.length ? a.showMsg("请完善信息！") : wx.request({
      url: a.baseUrl + "/main/publish",
      data: {
        token: wx.getStorageSync("openid"),
        content: t.data.issueVal,
        picurl: t.data.addPic
      },
      success: function(a) {
        console.log(a), 200 == a.data.code && wx.reLaunch({
          url: "/pages/index/index"
        });
      }
    });
  },
  onLoad: function(a) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});