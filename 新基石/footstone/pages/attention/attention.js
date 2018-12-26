var t = require("../../utils/util.js");

Page({
  data: {
    attentionArr: []
  },
  getAttention: function() {
    var n = this;
    wx.request({
      url: t.baseUrl + "/main/myInvestProject",
      data: {
        token: wx.getStorageSync("openid")
      },
      success: function(t) {
        if (200 == t.data.code) {
          for (var e = t.data.data, o = 0; o < e.length; o++) {
            e[o].picurl = e[o].picurl.split('|')
          }
          n.setData({
            attentionArr: e
          }), console.log(e);
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
    this.getAttention();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});