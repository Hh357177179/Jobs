// pages/searchMap/searchMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: {
      markers: [],
      hasMarkers: false,
      lat: '',
      lng: ''
    }
    // markers: [{
    //   id: 0,
    //   latitude: 30.25727,
    //   longitude: 120.20523,
    //   iconPath: '/images/localicon.png',
    //   width: 30,
    //   height: 30
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    let latitude = options.latitude
    let longitude = options.longitude
    that.setData({
      'map.lat': latitude,
      'map.lng': longitude,
      'map.markers': [{
        latitude: latitude,
        longitude: longitude,
        iconPath: '/images/localicon.png',
        width: 30,
        height: 30
      }],
      'map.hasMarkers': true
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

  }
})