// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banArr:[
      {img: '../../images/1d.jpeg'},
      {img: '../../images/2d.jpeg'},
      {img: '../../images/3d.jpeg'},
      {img: '../../images/4d.jpeg'},
      {img: '../../images/5d.jpeg'}
    ],
    preCount: 1,
    allCount: 5
  },

  // 轮播改变
  changePic (e) {
    // console.log(e)
    let curNum = e.detail.current
    let that = this
    that.setData({
      preCount: curNum + 1
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

  }
})