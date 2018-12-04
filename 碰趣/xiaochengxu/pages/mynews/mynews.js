// pages/mynews/mynews.js
const util = require('../..//utils/util')
import { postRequest }  from '../../utils/HttpRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talklist:[],
    page:1
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
    const pagenum  = this.data.page
    this.getTalkList(pagenum)
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
    let page = this.data.page + 1;
 
    this.getTalkInfo(page)
    this.setData({
      page: page,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getTalkList:function(page){
    /**
     * user_id
     * page
     * pagesize
     */
    const submit_url = `${util.baseUrl}/getTalkList`
    
    let parmas = {
     user_id: wx.getStorageSync ('userId'),
     //user_id:1,
      page:page,
      pagesize:10,
    }
    postRequest(submit_url,parmas,true).then(res=>{
      const response = res.data
      this.setData({
        talklist: response.info
      })
    })
  },

  

})