// pages/active/active.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vdata: {},
    showinput: false,
    showreply: false,
    replynickname: "",
    comment_content: "",
    commentlist:[],
    aciteve_id:""
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let aciteve_id = options.id
    this.setData({
      aciteve_id: aciteve_id
    })
    this.getActiveDetails(aciteve_id)
    this.getCommentList(aciteve_id)

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
  onShareAppMessage: function (e) {
    if (e.from === 'button') {
    }
    return {
      title: this.data.vdata.activity.type+ this.data.vdata.activity.title,
      path: '/pages/active/active?id=' + this.data.aciteve_id,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },

  
  getActiveDetails: function (id) {
    wx.request({
      //api/v2/activity/get_one
      url: util.baseUrl + 'api/v2/activity/get_one',
      data: {
        aid: id,
        uid: wx.getStorageSync("userId")
      },
      success: res => {
        console.log(res)
        let avdata = res.data
        console.log('打印数据',res.data)
        // avdata.activity.start_time = util.dateFormat(new Date(avdata.activity.start_time*1000))
        // console.log(avdata)
        this.setData({
          vdata: avdata
        })
      },
      fail: res => {
        wx.showToast({
          title: '网络错误',
        })
      }
    })
  },
  /*
       * 支付调用
       * */
  pay: function (e) {
    wx.request({
      url: 'https://ssl.zhaodaka.net/pengqu/pay',
      data: {
        userid: wx.getStorageSync("userId"),
        total_money: 0.01
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp + '',
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (ref) {
            // console.log(ref);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          'fail': function (ref) {
            // console.log(ref);
            wx.showToast({
              title: '支付失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      comment_content: e.detail.value
    })
  },
  commentInputTarget: function () {
    this.setData({
      showreply: false,
      showinput: !this.data.showinput
    })
  },
  commentReplyTarget: function (e) {
    this.setData({
      showinput: false,
      showreply: !this.data.showreply,
      replynickname: e.currentTarget.dataset.nickname
    })
  },
  sendComment: function () {
    wx.request({
      url: util.baseUrl + 'addComment',
      method: 'GET',
      data: {
        uid: wx.getStorageSync("userId"),
        aid: this.data.aciteve_id,
        content: this.data.comment_content

      },
      success: res => {
        util.showMsg(res.data.msg)
        this.setData({
          showinput: false,
          comment_content:""
        })
        this.getCommentList(this.data.aciteve_id)
      },
      fail: res => {
        util.showMsg("请求异常")
      }

    })
  },
  sendReply: function () {
    wx.request({
      url: util.baseUrl + 'addComment',
      method: 'GET',
      data: {
        uid: wx.getStorageSync("userId"),
        aid: this.data.aciteve_id,
        content: '回复' + this.data.replynickname + '：' + this.data.comment_content

      },
      success: res => {
        util.showMsg(res.data.msg)
        this.setData({
          showreply: false,
          comment_content: "",
          replynickname: "",
        })
        this.getCommentList(this.data.aciteve_id)
      },
      fail: res => {
        util.showMsg("请求异常")
      }

    })
  },
  getCommentList(aid){
    wx.request({
      url: util.baseUrl + 'getByAid',
      method:"GET",
      data:{
        aid:aid
      },
      success:res=>{
       
          if(res.data.length!=0)
          {
            this.setData({  
              commentlist:res.data
            })
          }
          else{
            
          }
         
      },
      fail:res=>{
        wx.showToast({
          title: '请求异常',
        })
      }
    })
  },
  goAmap: function () {
    let _this = this
    let lon = this.data.vdata.activity.longitude
    let lat = this.data.vdata.activity.latitude
    lon = parseFloat(lon)
    lat = parseFloat(lat)


    wx.openLocation({
      latitude: lat,
      longitude: lon,
      scale: 28,
      success: function (res) {
        console.log(res)
      }
    })

  }


})