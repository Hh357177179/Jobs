// pages/groupname/groupname.js
const util = require('../../../utils/util.js')
import {
  postRequest,
  getRequest
} from '../../../utils/HttpRequest'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_details: {},
    adult_num:0,
    child_num:0,
    total_num:0,
    total_price:0,
    mobile:0,
    group_id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupDetails(options.group_id)
    this.setData({
      group_id: options.group_id
    })
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
  adultAmountInput: function (e) {
    this.setData({
      adult_num: e.detail.value
    });
    this.updateTotal();
  },
  childAmountInput: function (e) {
    this.setData({
      child_num: e.detail.value
    });
    this.updateTotal();
  },

  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  updateTotal:function(){
    var total_num = parseInt(this.data.adult_num) + parseInt(this.data.child_num)
    var total_price = parseInt(this.data.adult_num) * this.data.group_details.adult_price + parseInt(this.data.child_num) * this.data.group_details.child_price
    this.setData({
      total_num: total_num,
      total_price: total_price
    })
  },

  getGroupDetails: function (group_id) {
    let _this = this
    const submit_url = `${util.baseUrl}/getGroupDetail`
    let params = {
      id: group_id,
      user_id: wx.getStorageSync("userId")
    }
    postRequest(submit_url, params, true).then(res => {
      console.log(res.data.info);
      this.setData({
        group_details: res.data.info
      })
    })
  },

  mobile_validate:function()
  {
    var mobile = this.data.mobile;
    if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'fail',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'fail',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'fail',
        duration: 1500
      })
      return false;
    }
    return true;
  },
  num_validate:function()
  {
    var adult_num = this.data.adult_num;
    var child_num = this.data.child_num; 
    if(adult_num+child_num==0)
    {
      wx.showToast({
        title: '报名总人数不可为0',
        icon: 'fail',
        duration: 1500
      })
      return false;
    }
  },
  validate_before_submit:function()
  {
    if (this.mobile_validate()==false)
      return false;
    if(this.num_validate()==false)
      return false;
    return true;
  },

  submit: function () {
    this.updateTotal(); 
    var adult_num = this.data.adult_num;
    var child_num = this.data.child_num; 
    if (this.validate_before_submit()==false) return false;
    
    let _this = this
    const submit_url = `${util.baseUrl}/singupGroup`
    let params = {
      group_id: _this.data.group_id,
      user_id: wx.getStorageSync("userId"),
      adult_amount:adult_num,
      child_amount:child_num,
      cnntact_phone: _this.data.mobile
    }
    postRequest(submit_url, params, true).then(res => {
      console.log(this.data.total_price);
      if(this.data.total_price==0)
      {
        wx.showToast({
          title: '支付成功',
          icon: 'success', 
          duration: 2000
        }),
        wx.navigateTo({
          url: '../detailed/detailed?group_id=' + this.data.group_id,
        }) 
      } 
      else
      {
        let _this = this
        const submit_url = `${util.baseUrl}/pay`
        let params = {
          user_id: wx.getStorageSync("userId"),
          order_id: res.data.info.id
        }
        getRequest(submit_url, params, true).then(res => {

          wx.requestPayment({
            'timeStamp': res.data.timeStamp + '',
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (ref) {
              console.log(ref);
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000,
              }),
                wx.navigateTo({
                  url: '../detailed/detailed?group_id=' + _this.data.group_id,
                })
            },
            'fail': function (ref) {
              console.log(ref);
              wx.showToast({
                title: '支付失败',
                icon: 'fail',
                duration: 2000
              })
            },
            'complete': function (ref) {
              console.log(ref);
            }
          })

        })
      }

      
    })
  } 
})