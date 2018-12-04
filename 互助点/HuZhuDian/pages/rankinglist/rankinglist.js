const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdata: [],
    money: '278',
    currentpage:'4',
    allpage:'10'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this
    page.Load()
  },
  //分页加载
  Load1:function(index){

  },

  Load: function () {
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    var page = this
    //排行查询
    wx.request({
      url: 'https://wechatsign.zhaodaka.net/api/get_amount_rank',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        ,
        'wechat_host': 'huzhudian'
      },
      method: 'POST',
      data: {
      },
      success: function (e) {
        console.log(e.data.data.list)
        wx.hideLoading()
        if (e.data.code == 0) {
          page.setData({
            startdata: e.data.data.list
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            title: '网络异常',
            icon: 'loading',
            duration: 1300
          })
        }
      }, fail: function () {
        wx.hideLoading()
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

  }
})