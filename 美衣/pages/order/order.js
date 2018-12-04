// pages/order/order.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: '',
    typeArr: [
      "大衣 / 棉衣改衣长",
      "大衣 / 棉衣改袖长",
      "大衣 / 棉衣改肥瘦",
      "大衣 / 棉衣改肩宽",
      "西服改衣长",
      "西服改袖长",
      "西服改肥瘦",
      "西服改肩宽",
      "衬衣 / T恤改衣长",
      "衬衣 / T恤改袖长",
      "衬衣 / T恤改肥瘦",
      "衬衣 / T恤改肩宽",
      "连衣裙改长短",
      "连衣裙改肥瘦",
      "连衣裙改胸或腰",
      "连衣裙改裙长",
      "改裤腰",
      "改裤边",
      "运动裤双线",
      "换裤子拉链",
      "裤子收脚口",
      "换女连衣裙拉链",
      "换男士外衣拉链",
      "改裤臀围",
      "牛仔裤改裤脚（原边）",
      "改裤肥瘦",
      "运动鞋织补",
      "T恤织补",
      "真丝羽绒织补",
      "羊毛衫织补（单面）",
      "羊毛衫改袖长（单面）",
      "羊毛衫改衣长（单面）",
      "羊毛衫改肥瘦（单面）",
      "四合扣一颗",
      "西服换扣（果实扣，牛角扣）",
      "西服配扣一颗",
      "钉扣子"
    ],
    typedefault: '请选择服务类型'
  },

  submit_order () {
    let that = this
    if (that.data.orderInfo == '') {
      util.showMsg('请填写简述')
    } else if (that.data.typedefault == '请选择服务类型') {
      util.showMsg('请选择服务类型')
    } else {
      let params = {
        token: app.globalData.openid,
        content: that.data.orderInfo,
        type: that.data.typedefault
      }
      // console.log(params)
      postRequest('/main/createOrder', params, true).then(res=> {
        console.log(res)
        util.showMsg('提交成功')
        that.setData({
          typedefault: '请选择服务类型',
          content: ''
        })
        // wx.navigateTo({
        //   url: '/pages/pay/pay?order_id=' + res.order_id,
        // })
      })
    }
  },

  // 输入textarea
  advorder (e) {
    let that = this
    that.setData({
      orderInfo: e.detail.value
    })
  },

  // 改变选择类型
  bindPickerChange (e) {
    let that = this
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let num = e.detail.value
    that.setData({
      typedefault: that.data.typeArr[num]
    })
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