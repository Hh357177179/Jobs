// pages/listDetail/listDetail.js
const WxParse = require('../../wxParse/wxParse.js');
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detailObj: {},
    bindName: 'article',
    article_content: ''
  },

  // 时间格式化
  frDate(dates) {
    var date = new Date(dates)
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var H = date.getHours();
    var m = date.getMinutes();
    if (M < 10) M = "0" + M;
    if (D < 10) D = "0" + D;
    if (H < 10) H = "0" + H;
    return `${Y}-${M}-${D} ${H}:${m}`
  },
  
  // 获取文章详情
  getDetail () {
    let that = this
    let params = {
      id: that.data.id
    }
    postRequest('/main/projectDetail', params, true).then(res => {
      console.log(res)
      res.create_time = that.frDate(res.create_time * 1000)
      WxParse.wxParse('article', 'html', res.content, that, 20);
      that.setData({
        detailObj: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    let id = options.id
    let that = this
    that.setData({
      id: id
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

  }
})