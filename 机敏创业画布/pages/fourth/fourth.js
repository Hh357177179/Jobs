// pages/fourth/fourth.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whouser: '', // 用户是谁
    condition: '', // 情况
    hreason: '', //yy
    issue: '',  // 问题
    result: '',  //后果
    cause: '',  //原因
    nocause: '', // 没解决的原因
    territory: '', // 领域
    story: '',  //故事
    freplace: '',  //替代品1
    sreplace: '',  // 替代品2
    treplace: '',  // 替代品3
    freason: '', //替代品1 原因
    sreason: '', //替代品2 原因
    treason: '', //替代品3 原因
    appendTime: '', // 在什么时间内
    useridentity: '', // 用户身份
    formerlyArr: []
  },
  // 用户身份
  advUseridentity(e) {
    let that = this
    that.setData({
      useridentity: e.detail.value
    })
    // console.log(that.data.useridentity)
  },
  advappendT (e) {
    let that = this
    that.setData({
      appendTime: e.detail.value
    })
  },

  // 替代品
  advFreplace(e) {
    let that = this
    that.setData({
      freplace: e.detail.value
    })
  },
  advSreplace(e) {
    let that = this
    that.setData({
      sreplace: e.detail.value
    })
  },
  advTreplace(e) {
    let that = this
    that.setData({
      treplace: e.detail.value
    })
  },
  // 替代品原因
  advFreason(e) {
    let that = this
    that.setData({
      freason: e.detail.value
    })
  },
  advSreason(e) {
    let that = this
    that.setData({
      sreason: e.detail.value
    })
  },
  advTreason(e) {
    let that = this
    that.setData({
      treason: e.detail.value
    })
  },


  // 用户是谁
  advWhouser(e) {
    let that = this
    that.setData({
      whouser: e.detail.value
    })
  },

  // 情况
  advCondition(e) {
    let that = this
    that.setData({
      condition: e.detail.value
    })
  },
  // 问题
  advIssue(e) {
    let that = this
    that.setData({
      issue: e.detail.value
    })
  },

  // 后果
  advResult(e) {
    let that = this
    that.setData({
      result: e.detail.value
    })
  },

  // 原因
  advCause(e) {
    let that = this
    that.setData({
      cause: e.detail.value
    })
  },
  // 没解决的原因
  advHreason(e) {
    let that = this
    that.setData({
      hreason: e.detail.value
    })
  },
  advNocause(e) {
    let that = this
    that.setData({
      nocause: e.detail.value
    })
  },
  // 领域
  advTerritory(e) {
    let that = this
    that.setData({
      territory: e.detail.value
    })
  },
  // 故事
  advStory(e) {
    let that = this
    that.setData({
      story: e.detail.value
    })
  },

  submitBtn() {
    console.log(12321332)
    let that = this
    if (that.data.useridentity != '') {
      wx.request({
        url: `${util.baseUrl}/main/publish`,
        data: {
          token: wx.getStorageSync('openid'),
          template: 4,
          name: that.data.useridentity,
          content: {
            whouser: that.data.whouser,
            condition: that.data.condition,
            issue: that.data.issue,
            cause: that.data.cause,
            nocause: that.data.nocause,
            territory: that.data.territory,
            story: that.data.story,
            result: that.data.result,
            freplace: that.data.freplace,
            sreplace: that.data.sreplace,
            treplace: that.data.treplace,
            freason: that.data.freason,
            sreason: that.data.sreason,
            treason: that.data.treason,
            hreason: that.data.hreason,
            appendTime: that.data.appendTime
          }
        },
        success: res => {
          console.log(res)
          if (res.data.code == 200) {
            // wx.showToast({
            //   title: '提成成功',
            //   icon: 'none',
            //   duration: 2000
            // })
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请填写画布名称',
        icon: 'none'
      })
    }
  },

  // 获取该模板下画布名称
  getTempName() {
    wx.request({
      url: `${util.baseUrl}/main/getName`,
      data: {
        token: wx.getStorageSync('openid'),
        template: 4
      },
      success: res => {
        // console.log(res)
        if (res.data.code == 200) {
          this.setData({
            formerlyArr: res.data.data
          })
        }
      }
    })
  },

  // 获取回显内容
  echoContent(e) {
    let uName = e.currentTarget.dataset.name
    wx.request({
      url: `${util.baseUrl}/main/getFromName`,
      data: {
        token: wx.getStorageSync('openid'),
        template: 4,
        name: uName
      },
      success: res => {
        let response = res.data.data
        let resContent = JSON.parse(response.content)
        if (res.data.code == 200) {
          console.log(resContent)
          console.log(response)
          this.setData({
            useridentity: response.name,
            whouser: resContent.whouser,
            condition: resContent.condition,
            result: resContent.result,
            issue: resContent.issue,
            cause: resContent.cause,
            territory: resContent.territory,
            story: resContent.story,
            freplace: resContent.freplace,
            freason: resContent.freason,
            sreplace: resContent.sreplace,
            sreason: resContent.sreason,
            treplace: resContent.treplace,
            treason: resContent.treason,
            nocause: resContent.nocause,
            hreason: resContent.hreason,
            appendTime: resContent.appendTime,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTempName()
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

  }
})