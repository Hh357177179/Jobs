const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchDot: 0,
    endDot: 0,
    date: '',
    calendarShow: false,
    teacher: '',
    create_time: '',
    title: '',
    actionNum: '',
    yearN: '',
    monthN: '',
    dayN: '',
    imgArr:[],
    indicatorDots: true,
    currents: 0,
    duration: 200,
    demo5_days_style: [],
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    dayArr: []
  },

  // 点击搜索
  searchBtn: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  searchInputBtn: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 点击弹出日历
  showCalendar: function() {
    this.setData({
      dayArr: [],
      calendarShow: true
    })
    this.getEvery(this.data.yearN, this.data.monthN)
  },

  // 下月
  next: function(event) {
    // console.log(event.detail);
    this.setData({
      dayArr: []
    })
    this.getEvery(event.detail.currentYear, event.detail.currentMonth)
  },

  // 上月
  prev: function(event) {
    this.setData({
      dayArr: []
    })
    // console.log(event.detail);
    this.getEvery(event.detail.currentYear, event.detail.currentMonth)
  },

  // 点击日历标题选择
  dateChange: function(event) {
    this.setData({
      dayArr: []
    })
    // console.log(event.detail);
    this.getEvery(event.detail.currentYear, event.detail.currentMonth)
  },

  // 点击日历天数
  dayClick: function(event) {
    console.log(event.detail);
    this.setData({
      dayArr: [],
      create_time: `${event.detail.year}/${event.detail.month}/${event.detail.day}`
    })
    this.getTjList()
  },
  
  // 获取每月带有图解的日期
  getEvery: function(ey,em) {
    let that = this
    that.setData({
      dayArr: []
    })
    wx.request({
      url: `${util.baseUrl}/api/tujie/calendar`,
      data: {
        year: ey,
        month: em,
      },
      success: res => {
        const resDay = res.data.data
        var dayA = []
        if (res.data.code == 200) {
          for (var a = 0; a < resDay.length; a++) {
            let strDate = resDay[a].create_time
            let strDay = strDate.substr(strDate.length - 2)
            dayA.push(strDay)
          }
          that.setData({
            dayArr: dayA
          })
          this.setCalendar()
        }
      }
    })
  },

  // 点击关闭日历
  clickClose: function() {
    this.setData({
      dayArr: [],
      calendarShow: false
    })
  },

  // 手势事件开始
  touchStart: function(e) {
    // console.log(e)
    let _this = this
    _this.setData({
      touchDot: e.changedTouches[0].pageY
    })
  },

  // 手势事件结束
  touchEnd: function(e) {
    // console.log('end', e)
    let _this = this
    _this.setData({
      endDot: e.changedTouches[0].pageY
    })
    if (this.data.touchDot - this.data.endDot > 100) {
      console.log('上滑动')
      // 上滑
      _this.setData({
        actionNum: 1,
        currents: 0
      })
      _this.getPageOnly()
      console.log('上', _this.data.imgArr)
    } else if (this.data.endDot - this.data.touchDot > 100) {
      console.log('下滑动')
      // 下滑
      _this.setData({
        actionNum: -1,
        currents: 0
      })
      _this.getPageOnly()
    }
  },

  // 翻页
  getPageOnly: function() {
    let that = this
    wx.request({
      url: `${util.baseUrl}/api/tujie/turnPage`,
      data: {
        current: that.data.create_time,
        action: that.data.actionNum,
      },
      success: res => {
        const response = res.data.data
        // console.log(response)
        if (res.data.code == 200) {
          if (response == null || response == 'null' || response == '') {
            wx.showToast({
              title: '没有更多图解啦！',
              icon: 'none'
            })
          } else {
            let imgA = []
            // if (response.image.indexOf('|')) {
              let picList = response.image.split('|')
              for (var i = 0; i < picList.length; i++) {
                // console.log(picList[i])
                imgA.push({
                  image: picList[i]
                })
              }
              that.setData({
                imgArr: imgA,
                create_time: response.create_time
              })
              console.log(that.data.imgArr)
            // } 
          }
        }
      }
    })
  },

  // 日历查询
  getCalendar: function () {
    let that = this
    wx.request({
      url: `${util.baseUrl}/api/tujie/calendar`,
      data: {
        year: that.data.yearN,
        month: that.data.monthN,
      },
      success: res => {
        const response = res.data.data
        console.log(123,response)
        if (res.data.code == 200) {
          let resList = response[response.length - 1]
          that.setData({
            create_time: resList.create_time,
          })
          this.getTjList()
        }
      }
    })
  },

  // 获取消息
  getTjList: function() {
    let _that = this
    // wx.showToast({
    //   title: '正在加载...',
    //   icon: 'loading',
    //   duration: 10000,
    // })
    wx.request({
      url: `${util.baseUrl}/api/tujie/index`,
      data: {
        date: _that.data.create_time
      },
      success: res => {
        const response = res.data.data
        if (res.data.code == 200) {
          // wx.hideToast()
          if (response == null || response == 'null' || response == '') {
            wx.showToast({
              title: '该日无图解！',
              icon: 'none'
            })
          } else {
            let imgA = []
            // if (response.image.indexOf('|')) {
              let picList = response.image.split('|')
              for (var i = 0; i < picList.length; i++) {
                // console.log(picList[i])
                imgA.push({
                  image: picList[i]
                })
              }
              _that.setData({
                imgArr: imgA,
                create_time: response.create_time,
                calendarShow: false
              })
            // }
          }
        }
      }
    })
  },

  // 渲染日历
  setCalendar: function() {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo5_days_style = new Array;
    // for (let i = 1; i <= days_count; i++) {
    //   const date = new Date(this.data.year, this.data.month - 1, i);
    // }
    // console.log('看这里', this.data.dayArr)
    for (var d = 0; d < this.data.dayArr.length; d++) {
      demo5_days_style.push({ month: 'current', day: this.data.dayArr[d], color: 'white', background: '#84e7d0' });
    }
    this.setData({
      demo5_days_style
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      // 获取当前日期
    let initDate = new Date()
    let iYear = initDate.getFullYear()
    let iMonth = initDate.getMonth() + 1
    let iDay = initDate.getDate()
    let _this = this

    _this.setData({
      yearN: iYear,
      monthN: iMonth
    })

    if (options.createTime) {
      console.log(options.createTime)
      let detailDate = new Date(options.createTime)
      this.setData({
        create_time: `${detailDate.getFullYear()}/${detailDate.getMonth() + 1}/${detailDate.getDate()}`,
      })
      this.getTjList()
    } else {
      this.getCalendar()
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '沐新图解创业',
      path: 'pages/index/index?createTime=' + this.data.create_time,
      success: res => {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 1000,
        })
      },
      fail: res => {
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 1000,
        })
      }
    }
  }
})