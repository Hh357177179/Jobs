// pages/secondPage/secondPage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proDetail: {},
    proPiclist: [],
    id: '',
    srclocal: '',
    showPics: false,
    proBpArr: []
  },

  sBpic(e) {
    let t = this
    console.log(e.currentTarget.dataset.src)
    let src = e.currentTarget.dataset.src
    t.setData({
      srclocal: src,
      showPics: true
    })
  },

  picMask() {
    let t = this
    t.setData({
      showPics: false
    })
  },

  getDetail () {
    var a = this;
    wx.request({
      url: util.baseUrl + "/main/getProject",
      data: {
        project_id: a.data.id
      },
      success: function (t) {
        if (200 == t.data.code) {
          console.log(123, t.data.data)
          a.setData({
            proDetail: t.data.data,
            proPiclist: t.data.data.picurl.split('|'),
            proBpArr: t.data.data.project_bp.split('|')
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let that = this
    that.setData({
      id: options.id
    })
    that.getDetail()
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