// pages/companion/describe/describe.js
/** power by 风影 */
import {
  postRequest
} from '../../../utils/HttpRequest'
const util = require('../../../utils/util')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picture_path: [],
    editformdata: {},
    userInfo: {},
    user_id: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
      user_id: wx.getStorageSync("userId")
    })
    this.getUserInfo()
    
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

  },
  /**
   * ====自定义事件开始====
   */

  uploadImg: function () {
    let that = this
    let picture_path = this.data.picture_path;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        res.tempFilePaths.forEach(function (file, index) {
          wx.uploadFile({
            url: `${util.baseUrl}/uploadimg`, //这个方法就是后台处理上传的方法
            filePath: file, //获取到上传的图片
            name: 'file',
            success: function (info) {
              picture_path.push(info.data);
              console.log(info)
              that.setData({
                picture_path: picture_path,
              })
            }
          })

        })

      },
    })
  },
  delectImg: function (e) {
    var picture_path = this.data.picture_path;
    picture_path.splice(e.currentTarget.dataset.num, 1);
    this.setData({
      picture_path: picture_path,
    })
  },
  submitAction: function (e) {
    const submit_url = `${util.baseUrl}/editUserInfo`
    const picture_path = this.data.picture_path.join()
    let parmas = {
      user_id: this.data.user_id,
      ...e.detail.value,
      picture_path,
    }
    
    console.log("parmas", parmas)
    postRequest(submit_url, parmas).then(res => {
      util.showMsg("修改成功!")
      wx.switchTab({
        url: '../../my/my',
      })
    })
  },
  getUserInfo: function () {
    const submit_url = `${util.baseUrl}/getUserInfo`
    let parmas = {
      user_id: this.data.user_id
    }
    postRequest(submit_url, parmas, true).then(res => {
      const picture_path = res.data.info.picture_path.split(",")
      this.setData({
        editformdata: res.data.info,
        picture_path:picture_path
      })
    })
  }




})