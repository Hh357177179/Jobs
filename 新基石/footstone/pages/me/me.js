var t = require("../../utils/util.js");
import { postRequest } from '../../utils/httpRequest.js'
Page({
  data: {
    xxShow: false,
    showCode: !1,
    avatar: "",
    identity: "",
    nickName: "",
    openid: "",
    status: "",
    realname: "",
    phone: "",
    score: "",
    codeImg: "",
    parentNum: "",
    bothName: {},
    codeUrl: "",
    attentionN: "",
    collectN: "",
    is_chuangshiren: '',
    is_hehuoren: '',
    is_tianshi: '',
    medalArr: [],
    medalnum: '',
    talkNum: '',
    myCustomernum: ''
  },

  chooseIden () {
    wx.navigateTo({
      url: '/pages/corigin/corigin',
    })
  },

  // 我的留言列表数量
  getTalknum () {
    let t = this
    let params = {
      token: wx.getStorageSync('openid')
    }
    postRequest('/main/messageList', params).then(res => {
      // console.log(res)
      t.setData({
        talkNum: res.length
      })
    })
  },

  getmyCustomernum() {
    let t = this
    let params = {
      token: wx.getStorageSync('openid')
    }
    postRequest('/main/myCustomer', params).then(res => {
      // console.log(res)
      t.setData({
        myCustomernum: res.length
      })
    })
  },

  searchXX () {
    let t = this
    t.setData({
      xxShow: true
    })
  },

  closeMaskxx () {
    let t = this
    t.setData({
      xxShow: false
    })
  },

  // 查看勋章
  getmedal () {
    let t = this
    let params = {
      token: wx.getStorageSync('openid')
    }
    postRequest('/user/getMedal', params).then(res => {
      console.log(res)
      t.setData({
        medalArr: res,
        medalnum: res.length
      })
    })
  },

  // 修改个人信息
  chooseInfo() {
    if (wx.getStorageSync('phone') != '') {
      wx.navigateTo({
        url: '/pages/choosePic/choosePic',
      })
    } else {
      t.showMsg('请完成手机认证')
    }
  },

  // 修改手机
  changeTel() {
    wx.navigateTo({
      url: '/pages/changeTel/changeTel',
    })
  },


  getAttentionN: function() {
    var e = this;
    wx.request({
      url: t.baseUrl + "/main/myInvestCount",
      data: {
        token: wx.getStorageSync("openid")
      },
      success: function(t) {
        200 == t.data.code && e.setData({
          attentionN: t.data.data.count
        });
      }
    });
  },
  getCollectN: function() {
    var e = this;
    wx.request({
      url: t.baseUrl + "/main/myLikeProject",
      data: {
        token: wx.getStorageSync("openid")
      },
      success: function(t) {
        200 == t.data.code && e.setData({
          collectN: t.data.data.length
        });
      }
    });
  },

  rMessage () {
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },
  attentionR: function() {
    wx.navigateTo({
      url: "/pages/attention/attention"
    });
  },
  collectR: function() {
    wx.navigateTo({
      url: "/pages/collect/collect"
    });
  },
  phoneVerify: function() {
    wx.navigateTo({
      url: "/pages/phoneVerify/phoneVerify"
    });
  },
  integral: function() {
    wx.navigateTo({
      url: "/pages/given/given"
    });
  },
  partnerBtn: function() {
    wx.navigateTo({
      url: "/pages/partnership/partnership"
    });
  },
  clientBtn: function() {
    wx.navigateTo({
      url: "/pages/client/client"
    });
  },
  mpClick: function() {
    // wx.request({
    //   url: t.baseUrl + "/main/getMyProject",
    //   data: {
    //     token: wx.getStorageSync("openid")
    //   },
    //   success: function(e) {
    //     1001 == e.data.code ? "您的资料还未通过审核！" == e.data.msg ? t.showMsg("您的资料还未通过审核！请耐心等待！") : wx.navigateTo({
    //       url: "/pages/originator/originator"
    //     }) : (wx.setStorageSync("status", 2), wx.navigateTo({
    //       url: "/pages/prodetail/prodetail"
    //     }));
    //   }
    // });
    wx.login({
      success: resCode => {
        console.log(resCode)
        wx.request({
          url: t.baseUrl + '/user/isLogin',
          data: {
            code: resCode.code
          },
          method: 'POST',
          success: res => {
            // console.log(res)
            if (res.data.code == 200) {
              if (res.data.data.is_chuangshiren == 0) {
                wx.request({
                  url: t.baseUrl + "/main/getMyProject",
                  data: {
                    token: wx.getStorageSync("openid")
                  },
                  method: 'POST',
                  success: resProject => {
                    console.log(resProject)
                    if (resProject.data.code == 1002) {
                      t.showMsg('您的资料还未通过审核！')
                    } else {
                      wx.navigateTo({
                        url: '/pages/originator/originator',
                      })
                    }
                  }
                })
              } else {
                wx.navigateTo({
                  url: "/pages/prodetail/prodetail",
                })
              }
            }
          }
        })
      }
    })


    // wx.request({
    //   url: t.baseUrl + "/main/getMyProject",
    // })
  },
  getParentList: function() {
    var e = this;
    wx.request({
      url: t.baseUrl + "/main/myPartProject",
      data: {
        token: wx.getStorageSync("openid")
      },
      success: function(t) {
        var a = t.data.data;
        200 == t.data.code && e.setData({
          parentNum: a.length
        });
      }
    });
  },
  getScore: function() {
    var e = this;
    wx.login({
      success: function(a) {
        a.code && wx.request({
          url: t.baseUrl + "/user/isLogin",
          data: {
            code: a.code
          },
          success: function(t) {
             200 == t.data.code && (wx.setStorageSync("score", t.data.data.score),
              e.setData({
                score: t.data.data.score,
                bothName: t.data.data
              }));
          }
        });
      }
    });
  },
  alertCode: function() {
    var t = this;
    t.setData({
      showCode: !0
    }), t.setData({
      codeUrl: "https://ssl.zhaodaka.net/xinjishi/api/main/qrcode?token=" + wx.getStorageSync("openid")
    });
  },
  closeModal: function() {
    this.setData({
      showCode: !1
    });
  },
  onLoad: function(t) {
    var e = this;
      e.setData({
        avatar: wx.getStorageSync("avatar"),
        nickName: wx.getStorageSync("nickname"),
        status: wx.getStorageSync("status"),
        realname: wx.getStorageSync("realname"),
        phone: wx.getStorageSync("phone"),
        score: wx.getStorageSync("score"),
        is_chuangshiren: wx.getStorageSync('is_chuangshiren'),
        is_hehuoren: wx.getStorageSync('is_hehuoren'),
        is_tianshi: wx.getStorageSync('is_tianshi')
      });
    // if (wx.getStorageSync('is_chuangshiren') == 1) {
    //   e.setData({
    //     identity: '项目创始人'
    //   })
    // } else if (wx.getStorageSync('is_hehuoren') == 1) {
    //   e.setData({
    //     identity: '新基石项目合伙人'
    //   })
    // } else if (wx.getStorageSync('is_tianshi') == 1) {
    //   e.setData({
    //     identity: '项目天使'
    //   })
    // }
    // var a = wx.getStorageSync("status");
    // 1 == a ? e.setData({
    //   identity: "游客"
    // }) : 2 == a ? e.setData({
    //   identity: "项目创始人"
    // }) : 3 == a ? e.setData({
    //   identity: "新基石项目合伙人"
    // }) : 4 == a ? e.setData({
    //     identity: "项目天使"
    // }) : 5 == a && e.setData({
    //   identity: "会员"
    // }),
  },
  onReady: function() {},
  onShow: function() {
    var t = this;
    t.getScore(), t.setData({
      realname: wx.getStorageSync("realname"),
      phone: wx.getStorageSync("phone"),
      status: wx.getStorageSync("status"),
      avatar: wx.getStorageSync("avatar"),
      nickName: wx.getStorageSync("nickname"),
      score: wx.getStorageSync("score"),
      is_chuangshiren: wx.getStorageSync('is_chuangshiren'),
      is_hehuoren: wx.getStorageSync('is_hehuoren'),
      is_tianshi: wx.getStorageSync('is_tianshi')
    });
    t.getCollectN();
    t.getmedal()
    t.getAttentionN();
    t.getParentList()
    t.getTalknum(),
    t.getmyCustomernum()
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});