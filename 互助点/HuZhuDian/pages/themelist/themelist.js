const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore: false,
    page: 1,
    pageSize: 10,
    list: [],
    isProduction: true
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      list: [],
      noMore: false
    });
    this.getLists()
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  onShow: function(){
    var that = this
    this.setData({
      page: 1,
      list: [],
      noMore: false
    });
    this.getLists()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  scroll: function (event) {
    this.setData({
      scrollTop : event.detail.scrollTop
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  formatNumber(val) {
    return val < 10 ? '0' + val : val;
  },
  lower(e) {
    this.getLists()
  },
  getLists() {
    if (this.data.noMore) return;
    const page = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://wechatsign.zhaodaka.net/api/getForumList',
      data: {
        page: page.data.page,
        pageSize: page.data.pageSize
      }, 
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'wechat_host': 'huzhudian'
      },
      methods: 'GET',
      success: function (res) {
        wx.hideLoading()
        if (res && res.data && res.data.code === 0) {
          if (res.data.data.isProduction == false){
            page.setData({
              isProduction: res.data.data.isProduction
            })
          }
          if (page.data.page * page.data.pageSize >= res.data.data.total) {
            page.setData({
              noMore: true
            });
          }
          const data = res.data.data && res.data.data.list
          let list = []
          data.forEach((item, index) => {
            const time = new Date(item.create_time * 1000)
            const Y = time.getFullYear() + '-'
            const M = time.getMonth() + 1 + '-'
            const D = time.getDate() + ' '
            const h = time.getHours() + ':'
            const m = time.getMinutes() + ':'
            const s = time.getSeconds()
            list.push({
              id: item.id,
              author: item.author,
              title: item.title,
              comments_count: item.comments_count,
              content: item.content.length > 20 ? item.content.substring(0, 20) + '...' : item.content,
              create_time: Y+ M + D + h + m + s
            })
          })
          page.setData({
            list: [...page.data.list, ...list],
            page: ++page.data.page
          })
        } else {
          wx.showToast({
            title: '系统错误',
            icon: 'loading',
            duration: 1300
          })
        }
      },
      error: function () {
        wx.hideLoading()
        wx.showToast({
          title: '系统错误',
          icon: 'loading',
          duration: 1300
        })
      }
    });
  }
})