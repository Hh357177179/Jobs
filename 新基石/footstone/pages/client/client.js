var t = require("../../utils/util.js");
import { postRequest } from '../../utils/httpRequest.js'
Page({
  data: {
    clientList: [],
    listNum: "",
    bzText: '',
    maskShow: false,
    names: '',
    userPic: '',
    bzVal: '',
    ids: ''
  },

  // 解除绑定关系
  relieve (e) {
    console.log(e)
    let that = this
    let params = {
      token: wx.getStorageSync('openid'),
      user_id: e.currentTarget.dataset.id
    }
    postRequest('/main/myCustomerDelete', params, true).then(res => {
      console.log(res)
      t.showMsg('解除成功！')
      setTimeout(() => {
        that.getClientList()
      }, 2000)
    })
  },

  advbzinput (e) {
    let t = this
    t.setData({
      bzVal: e.detail.value
    })
  },

  closeMask () {
    let t = this
    t.setData({
      maskShow: false
    })
  },

  bzText (e) {
    console.log(e)
    let t = this
    t.setData({
      maskShow: true,
      userPic: e.currentTarget.dataset.apic,
      names: e.currentTarget.dataset.name,
      ids: e.currentTarget.dataset.id
    })
  },

  subSure () {
    let that = this
    if (that.data.bzVal == '') {
      t.showMsg('请填写备注')
    } else {
      let params = {
        token: wx.getStorageSync('openid'),
        customer_id: that.data.ids,
        remark: that.data.bzVal
      }
      console.log(params)
      postRequest('/main/customerRemark', params).then(res => {
        console.log(res)
        that.setData({
          bzVal: '',
          maskShow: false
        })
        that.getClientList()
      })
    }
  },

  getClientList: function() {
    var n = this,
      i = this;
    wx.request({
      url: t.baseUrl + "/main/myCustomer",
      data: {
        token: wx.getStorageSync("openid")
      },
      success: function(t) {
        if (200 == t.data.code) {
          var e = t.data.data;
          console.log(e)
          i.setData({
            clientList: e,
            listNum: e.length
          }),
          wx.setNavigationBarTitle({
            title: "项目天使（" + n.data.listNum + "）"
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