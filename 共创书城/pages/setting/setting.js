// pages/setting/setting.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    campnum: '',
    sexnum: '',
    num: '',
    name: '',  // 昵称
    sex: '',  //性别
    roleArr: [
      '导师',
      '合伙人',
      '辅导员',
      '崇业员',
      '创始人',
      '校友',
      '非校友'
    ],
    roleStr: '请选择角色',
    time: '请选择出生年月日',
    sexStr: '请选择性别',
    sexArr: ["男","女","保密"],
    campusStr: '请选择所属校区',
    campusArr: [
      "沐新上海校区",
      "沐新北京校区",
      "沐新杭州校区",
      "沐新西安校区",
      "沐新沈阳校区",
      "沐新榆林校区",
      "沐新延安校区",
      "沐新哈尔滨校区",
      "沐新太仓校区",
      "沐新马来西亚校区",
      "无校区"
    ],
    local: '',  // 地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // console.log(app.globalData.openid)
    // 查看我的资料
    let params = {
      token: app.globalData.openid
    }
    postRequest('/user/info', params, true).then(res => {
      // console.log(res)
      if (res.birthday == null || res.birthday == '') {
        that.setData({
          time: '请选择出生年月日',
          sexStr: '请选择性别',
          local: '',
          campusStr: '请选择所属校区',
          roleStr: '请选择角色'
        })
      } else {
        that.setData({
          time: res.birthday,
          sexStr: res.gender,
          local: res.address,
          campusStr: res.school,
          roleStr: res.role
        })
      }
      that.setData({
        avatar: res.avatar,
        name: res.nickname
      })
    })
  },

  // 保存用户信息
  subSave () {
    let that = this
    if (that.data.time == "请选择出生年月日") {
      util.showMsg('请选择出生年月日')
    } else if (that.data.sexStr == "请选择性别") {
      util.showMsg('请选择性别')
    } else if (that.data.local == '') {
      util.showMsg('请输入所在地')
    } else if (that.data.campusStr == "请选择所属校区") {
      util.showMsg('请选择所属校区')
    } else if (that.data.roleStr == "请选择角色") {
      util.showMsg('请选择角色')
    } else {
      let params = {
        token: app.globalData.openid,
        nickname: that.data.name,
        avatar: that.data.avatar,
        gender: that.data.sexStr,
        birthday: that.data.time,
        address: that.data.local,
        school: that.data.campusStr,
        role: that.data.roleStr
      }
      // console.log(params)
      postRequest('/user/infoUpdate', params, true).then(res => {
        // console.log(res)
        util.showMsg('修改成功！')
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      })
    }
  },

  // 上传图片
  uploadPic () {
    let that = this
    wx.chooseImage({
      count: 1,
      success: res => {
        wx.showLoading({
          title: '正在上传'
        })
        // console.log(res)
        wx.uploadFile({
          url: `${util.baseUrl}/user/upload`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: res => {
            // console.log(res)
            if (JSON.parse(res.data).code == 200) {
              wx.hideLoading()
              // console.log(JSON.parse(res.data).data)
              that.setData({
                avatar: JSON.parse(res.data).data
              })
            }
          }
        })
      },
    })
  },

  // 选择所属校区
  cCampus (e) {
    let that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let campnum = e.detail.value
    that.setData({
      campusStr: that.data.campusArr[campnum]
    })
  },

  // 输入所在地
  advLocal (e) {
    let that = this
    that.setData({
      local: e.detail.value
    })
  },

  // 选择生日
  bindTimeChange (e) {
    // console.log(e)
    let that = this
    that.setData({
      time: e.detail.value
    })
  },

  // 选择角色
  cRole(e) {
    let that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let num = e.detail.value
    that.setData({
      roleStr: that.data.roleArr[num]
    })
  },

  // 选择性别
  cSex (e) {
    let that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let sexnum = e.detail.value
    that.setData({
      sexStr: that.data.sexArr[sexnum]
    })
  },

  // 输入姓名
  advName (e) {
    let that = this
    that.setData({
      name: e.detail.value
    })
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
})