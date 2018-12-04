// pages/medata/medata.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexVal: '请选择性别',
    perVal: '请选择您的身份',
    perNum: 0,
    cnum: 0,
    gender: '',
    identity: '',
    nameVal: '',
    telVal: '',
    sexArr: [
      {
        sex: '男',
        sexid: 1
      },
      {
        sex: '女',
        sexid: 2
      }
    ],
    idenArr: [
      {
        iden: '我是游客',
        idenId: 1
      },
      {
        iden: '我是医生',
        idenId: 2
      },
      {
        iden: '我是讲师',
        idenId: 3
      },
      {
        iden: '我是店主',
        idenId: 4
      }
    ],
    openid: '',
    infoStatus: false,
    status: ''
  },

  // 保存
  saveBtn() {
    let that = this
    if (that.data.nameVal == '') {
      util.showMsg('姓名不能为空')
    } else if (!that.data.telVal.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('电话号码格式不正确')
    } else if (that.data.gender == '') {
      util.showMsg('性别不能为空')
    } else if (that.data.identity == '') {
      util.showMsg('身份不能为空')
    } else {
      console.log('请求')
      let params = {
        token: that.data.openid,
        realname: that.data.nameVal,
        phone: that.data.telVal,
        gender: that.data.gender,
        identity: that.data.identity
      }
      console.log(params)
      postRequest('/user/authentication', params, true).then(res => {
        console.log(res)
        app.globalData.status = 2
        app.globalData.identity = that.data.identity
        app.globalData.realname = that.data.nameVal
        app.globalData.gender = that.data.gender
        app.globalData.phone = that.data.telVal
        wx.navigateBack()
      })
    }
  },

  // 选择性别
  bindPickerChange(e) {
    let that = this
    console.log(e)
    let pickNum = e.detail.value
    that.setData({
      sexVal: that.data.sexArr[pickNum].sex,
      cnum: 1,
      gender: that.data.sexArr[pickNum].sexid
    })
  },

  // 选择身份
  pickerIden(e) {
    let that = this
    let persNum = e.detail.value
    that.setData({
      perVal: that.data.idenArr[persNum].iden,
      perNum: 1,
      identity: that.data.idenArr[persNum].idenId
    })
  },

  // 监听姓名输入
  advNameVal(e) {
    let that = this
    let nameVal = e.detail.value
    // console.log(nameVal)
    that.setData({
      nameVal: nameVal
    })
  },

  // 监听电话输入
  advTelVal(e) {
    let that = this
    let telVal = e.detail.value
    // console.log(telVal)
    that.setData({
      telVal: telVal
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(app.globalData.openid)
    let that = this
    if (app.globalData.openid == '') {
      wx.showModal({
        title: '提示',
        content: '因为您没有授权，无法获取到个人信息',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      that.setData({
        infoStatus: true
      })
    } else {
      that.setData({
        openid: app.globalData.openid,
        infoStatus: false,
        status: app.globalData.status
      })
      if (app.globalData.status != 1) {
        if (app.globalData.gender == 1) {
          that.setData({
            sexVal: '男'
          })
        } else {
          that.setData({
            sexVal: '女'
          })
        }
        if (app.globalData.identity == 1) {
          that.setData({
            perVal: '游客'
          })
        } else if (app.globalData.identity == 2) {
          that.setData({
            perVal: '医师'
          })
        } else if (app.globalData.identity == 3) {
          that.setData({
            perVal: '讲师'
          })
        } else {
          that.setData({
            perVal: '店主'
          })
        }
        that.setData({
          infoStatus: true,
          nameVal: app.globalData.realname,
          telVal: app.globalData.phone,
          perNum: 1,
          cnum: 1
        })
      }
    }
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

  }
})