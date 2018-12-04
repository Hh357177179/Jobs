// pages/apply/apply.js
const app = getApp();
var mobile;
var code;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_auth: 0,
  },
    bindPhone:function(e){
        this.setData({
            mobile:e.detail.value
        })
    },

    bindMobileInput: function (e) {
      var value = e.detail.value
      //console.log(value)
      mobile = value;
    },
    bindCodeInput: function (e) {
      var value = e.detail.value
      //console.log(value)
      code = value;
    },
    /*
    * 发送手机验证码
    * */
    sendCode:function(e) {
        if (mobile) {
            wx.request({
                url: 'https://ssl.zhaodaka.net/pengqu/sendcode',
                data: {
                    mobile: mobile,
                },
                success: function (result) {
                  if (result.msgid == 0)
                    console.log(result.msg);
                }
            })
        } else {
            console.log('验证码发送失败');
        }
    },
    /*
  * 验证手机号
  * */
    authMobile:function(e) {
        if (code) {
            wx.request({
                url: 'https://ssl.zhaodaka.net/pengqu/authMobile',
                data: {
                    mobile: mobile,
                    code: code,
                    userid: wx.getStorageSync("userId")
                },
                success: function (result) {
                  if (result.msgid == 0)
                    console.log(result.msg);
                  wx.navigateTo({
                    //url: '../share/share?title=share',
                    url: "../application/application?title=application"
                  })
                }
            })
        } else {
            console.log('验证失败');
            
        }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this;
    wx.request({
      url: 'https://ssl.zhaodaka.net/pengqu/isMobileAuth',
      data: {
        userid: wx.getStorageSync("userId")
      },
      success: function (result) { 
        console.log(result.data);
        if (result.data.msgid == 0) {
         // console.log(result.data.msg);
          that.setData({
            is_auth: result.data.msg, 
          })
        }
        else
        {
          console.log(result.msg);
        }
      }
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

})