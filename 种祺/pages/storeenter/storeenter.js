// pages/storeenter/storeenter.js
const util = require('../../utils/util.js')
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: '',
    again: '',
    textStatus: 0,
    cTimeF: '选择开店时间',
    cTimeS: '选择闭店时间',
    ctime: '', // 开店时间
    stime: '', // 关店时间
    pnum: 0,
    pnums: 0,
    localText: '', //店铺地址
    latitude: '', // 纬度
    longitude: '', // 经度
    storeName: '', // 店铺名称
    areaVal: '', // 店铺特色
    userVal: '', // 联系人
    telVal: '', // 联系电话
    city: '', // 城市名称
    licenseArr: [],   //营业执照
    qualificationArr: [],  //资格证
    staffArr: [],  // 员工合照
    shopArr: [],  // 门店照片
    shopOne: [],  // 第一张门店照片
    shopTwo: [], // 第二张门店
    shopThree: [], // 第三张门店
    shopFour: [], // 第四张门店
    shopFive: [], // 第二张门店
  },

  // 联系电话
  advTelVal(e) {
    let that = this
    that.setData({
      telVal: e.detail.value
    })
  },

  // 联系人
  advUserVal(e) {
    let that = this
    that.setData({
      userVal: e.detail.value
    })
  },

  // 店铺特色
  advAreaVal(e) {
    let that = this
    that.setData({
      areaVal: e.detail.value
    })
  },

  // 店铺名称
  advSname(e) {
    let that = this
    that.setData({
      storeName: e.detail.value
    })
  },

  // 选择开店时间
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cTimeF: e.detail.value,
      ctime: e.detail.value,
      pnum: 1
    })
  },
  // 选择关门时间
  sTimeChange(e) {
    console.log(e.detail.value)
    this.setData({
      cTimeS: e.detail.value,
      stime: e.detail.value,
      pnums: 1
    })
  },

  // 选择店铺地址
  chooseLocal() {
    let that = this
    wx.chooseLocation({
      success: res => {
        console.log(res)
        var analysis = new QQMapWX({
          key: 'UVOBZ-O6SKQ-XFU5E-GQMYL-H4IDJ-6AB3Q'
        });
        analysis.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            console.log(res)
            that.setData({
              city: res.result.address_component.city
            })
          },
          fail: res => {
            console.log(res)
          }
        })
        that.setData({
          localText: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: err => {
        console.log(err)
        if (err.errMsg == 'chooseLocation:fail auth deny') {
          wx.getSetting({
            success: res => {
              if (!res.authSetting['scope.userLocation']) {
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  success: res => {
                    if (res.confirm) {
                      wx.openSetting({
                        success: res => {
                          if (res.authSetting['scope.userLocation'] == true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 2000
                            })
                            // 授权成功调取地址
                            wx.chooseLocation({
                              success: res => {
                                var analysis = new QQMapWX({
                                  key: 'UVOBZ-O6SKQ-XFU5E-GQMYL-H4IDJ-6AB3Q'
                                });
                                analysis.reverseGeocoder({
                                  location: {
                                    latitude: res.latitude,
                                    longitude: res.longitude
                                  },
                                  success: res => {
                                    console.log(res)
                                    that.setData({
                                      city: res.result.address_component.city
                                    })
                                  },
                                  fail: res => {
                                    console.log(res)
                                  }
                                })
                                that.setData({
                                  localText: res.address,
                                  latitude: res.latitude,
                                  longitude: res.longitude
                                })
                              },
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          util.showMsg("未选择地址")
        }
      }
    })
  },

  // 提交入驻资料
  submitStore () {
    let that = this
    that.setData({
      shopArr: that.data.shopArr.concat(that.data.shopOne, that.data.shopTwo, that.data.shopThree, that.data.shopFour, that.data.shopFive)
    })
    let params = {
      token: app.globalData.openid,
      title: that.data.storeName,
      address: that.data.localText,
      longitude: that.data.longitude,
      latitude: that.data.latitude,
      open_time: that.data.ctime,
      close_time: that.data.stime,
      about: that.data.areaVal,
      name: that.data.userVal,
      phone: that.data.telVal,
      license_url: JSON.stringify(that.data.licenseArr),
      qualification_url: JSON.stringify(that.data.qualificationArr),
      staff_url: JSON.stringify(that.data.staffArr),
      shop_url: JSON.stringify(that.data.shopArr),
      city: that.data.city
    }
    console.log(params)
    if (params.title == '') {
      util.showMsg('请输入店铺名称')
    } else if (params.address == '') {
      util.showMsg('请选择店铺地址')
    } else if (params.open_time == '') {
      util.showMsg('请选择开店时间')
    } else if (params.close_time == '') {
      util.showMsg('请选择关店时间')
    } else if (params.about == '') {
      util.showMsg('请输入特色简介')
    } else if (params.name == '') {
      util.showMsg('请输入联系人姓名')
    } else if (!params.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
      util.showMsg('请输入正确手机号码')
    } else if (that.data.licenseArr.length == 0) {
      util.showMsg('请上传营业执照')
    } else if (that.data.qualificationArr.length == 0) {
      util.showMsg('请上传从业资格证')
    } else if (that.data.staffArr.length == 0) {
      util.showMsg('请上传员工合照')
    } else if (that.data.shopArr.length == 0) {
      util.showMsg('请上传门店照片')
    } else {
      // console.log(params)
      if (that.data.again == 1) {
        that.setData({
          shopArr: []
        })
        that.setData({
          shopArr: that.data.shopArr.concat(that.data.shopOne, that.data.shopTwo, that.data.shopThree, that.data.shopFour, that.data.shopFive)
        })
        let paramsA = {
          shop_id: that.data.shopId,
          token: app.globalData.openid,
          title: that.data.storeName,
          address: that.data.localText,
          longitude: that.data.longitude,
          latitude: that.data.latitude,
          open_time: that.data.ctime,
          close_time: that.data.stime,
          about: that.data.areaVal,
          name: that.data.userVal,
          phone: that.data.telVal,
          license_url: JSON.stringify(that.data.licenseArr),
          qualification_url: JSON.stringify(that.data.qualificationArr),
          staff_url: JSON.stringify(that.data.staffArr),
          shop_url: JSON.stringify(that.data.shopArr),
          city: that.data.city
        }
        console.log('拒绝重新填')
        console.log(123213,paramsA)
        console.log(3446, JSON.parse(paramsA.shop_url))
        postRequest('/main/updateShop', paramsA, true).then(res => {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '重新提交成功，请耐心等待审核',
            success: res => {
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            }
          })
        })
      } else {
        postRequest('/main/applyShop', params, true).then(res => {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '提交成功，请耐心等待审核',
            success: res => {
              wx.navigateBack()
            }
          })
        })
      }
    }
  },

  // 上传执照
  uplicense () {
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
              licenseArr: localPic
            })
          }
        })
      },
    })
  },

  // 上传资格证
  upqualification () {
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
              qualificationArr: localPic
            })
          }
        })
      }
    })
  },

  // 上传员工合照
  upstaff () {
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
              staffArr: localPic
            })
          }
        })
      },
    })
  },

  // 上传门店照片
  upshopO () {
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
              shopOne: localPic
            })
          }
        })
      },
    })
  },
  // 上传第二个
  upshopT () {
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
              shopTwo: localPic
            })
          }
        })
      },
    })
  },

  upshopTh () {
    wx.chooseImage({
      count: 1,
      success: res => {
        // console.log(res)
        wx.showLoading({
          title: '正在上传'
        })
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
              shopThree: localPic
            })
          }
        })
      },
    })
  },

  upshopF () {
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
              shopFour: localPic
            })
          }
        })
      },
    })
  },
  
  upshopFi () {
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
              shopFive: localPic
            })
          }
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let again = options.again
    let that = this
    if (again == 1) {
      that.setData({
        again: options.again
      })
      let params = {
        token: app.globalData.openid
      }
      if (options.again) {
        postRequest('/main/getShop', params, true).then(res => {
          console.log(res)
          let allShopArr = JSON.parse(res.shop_url)
          // console.log(123,allShopArr.length)
          if (allShopArr.length == 1) {
            that.setData({
              shopOne: allShopArr[0]
            })
          } else if (allShopArr.length == 2) {
            that.setData({
              shopOne: allShopArr[0],
              shopTwo: allShopArr[1]
            })
          } else if (allShopArr.length == 3) {
            that.setData({
              shopOne: allShopArr[0],
              shopTwo: allShopArr[1],
              shopThree: allShopArr[2]
            })
          } else if (allShopArr.length == 4) {
            that.setData({
              shopOne: allShopArr[0],
              shopTwo: allShopArr[1],
              shopThree: allShopArr[2],
              shopFour: allShopArr[3]
            })
          } else {
            that.setData({
              shopOne: allShopArr[0],
              shopTwo: allShopArr[1],
              shopThree: allShopArr[2],
              shopFour: allShopArr[3],
              shopFive: allShopArr[4]
            })
          }
          that.setData({
            shopId: res.id,
            storeName: res.title,
            localText: res.address,
            longitude: res.longitude,
            latitude: res.latitude,
            ctime: res.open_time,
            pnum: 1,
            pnums: 1,
            cTimeF: res.open_time,
            stime: res.close_time,
            cTimeS: res.close_time,
            areaVal: res.about,
            userVal: res.name,
            telVal: res.phone,
            licenseArr: JSON.parse(res.license_url),
            qualificationArr: JSON.parse(res.qualification_url),
            staffArr: JSON.parse(res.staff_url),
            // shopArr: JSON.parse(res.shop_url),
            city: res.city
          })
        })
      }
    }
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
})