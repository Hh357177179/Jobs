// pages/choosePic/choosePic.js
const util = require('../../utils/util.js')
import {
  postRequest
} from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    realname: '',
    passwords: ''
  },

  // 点击修改头像
  choPic() {
    console.log('点击修改头像')
  },

  advrealname(e) {
    let that = this
    // console.log(e)
    that.setData({
      realname: e.detail.value
    })
  },

  advpasswords(e) {
    let that = this
    that.setData({
      passwords: e.detail.value
    })
  },

  uploadPic() {
    let that = this
    wx.chooseImage({
      count: 1,
      success: res => {
        wx.showLoading({
          title: '正在上传'
        })
        // console.log(res)
        wx.uploadFile({
          url: `${util.baseUrl}/main/upload`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: res => {
            console.log(res)
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


  // 保存
  saveBtn() {
    let that = this
    let params = {
      token: wx.getStorageSync('openid'),
      avatar: that.data.avatar,
      realname: that.data.realname,
      password: that.data.passwords
    }
    console.log(params)
    postRequest('/user/modify', params).then(res => {
      console.log(res)
      wx.setStorageSync('realname', that.data.realname)
      wx.setStorageSync('avatar', that.data.avatar)
      util.showMsg('修改成功')
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/me/me',
        })
      }, 2000)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      avatar: wx.getStorageSync('avatar'),
      realname: wx.getStorageSync('realname')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})