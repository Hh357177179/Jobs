// pages/storeSpecial/storeSpecial.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serveObj: [],
    servePic: [],
    serveintro: '',  // 特色服务简介
    sprice: '',  // 特色服务价格
    serverVal: '',  //特色名称
    doctorArr: [], // 店铺医师列表
    specialArr: [],
    specialLen: '',
    price: '', //价格
    sthree: '', //特色3
    stwo: '',  // 特色2
    sone: '', // 特色1
    menberVal: '', // 会员编号
    specialCardlen: '',
    specialCardVal: '',
    getSpecialCard: [],   // 店铺特色
    storeSpArr: [],   // 本地店铺特色
    shopId: '',
    jobMaskShow: false,  // 添加医师弹窗
    addserveShow: false  // 添加特色服务弹窗
  },

  // 提交服务
  subserver () {
    let that = this
    if (that.data.serverVal == '') {
      util.showMsg('名称不能为空')
    } else if (that.data.sprice == '') {
      util.showMsg('价格不能为空')
    } else if (that.data.serveintro == '') {
      util.showMsg('简介不能为空')
    } else if (that.data.servePic.length == 0) {
      util.showMsg('请上传图片')
    } else {
      let params = {
        token: app.globalData.openid,
        shop_id: that.data.shopId,
        title: that.data.serverVal,
        price: that.data.sprice,
        desc: that.data.serveintro,
        picurl: JSON.stringify(that.data.servePic)
      }
      console.log(params)
      postRequest('/main/addShopService', params, true).then(res => {
        console.log(res)
        that.getShopService()
        that.setData({
          addserveShow: false,
          serverVal: '',
          sprice: '',
          serveintro: '',
          servePic: ''
        })
      })
    }
  },

  // 特色服务简介
  advIntro (e) {
    let that = this
    that.setData({
      serveintro: e.detail.value
    })
  },
  
  // 添加特色服务名称
  advServerVal (e) {
    let that = this
    that.setData({
      serverVal: e.detail.value
    })
  },

  // 特色服务价格
  advSprice (e) {
    let that = this
    that.setData({
      sprice: e.detail.value
    })
  },

  // 上传图片
  upIconPic () {
    wx.chooseImage({
      count: 1,
      success: res => {
        wx.showLoading({
          title: '正在上传'
        })
        // console.log(res)
        wx.uploadFile({
          url: `${util.baseUrl}/main/upload`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: res => {
            wx.hideLoading()
            let imgPath = JSON.parse(res.data).data
            console.log(imgPath)
            let localPic = []
            localPic = localPic.concat(imgPath)
            this.setData({
              servePic: localPic
            })
          }
        })
      },
    })
  },

  // 添加特色服务
  addserve () {
    let that = this
    console.log('特色服务')
    that.setData({
      addserveShow: true
    })
  },

  // 关闭添加特色
  closeserver() {
    let that = this
    that.setData({
      addserveShow: false,
      serverVal: '',
      sprice: '',
      serveintro: '',
      servePic: ''
    })
  },

  // 价格
  advPrice (e) {
    let that = this
    that.setData({
      price: e.detail.value
    })
  },

  // 特色3
  advSthree (e) {
    let that = this
    that.setData({
      sthree: e.detail.value,
      specialLen: e.detail.cursor
    })
  },

  // 特色2
  advStwo (e) {
    let that = this
    that.setData({
      stwo: e.detail.value,
      specialLen: e.detail.cursor
    })
  },

  // 特色1
  advSone (e) {
    let that = this
    that.setData({
      sone: e.detail.value,
      specialLen: e.detail.cursor
    })
  },

  // 输入会员编号
  advmenVal (e) {
    let that = this
    that.setData({
      menberVal: e.detail.value
    })
  },

  // 输入店铺特色
  advScardVal (e) {
    // console.log(e.detail.value)
    let that = this
    let speicalVal = e.detail.value
    that.setData({
      specialCardVal: speicalVal,
      specialCardlen: e.detail.cursor
    })
  },

  // 获取店铺id
  getShopId () {
    let params = {
      token: app.globalData.openid
    }
    postRequest('/main/getShop', params, true).then(res => {
      console.log(res)
      this.setData({
        shopId: res.id
      })
      this.getShopCard()
      this.getShopDocter()
      this.getShopService()
    })
  },

  // 获取特色服务列表
  getShopService () {
    let params = {
      shop_id: this.data.shopId
    }
    postRequest('/main/getShopService', params, true).then(res => {
      console.log(res)
      for (let i = 0,len = res.length; i < len; i++) {
        if (res.picurl != '') {
          res[i].picurl = JSON.parse(res[i].picurl)
        }
      }
      this.setData({
        serveObj: res
      })
    })
  },

  // 获取店铺特色
  getShopCard () {
    let params = {
      token: app.globalData.openid,
      shop_id: this.data.shopId
    }
    postRequest('/main/getShopSpecial', params, true).then(res => {
      // console.log(213,JSON.parse(res))
      if (res.length != 0) {
        this.setData({
          storeSpArr: JSON.parse(res)
        })
      }
    })
  },

  // 删除特色
  deleteIcon (e) {
    // console.log(e.currentTarget.dataset.index)
    let that = this
    let delen = e.currentTarget.dataset.index
    let deleteArr = that.data.storeSpArr.splice(delen,1)
    // let lastDelet = 
    // console.log('我是被删除的',deleteArr)
    // console.log('返回新数组',lastDelet)
    that.setData({
      storeSpArr: that.data.storeSpArr.filter(item => item != deleteArr)
    })
    // console.log('传给后台的数组',that.data.storeSpArr)
    that.upSpecial()
  },

  // 添加特色
  submitAdd () {
    let that = this
    if (that.data.specialCardVal == '') {
      util.showMsg('店铺特色不能为空')
    } else if (that.data.storeSpArr.length >= 4) {
      util.showMsg('最多添加四条')
    } else if (that.data.specialCardlen > 4) {
      util.showMsg('不能大于四个字')
    } else {
      that.setData({
        storeSpArr: that.data.storeSpArr.concat(that.data.specialCardVal)
      })
      that.upSpecial()
    }
  },

  // 更新特色
  upSpecial () {
    let params = {
      token: app.globalData.openid,
      shop_id: this.data.shopId,
      shop_special: JSON.stringify(this.data.storeSpArr)
    }
    postRequest('/main/updateShopSpecial', params, true).then(res => {
      // console.log(res)
      // console.log('添加成功')
      // util.showMsg('添加成功')
      this.getShopCard()
      this.setData({
        specialCardVal: ''
      })
    })
  },

  // 关闭弹窗
  closeMask () {
    let that = this
    that.setData({
      jobMaskShow: false,
      menberVal: '',
      price: '',
      specialArr: [],
      sone: '',
      stwo: '',
      sthree: ''
    })
  },

  // 添加医师
  addJob () {
    let that = this
    that.setData({
      jobMaskShow: true
    })
  },

  // 提交特色医师
  subJobBtn () {
    let that = this
    if (that.data.menberVal == '') {
      util.showMsg('会员编号不能为空')
    } else if (that.data.sone == '' && that.data.stwo == '' && that.data.sthree == '') {
      util.showMsg('至少填写一个特色')
    } else if (that.data.price == '') {
      util.showMsg('服务价格不能为空')
    } else if (that.data.specialLen > 4) {
      util.showMsg('特色不能超过四个字')
    } else {
      // if (that.data.sone != '') {
      //   that.setData({
      //     specialArr: that.data.specialArr.concat(that.data.sone)
      //   })
      // } else if (that.data.stwo != '') {
      //   that.setData({
      //     specialArr: that.data.specialArr.concat(that.data.stwo)
      //   })
      // } else if (that.data.sthree != '') {
      //   that.setData({
      //     specialArr: that.data.specialArr.concat(that.data.sthree)
      //   })
      // }
      that.setData({
        specialArr: that.data.specialArr.concat(that.data.sone, that.data.stwo,that.data.sthree)
      })
      let params = {
        token: app.globalData.openid,
        shop_id: that.data.shopId,
        doctor_id: that.data.menberVal,
        special: JSON.stringify(that.data.specialArr),
        price: that.data.price
      }
      console.log(that.data.specialArr)
      // console.log(params)
      postRequest('/main/addShopDocter', params, true).then(res => {
        // console.log('添加医师完成结果', res)
        that.getShopDocter()
        that.setData({
          jobMaskShow: false,
          menberVal: '',
          price: '',
          specialArr: [],
          sone: '',
          stwo: '',
          sthree: ''
        })
      })
    }
  },

  // 获取店铺特色医师
  getShopDocter () {
    let params = {
      shop_id: this.data.shopId
    }
    postRequest('/main/getShopDocter', params, true).then(res => {
      console.log('店铺医师',res)
      this.setData({
        doctorArr: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.openid)
    this.getShopId()
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

  }
})