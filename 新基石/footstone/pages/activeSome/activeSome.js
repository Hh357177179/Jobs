// pages/activeSome/activeSome.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid: '',
    page: 1,
    pagesize: 10,
    counts: 0,
    srclocal: '',
    showPics: false,
    homeList: []
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

  getList () {
    let t = this
    let params = {
      project_id: t.data.aid,
      page: t.data.page,
      pagesize: t.data.pagesize
    }
    postRequest('/main/projectDynamicList', params).then(res => {
      console.log(res)
      for (var i = 0,len = res.list.length;i < len; i++) {
        res.list[i].picurl = res.list[i].picurl.split('|')
      }
      t.setData({
        homeList: t.data.homeList.concat(res.list),
        counts: res.count
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.aid)
    let t = this
    t.setData({
      aid: options.aid
    })
    t.getList()
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
    var a = this;
    a.data.page * a.data.pagesize < a.data.counts && (a.setData({
      page: a.data.page + 1
    }), a.getList());
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})