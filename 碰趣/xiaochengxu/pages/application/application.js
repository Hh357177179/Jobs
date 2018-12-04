// pages/application/application.js
const app = getApp();
var idno;
var idname; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_auth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://ssl.zhaodaka.net/pengqu/isIDAuth',
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
        else {
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
    bindName: function (e) {
        var value = e.detail.value
        //console.log(value)
        idname = value;
    },
    bindIDNo: function (e) {
        var value = e.detail.value
        //console.log(value)
        idno = value;
    },

    /*
     * 验证身份证
     * */
    authID:function(e) {
        if (1) {
            wx.request({
              url: 'https://ssl.zhaodaka.net/pengqu/authID',
                data: {
                    idno:idno,
                    idname:idname,
                    userid:wx.getStorageSync("userId")
                },
                success: function (result) {
                  if(result.data.msgid==0)
                  {
                    wx.navigateTo({
                      //url: '../share/share?title=share',
                      url: "../confirm/confirm?title=confirm"
                    })
                  }
                  
                }
            })
        } else {
            // console.log('验证码发送失败' + res.errMsg);
        }
    },

})