// pages/corigin/corigin.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    nameVal: '',
    ageVal: '',
    loaclVal: '',
    schoolVal: '',
    areaVal: '',
    caseVal: '',
    proPic: [],
    proList: [],
    proShowPic: true,
  },

  advnameVal (e) {
    let t = this
    t.setData({
      nameVal: e.detail.value
    })
  },

  advageVal(e) {
    let t = this
    t.setData({
      ageVal: e.detail.value
    })
  },
  advloaclVal(e) {
    let t = this
    t.setData({
      loaclVal: e.detail.value
    })
  },
  advschoolVal(e) {
    let t = this
    t.setData({
      schoolVal: e.detail.value
    })
  },
  
  advareaVal(e) {
    let t = this
    t.setData({
      areaVal: e.detail.value
    })
  },

  advcaseVal(e) {
    let t = this
    t.setData({
      caseVal: e.detail.value
    })
  },
  
  getObj () {
    let t = this
    let params = {
      user_id: wx.getStorageSync('uid')
    }
    postRequest('/main/getFounder', params).then(res => {
      console.log(res)
      t.setData({
        nameVal: res.name,
        ageVal: res.age,
        loaclVal: res.native_place,
        schoolVal: res.school,
        areaVal: res.experience,
        caseVal: res.case,
        obj: res
      })
      if (res.picurl != '') {
        t.setData({
          proList: res.picurl.split('|'),
          proPic: res.picurl.split('|'),
        })
      }
      if (res.picurl.split('|').length == 6) {
        t.setData({
          proShowPic: false
        })
      }
    })
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

  // 删除图片
  deletPic(e) {
    let t = this
    let index = e.currentTarget.dataset.index
    let tArr = []
    let dArr = t.data.proList.splice(index, 1)
    tArr = t.data.proList.filter(x => x != dArr[0])
    t.setData({
      proList: tArr,
      proPic: tArr
    })
    console.log(2, t.data.proList)
    if (t.data.proList.length < 6) {
      t.setData({
        proShowPic: true
      })
    }
  },

  chanSub () {
    let t = this
    if (t.data.nameVal == '') {
      util.showMsg('姓名不能为空！')
    } else {
      let params = {
        token: wx.getStorageSync('openid'),
        name: t.data.nameVal,
        age: t.data.ageVal,
        native_place: t.data.loaclVal,
        school: t.data.schoolVal,
        experience: t.data.areaVal,
        case: t.data.caseVal,
        picurl: t.data.proPic.join('|')
      }
      console.log(params)
      postRequest('/main/updateFounder', params).then(res => {
        console.log(res)
        util.showMsg('修改成功')
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    t.getObj()
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