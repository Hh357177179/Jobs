// pages/alterproject/alterproject.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bpImg: '../../images/add.png',
    dateText: "项目成立时间",
    date: '',
    proName: '',
    introVal: '',
    stageVal: '',
    iterationVal: '',
    situationVal: '',
    futureVal: '',
    proShowPic: true,
    proPic: [],
    proList: []
  },
  proImage: function () {
    var t = this;
    wx.chooseImage({
      count: 1,
      success: function (e) {
        wx.uploadFile({
          url: util.baseUrl + "/main/upload",
          filePath: e.tempFilePaths[0],
          name: "file",
          success: function (a) {
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
  advfutureVal: function (a) {
    this.setData({
      futureVal: a.detail.value
    });
  },

  advsituationVal: function (a) {
    this.setData({
      situationVal: a.detail.value
    });
  },

  bpImg() {
    var t = this;
    wx.chooseImage({
      count: 1,
      success: function (e) {
        wx.uploadFile({
          url: util.baseUrl + "/main/upload",
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
  adviterationVal: function (a) {
    this.setData({
      iterationVal: a.detail.value
    });
  },
  advstageVal: function (a) {
    this.setData({
      stageVal: a.detail.value
    });
  },
  advintroVal: function (a) {
    this.setData({
      introVal: a.detail.value
    });
  },

  bindDateChange: function (a) {
    console.log(a)
    this.setData({
      date: a.detail.value,
      dateText: a.detail.value
    });
  },
  advproName: function (a) {
    this.setData({
      proName: a.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    let obj = JSON.parse(options.obj)
    console.log(obj)
    if (obj.project_bp == '') {
      t.setData({
        bpImg: '../../images/add.png',
      })
    } else {
      t.setData({
        bpImg: obj.project_bp
      })
    }
    t.setData({
      proName: obj.title,
      introVal: obj.about,
      date: obj.time,
      dateText: obj.time,
      stageVal: obj.stage,
      iterationVal: obj.iteration,
      situationVal: obj.actualities,
      futureVal: obj.future,
      proList: obj.picurl.split('|'),
      proPic: obj.picurl.split('|')
    })
    if (t.data.proList.length == 6) {
      t.setData({
        proShowPic: false
      })
    }
  },

  subChange () {
    let that = this
    if (that.data.proName == '') {
      util.showMsg('请填写项目名称')
    } else if (that.data.introVal == '') {
      util.showMsg('请填写项目简介')
    } else if (that.data.date == '') {
      util.showMsg('请填写项目成立时间')
    } else if (that.data.stageVal == '') {
      util.showMsg("请填写项目阶段")
    } else {
      let params = {
        token: wx.getStorageSync('openid'),
        title: that.data.proName,
        about: that.data.introVal,
        time: that.data.date,
        stage: that.data.stageVal,
        iteration: that.data.iterationVal,
        project_bp: that.data.bpImg,
        actualities: that.data.situationVal,
        future: that.data.futureVal,
        picurl: that.data.proPic.join('|')
      }
      console.log(11122223333, params)
      postRequest('/main/updateMyProject', params).then(res => {
        console.log(res)
        util.showMsg('修改成功')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/me/me',
          })
        }, 2000)
      })
    }
  },

  // 删除图片
  deletPic (e) {
    let t = this
    let index = e.currentTarget.dataset.index
    let tArr = []
    let dArr = t.data.proList.splice(index, 1)
    tArr = t.data.proList.filter(x => x != dArr[0])
    t.setData({
      proList: tArr,
      proPic: tArr
    })
    console.log(2,t.data.proList)
    if (t.data.proList.length < 6) {
      t.setData({
        proShowPic: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})