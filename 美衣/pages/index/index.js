//index.js
//获取应用实例
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js' 
const app = getApp()

Page({
  data: {
    page: 1,
    pagesize: 10,
    listArr: [],
    counts: 0
  },

  // 查看文章详情
  searchDetail (e) {
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/listDetail/listDetail?id=' + id,
    })
  },

  // 时间格式化
  frDate (dates) {
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

  // 获取首页列表
  getList () {
    let that = this
    let params = {
      page: that.data.page,
      pagesize: that.data.pagesize
    }
    postRequest('/main/projectList', params, true).then(res => {
      // console.log(res)
      for (let i = 0, len = res.list.length; i < len; i++) {
        res.list[i].create_time = that.frDate(res.list[i].create_time * 1000)
      }
      that.setData({
        listArr: that.data.listArr.concat(res.list),
        counts: res.count
      })
    })
  },
  
  onLoad: function () {
    let that = this
    that.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      that.getList()
    } else {
      util.showMsg('没有更多数据啦')
    }
  } 
})
