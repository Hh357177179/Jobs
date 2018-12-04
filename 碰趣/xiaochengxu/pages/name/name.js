  // pages/name/name.js
  const util = require('../../utils/util.js')
  import {
    postRequest,
    getRequest
  } from '../../utils/HttpRequest'
  const app = getApp()
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      vdata: {},
      total_num: 0,
      total_price: 0,
      adult_num: 0,
      child_num: 0,
      phone: '',
      aciteve_id: ''
  
    },

    // 手机号
    bindPhoneInput: function (e) {
      this.setData({
        phone: e.detail.value
      })

    },
    // 成人数量
    bindAdultNumInput: function (e) {
 
      let adult_num=e.detail.value==''?0:parseInt(e.detail.value)//儿童数量

      let total_num = adult_num + this.data.child_num
      let total_price = parseInt(adult_num) * parseInt(this.data.vdata.adult_price)
      this.setData({
        adult_num: adult_num,
        total_num: total_num,
        total_price: total_price
      })
    },
    // 儿童数量
    bindChildNumInput: function (e) {
      let adult_num = parseInt(this.data.adult_num)//成人数量
      let child_num=e.detail.value==''?0:parseInt(e.detail.value)//儿童数量

      let total_num = parseInt(adult_num) + parseInt(child_num)
      let total_price = parseInt(adult_num) * parseInt(this.data.vdata.adult_price) + parseInt(child_num) * parseInt(this.data.vdata.child_price)
      console.log(total_num)
      console.log(total_price)
      this.setData({
        total_num: total_num,
        total_price: total_price
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(1232131231321,options)
      let aciteve_id = options.aid
      this.setData({
        aciteve_id: aciteve_id
      })
      this.getActiveDetails(aciteve_id)
      
    },
    /**
     * 获取活动信息
     */
    getActiveDetails: function (id) {
      let that = this
      wx.request({
        url: util.baseUrl + 'query?aid=' + id,
        success: function (res) {
          console.log(res)
          let avdata = res.data.activity
          console.log(123123213123123123,avdata)
          
            that.setData({
              vdata: avdata,
              
            })
        },
        fail: res => {
          wx.showToast({
            title: '获取活动信息失败',
          })
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

 

    mobileInput: function (e) {
      this.setData({
        mobile: e.detail.value
      })
    },
    submit: function () {
      let that = this;
      let phone = this.data.phone
      let adult_num = this.data.adult_num
      let child_num = this.data.child_num
      console.log(child_num)
      var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      var name = /^[u4E00-u9FA5]+$/;
      if (phone == '') {
        wx.showToast({
          title: '手机号不能为空',
        })
        return false;
      }
      if (adult_num == '') {
        wx.showToast({
          title: '成人人数不能为空',
        })
        return false;
      }
     if (phone.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'success',
          duration: 1500
        })
        return false;
      }

      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(phone)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'success',
          duration: 1500
        })
        return false;
      }
      let total_price=0
      let total_num = parseInt(adult_num) + parseInt(child_num)
      if (adult_num == 0) {
        wx.showToast({
          title: '请输入正确人数',
        })
      } else {
        if ((total_num + this.data.vdata.participate_num) > this.data.vdata.total_num) {
          wx.showToast({
            title: '人数过限',
          })
        } else {
          total_price = parseInt(adult_num) * this.data.vdata.adult_price + parseInt(child_num) * this.data.vdata.child_price
       
          wx.request({
            url: 'https://ssl.zhaodaka.net/pengqu/signUp',
            data: {
              goodsid: this.data.aciteve_id,
              userid: wx.getStorageSync("userId"),
              body: this.data.vdata.title,
              detail: 1,
              price_adult: this.data.vdata.adult_price,
              count_adult: adult_num,
              price_child: this.data.vdata.child_price,
              count_child: child_num,
              total: total_price,
              mobile: phone
            },
            success: result => {
              console.log(result);
              if (result.data.status == 1) {
                if (total_price == 0) {
                  wx.showToast({
                      title: result.data.msg
                    })
                    wx.navigateTo({
                      url: '../share/share?title=share&id=' + aciteve_id + '&title=' + that.data.vdata.title,
                    })
                } else {
                  let _this = this
                  const submit_url = `${util.baseUrl}/pay`
                  let params = {
                    user_id: wx.getStorageSync("userId"),
                    order_id: result.data.info.id
                  }
                  getRequest(submit_url, params, true).then(res => {

                    wx.requestPayment({
                      'timeStamp': res.data.timeStamp + '',
                      'nonceStr': res.data.nonceStr,
                      'package': res.data.package,
                      'signType': 'MD5',
                      'paySign': res.data.paySign,
                      'success': ref => {
                        console.log(ref);
                        wx.showToast({
                            title: '支付成功',
                            icon: 'success',
                            duration: 2000,
                          }),
                          wx.navigateTo({
                            url: '../share/share?title=share&id=' + aciteve_id + '&title=' + that.data.vdata.title,
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
              } else {
                wx.showToast({
                  title: result.data.msg,
                })
              }
            }
          })
        }
      }
    },
  })