// pages/infocard/infocard.js
const app = getApp()
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dCardObj: {},
    maskShow: false,
    givePic: ''
  },

  // 转赠
  givenBtn () {
    let that = this
    let params = {
      token: app.globalData.userInfo.openid,
      card_id: that.data.dCardObj.id
    }
    console.log(params)
    postRequest('/main/getMiniCode', params, true).then(res => {
      postRequest('/main/myCardGift', params, true).then(res => {
        that.setData({
          givePic: res,
          maskShow: true
        })
      })
    })
  },

  // 关闭弹窗
  closeMask () {
    this.setData({
      maskShow: false
    })
  },

  // 点击激活
  btnActivate () {
    wx.showModal({
      title: '提示信息',
      content: '确认激活年卡吗？',
      cancelColor: '#666',
      confirmColor: '#98cdc6',
      confirmText: '激活',
      success: res => {
        if (res.confirm) {
          // console.log('激活成功')
          let params = {
            token: app.globalData.userInfo.openid,
            card_id: this.data.dCardObj.id
          }
          console.log(params)
          postRequest('/main/myCardUsed', params, true).then(res => {
            wx.showToast({
              title: '激活成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 2000)
          })
        } else {
          console.log('失败')
        }
      }
    })
  },

  // 保存到手机
  savePic () {
    wx.downloadFile({
      url: this.data.givePic,
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: result => {
              console.log(result)
              if (result.errMsg == 'saveImageToPhotosAlbum:ok') {
                wx.showToast({
                  title: '保存成功！',
                  icon: 'success',
                  duration: 2000
                })
                this.setData({
                  maskShow: false
                })
              } else {
                util.showMsg('保存失败!')
              }
            },
            fail: err => {
              console.log(err)
              if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                wx.openSetting({
                  success: settingdata => {
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册")
                    } else {
                      console.log("获取权限失败")
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cardObj = JSON.parse(options.str)
    console.log(cardObj)
    let that = this
    that.setData({
      dCardObj: cardObj
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
  onShareAppMessage: function (res) {
    return {
      title: '喔喔云商城',
      path: 'pages/index/index?pid=' + app.globalData.userInfo.id,
    }
  }
})