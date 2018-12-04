// pages/board/board.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodel: false,
    page: 1,
    pagesize: 5,
    projectList: [],
    allcount: 0
  },

  // 获取项目列表
  getprojectList: function() {
    let that = this
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: `${util.baseUrl}api/project/index`,
      data: {
        page: this.data.page,
        pagesize: this.data.pagesize
      },
      method: 'POST',
      success: res => {
        if (res.data.code == 200) {
          res.data.data.list.forEach((item) => {
            item.userName = '';
          })
          that.setData({
            projectList: that.data.projectList.concat(res.data.data.list),
            allcount: res.data.data.count
          })
        }
        wx.hideLoading()
      }
    })
  },


  // 监听下单人名输入
  nameVal: function(e) {
    let _this = this
    const projectList = this.data.projectList;
    const index = e.currentTarget.dataset.index;
    projectList[index].userName = e.detail.value;
    _this.setData({
      projectList
    })
  },

  // 跳转下单列表
  orderListBtn: function() {
    wx.navigateTo({
      url: '/pages/detailist/detailist',
    })
  },

  // 关闭弹窗
  closeModel: function() {
    let _this = this
    _this.setData({
      showmodel: false
    })
  },

  // 接单按钮
  orderBtn: function(e) {
    let that = this
    let uName = that.data.projectList[e.currentTarget.dataset.index].userName
    if (uName == '') {
      wx.showToast({
        title: '请输入下单人姓名',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.request({
        url: `${util.baseUrl}api/project/xiadan`,
        data: {
          openid: app.globalData.openId,
          nickname: uName,
          project_id: e.target.dataset.id
        },
        method: "POST",
        success: res => {
          if (res.data.code == 200) {
            wx.showToast({
              title: '下单成功',
              icon: 'success',
              duration: 1500
            })
            that.data.projectList[e.currentTarget.dataset.index].userName = ''
            that.setData({
              showmodel: true,
              projectList: that.data.projectList
            })
          } else {
            wx.showToast({
              title: '下单失败',
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getprojectList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let _this = this
    if (_this.data.page * _this.data.pagesize < this.data.allcount) {
      _this.setData({
        page: _this.data.page + 1
      })
      _this.getprojectList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})