var a = require("../../utils/util.js");
import { postRequest } from '../../utils/httpRequest.js'

Page({
  data: {
    bpImg: '../../images/add.png',
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
    console.log(a)
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

  bpImg () {
    var t = this;
    wx.chooseImage({
      count: 1,
      success: function (e) {
        wx.uploadFile({
          url: a.baseUrl + "/main/upload",
          filePath: e.tempFilePaths[0],
          name: "file",
          success: function (a) {
            var e = JSON.parse(a.data).data;
            console.log('图片地址', e)
            t.setData({
              bpImg: e
            });
          }
        })
      }
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
            console.log('图片地址',e)
            t.setData({
              infoPic: t.data.infoPic.concat(e)
            });
            // console.log(t.data.infoPic.join('|'))
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
    if (t.data.nameVal == '') {
      a.showMsg("请填写姓名")
    } else if (t.data.proName == '') {
      a.showMsg("请填写项目名称")
    } else if (t.data.introVal == '') {
      a.showMsg("请填写项目简介")
    } else if (t.data.date == '') {
      a.showMsg("请填写项目成立时间")
    } else if (t.data.stageVal == '') {
      a.showMsg("请填写项目阶段")
    } else {
      let params = {
        token: wx.getStorageSync("openid"),
        name: t.data.nameVal,
        age: t.data.ageVal,
        native_place: t.data.locVal,
        school: t.data.scVal,
        experience: t.data.experVal,
        case: t.data.caseVal,
        info_picurl: t.data.infoPic.join('|'),
        title: t.data.proName,
        about: t.data.introVal,
        time: t.data.date,
        stage: t.data.stageVal,
        iteration: t.data.iterationVal,
        actualities: t.data.situationVal,
        future: t.data.futureVal,
        project_picurl: t.data.proPic.join('|'),
        project_bp: t.data.bpImg
      }
      console.log(params)
      postRequest('/main/founderAuth', params).then(res => {
        a.showMsg('提交成功')
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      })
    }
  },
  onLoad: function(a) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});