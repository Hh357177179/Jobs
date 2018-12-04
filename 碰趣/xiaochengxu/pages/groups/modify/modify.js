// pages/modify/modify.js
const util = require('../../../utils/util.js')
var uid;
var type;
var title;
var keyword;
var content;
var address;
var phone;
var total_num;
var start_time;
var last_time;
var adult_price;
var child_price;
var image_path;
var signup_during_activity;
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startproduceDate: '2018-01-01',
    endproducedate: '2018-12-31',
    selectedproduceDate: '2018-06-13',
    image: [],
    img_button: 'inline-block',
  },
  dateChange: function (e) {
    this.setData({
      selectedproduceDate: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uid = options.uid
    type = options.type
    title = options.title
    keyword = options.keyword
    content = options.content
    address = options.address
    phone = options.phone
    total_num = options.total_num
    start_time = options.start_time
    last_time = options.last_time
    adult_price = options.adult_price
    child_price = options.child_price
    image_path = new Array()
    signup_during_activity = options.signup_during_activity

    const today = new Date()
    const begindate = util.dateFormat(today)
    this.setData({
      begin_date: begindate
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
  chooseAddressAction: function () {
    wx.chooseLocation({
      success: res => {
        if (res) {
          // console.log(res)
          address = res.address
          this.setData({
            localaddress: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      },
      fail: res => {
      },
      complete: res => {
      },
    })
  },

  uploadImg: function () {
    var that = this, image = this.data.image;
    if (this.data.image.length < 9) {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          res.tempFilePaths.forEach(function (file, index) {
            wx.uploadFile({
              url: 'https://ssl.zhaodaka.net/pengqu/uploadimg',//这个方法就是后台处理上传的方法
              filePath: file, //获取到上传的图片
              name: 'file',
              success: function (info) {
                //"https://ssl.zhaodaka.net/pengqu/uploads/images/"+
                image_path.push(info.data);
                console.log(info)
                // console.log(image_path);//info.data就是上传成功的图片名称 您可以在wxml里面搞一个隐藏域存储起来，在上面Submit提交里拼装一块提交出去
                if (that.data.image.length == 8) {
                  that.setData({
                    img_button: 'none',
                  })
                }
                image = image_path
                that.setData({
                  image: image,
                })
              }
            })

          })

        },
        complete: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        }
      })
    }

  },

  delectImg: function (e) {
    var image = this.data.image;
    image.splice(e.currentTarget.dataset.num, 1);
    image_path.splice(e.currentTarget.dataset.num, 1);
    this.setData({
      image: image,
      img_button: 'inline-block',
    })
  },

})