var t = require("../../utils/util.js");

Page({
  data: {
    projectDetail: {},
    proPiclist: [],
    srclocal: '',
    showPics: false
  },

  sBpic(e) {
    let t = this
    console.log(e.currentTarget.dataset.src)
    let src = e.currentTarget.dataset.src
    t.setData({
      srclocal: src,
      showPics: true
    })
  },

  picMask() {
    let t = this
    t.setData({
      showPics: false
    })
  },
  issueBtn: function() {
    wx.navigateTo({
      url: "/pages/issue/issue"
    });
  },

  // 点击跳转修改
  rAmend () {
    let that = this
    console.log(11112222,that.data.projectDetail)
    let str = JSON.stringify(that.data.projectDetail)
    console.log(12323,str)
    wx.navigateTo({
      url: '/pages/alterproject/alterproject?obj=' + str,
    })
  },

  searchDetail: function() {
    var a = this;
    wx.request({
      url: t.baseUrl + "/main/getMyProject",
      data: {
        token: wx.getStorageSync("openid")
      },
      success: function(e) {
        console.log(e.data.data)
        if (200 == e.data.code) {
          var n = [];
          if (e.data.data.picurl != '') {
            n = e.data.data.picurl.split('|')
          }
          a.setData({
            projectDetail: e.data.data,
            proPiclist: n
          });
        } else t.showMsg("网络错误，请重试！");
      }
    });
  },
  onLoad: function(t) {
  },
  onReady: function() {},
  onShow: function() {
    this.searchDetail();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});