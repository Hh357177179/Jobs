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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLogs()
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
    this.getLogs()
  },
  getLogs() {
    if (this.data.noMore) return; 
    const page = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://wechatsign.zhaodaka.net/api/getTransferLogs',
      data: {
        uid: app.user.Id,
        page: page.data.page,
        pageSize: page.data.pageSize
      },
      methods: 'GET',
      success: function (res) {
        wx.hideLoading()
        if (res && res.data && res.data.code === 0) {
          if (page.data.page * page.data.pageSize >= res.data.data.total) {
            page.setData({
              noMore: true
            });
          }
          const data = res.data.data && res.data.data.list
          const list = []
          data.forEach((item, index) => {
            const time = new Date(item.create_time * 1000)
            const month = time.getMonth() + 1
            const date = time.getDate()
            const year = time.getFullYear()
            const count = list.findIndex(l => l.month === month && l.date === date && l.year === year);
            console.log(count)
            if (count > -1) {
              list[count].children.push({
                remark: item.remark,
                hour: page.formatNumber(time.getHours()),
                minute: page.formatNumber(time.getMinutes()),
                to_name: item.to_name,
                from_name: item.from_name,
                money: item.money / 1000
              })
            } else {
              const obj = {}
              obj.month = month
              obj.year = year
              obj.date = date
              obj.children = []
              obj.children.push({
                remark: item.remark,
                hour: page.formatNumber(time.getHours()),
                minute: page.formatNumber(time.getMinutes()),
                to_name: item.to_name,
                from_name: item.from_name,
                money: item.money / 1000
              })
              list.push(obj) 
            }
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
      error: function() {
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