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
          console.log(t.data.data)
          for (var i = 0, len = t.data.data.length; i<len; i++) {
            t.data.data[i].picurl = t.data.data[i].picurl.split('|')
          }
          e.setData({
            collectArr: t.data.data
          })
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