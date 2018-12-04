// pages/first/first.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whouser: '', // 用户是谁
    condition: '', // 情况
    issue: '',  // 问题
    cause: '',  //原因
    territory: '', // 领域
    story: '',  //故事,
    useridentity: '', // 用户身份
    formerlyArr: []
  },

  // 用户身份
  advUseridentity (e) {
    let that = this
    that.setData({
      useridentity: e.detail.value
    })
    // console.log(that.data.useridentity)
  },

  // 用户是谁
  advWhouser (e) {
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
  // 原因
  advCause(e) {
    let that = this
    that.setData({
      cause: e.detail.value
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

  submitBtn () {
    let that = this
    if (that.data.useridentity != '') {
      wx.request({
        url: `${util.baseUrl}/main/publish`,
        data: {
          token: wx.getStorageSync('openid'),
          template: 1,
          name: that.data.useridentity,
          content: {
            whouser: that.data.whouser,
            condition: that.data.condition,
            issue: that.data.issue,
            cause: that.data.cause,
            territory: that.data.territory,
            story: that.data.story
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
  getTempName () {
    wx.request({
      url: `${util.baseUrl}/main/getName`,
      data: {
        token: wx.getStorageSync('openid'),
        template: 1
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
  echoContent (e) {
    let uName = e.currentTarget.dataset.name
    wx.request({
      url: `${util.baseUrl}/main/getFromName`,
      data: {
        token: wx.getStorageSync('openid'),
        template: 1,
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
            issue: resContent.issue,
            cause: resContent.cause,
            territory: resContent.territory,
            story: resContent.story
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})