// pages/picHome/picHome.js
var page = undefined;
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
var timer = null;
var timers = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainShow: true,
    textShow: false,
    noTextShow: false,
    doommData: [],
    arr:[],
    shareCardShow: false,
    cpicshow: false,
    createPic: '',
    likeStatus: null,
    counts: 0,
    commentArr: [],
    allCommont:[],
    isAll: '1',
    page: 1,
    pagesize: 10,
    collection: {},
    comment: {},
    like: {},
    share: {},
    commentShow: false,
    textVal: '',
    maskShow: false,
    sendShow: false,
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
    imgObj: '' ,
    indicatorDots: true,
    currents: 0,
    demo5_days_style: [],
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    dayArr: [],
    sortNum: 0,
    actionNum: 0,
    date: '',
    ids: '',
    autoFocus: false,
    anonymous: '0',
  },

  autoLoad: function () {
    var that = this;
    timer = setTimeout(function () {
      var arr = that.data.allCommont;
      var str = arr.shift();
      if (str) {
        that.setData({
          arr: arr
        })
        that.go(str)
        that.autoLoad()
      }
    }, 2000)
    // console.log(1)
  },

  shareBtn() {
    console.log(1)
    let that = this
    that.setData({
      shareCardShow: true,
      maskShow: true,
    })
  },

  // 分享项目
  shareProject() {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: 1,
      project_id: that.data.ids
    }
    postRequest('/user/sharePublish', params, false).then(res => {
      console.log(res)
    })
  },

  // 保存图片
  saveLocal() {
    wx.downloadFile({
      url: this.data.createPic,
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: result => {
              console.log(result)
              if (result.errMsg == 'saveImageToPhotosAlbum:ok') {
                util.showMsg('保存成功!')
                this.shareProject()
                this.getallStatus()
                this.setData({
                  cpicshow: false,
                  maskShow: false,
                  shareCardShow: false
                })
              } else {
                util.showMsg('保存失败!')
              }
            },
            fail: err => {
              console.log(err)
              if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                console.log(res.tempFilePath)
                wx.openSetting({
                  success: settingdata => {
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册")
                    } else {
                      console.log("获取权限失败")
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  // 生成图片
  createPic() {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: 1,
      project_id: that.data.ids
    }
    postRequest('/user/getMiniCode', params, true).then(res => {
      postRequest('/user/makeShareImage', params, true).then(res => {
        console.log(res)
        that.setData({
          createPic: res,
          cpicshow: true
        })
      })
    })
  },

  // 关闭
  closePic() {
    let that = this
    that.setData({
      cpicshow: false,
      shareCardShow: false,
      maskShow: false,
    })
  },

  // 滚动到底部
  scrollBot () {
    let that = this
    // console.log(1)
    if (that.data.page * that.data.pagesize < that.data.counts) {
      that.setData({
        page: that.data.page += 1
      })
      that.getCommentList()
    } else {
      util.showMsg('无更多数据')
    }
  },

  // 单条评论点赞
  plParise (e) {
    console.log(e)
    let that = this
    let indexs = e.currentTarget.dataset.index
    let numc = 'commentArr[' + indexs + '].like_num';
    let status = 'commentArr[' + indexs + '].is_like';
    let comid = e.currentTarget.dataset.id
    let likeStatus = e.currentTarget.dataset.status
    let num = e.currentTarget.dataset.num
    let params = {
      token: app.globalData.openid,
      comment_id: comid,
    }
    if (likeStatus == true) {
      that.setData({
        [numc]: num - 1,
        [status]: false
      })
    } else {
      that.setData({
        [numc]: num + 1,
        [status]: true
      })
    }
    postRequest('/user/commetLikePublish', params, false).then(res => {
      console.log(res)
      util.showMsg(res)
    })
  },

  // 收藏
  collectionSub () {
    let params = {
      token: app.globalData.openid,
      type: '1',
      project_id: this.data.ids
    }
    postRequest('/user/collectionPublish', params, false).then(res => {
      util.showMsg(res)
      this.getallStatus()
    })
  },

  // 点赞
  likeSub () {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: '1',
      project_id: that.data.ids
    }
    postRequest('/user/likePublish', params, false).then(res => {
      util.showMsg(res)
      that.getallStatus()
    })
  },
  // 获取项目评论列表
  getCommentList () {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: '1',
      project_id: that.data.ids,
      page: that.data.page,
      pagesize: that.data.pagesize,
      is_all: that.data.isAll
    }
    // console.log(params)
    postRequest('/user/commentList', params, true).then(res => {
      // console.log(res)
      if (that.data.isAll == '1') {
        that.setData({
          allCommont: res
        })
        this.autoLoad();
        console.log('弹幕',res)
      } else {
        if (res.list.length == 0) {
          that.setData({
            noTextShow: true
          })
        }
        for (var i = 0, len = res.list.length; i < len; i++) {
          if (res.list[i].is_anonymous == 1) {
            // console.log(res.list[i])
            var num = "";
            for (var x = 0; x < 4; x++) {
              num += Math.floor(Math.random() * 10)
            }
            res.list[i].names = '共创城居民' + num
          }
        }
        that.setData({
          commentArr: that.data.commentArr.concat(res.list),
          counts: res.count,
          // likeStatus
        })
        console.log('1评论列表',res.list)
      }
    })
  },

  // 获取各种状态
  getallStatus () {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: '1',
      project_id: that.data.ids
    }
    postRequest('/user/allStatus', params, false).then(res => {
      console.log(res)
      that.setData({
        collection: res.collection,
        comment: res.comment,
        like: res.like,
        share: res.share
      })
    })
  },

  // 添加访问记录
  addLog () {
    let that = this
    wx.request({
      url: `${util.baseUrl}/user/addBrowseLog`,
      data: {
        token: app.globalData.openid,
        type: '1',
        project_id: that.data.ids
      },
      method: 'POST',
      success: res => {
        // console.log(res)
        console.log('访问一次了')
      }
    })
  },

  // 查看评论
  checkCom () {
    let that = this
    that.setData({
      noTextShow: false,
      commentShow: true,
      maskShow: true,
      isAll: '0',
      page: 1,
      commentArr: []
    })
    that.getCommentList()
  },
  
  // 实名-匿名
  switchChange(e) {
    console.log(e)
    let that = this
    if (e.detail.value == true) {
      that.setData({
        anonymous: '1'
      })
    } else {
      that.setData({
        anonymous: '0'
      })
    }
  },

  // 获取默认图解
  getIndexPic() {
    let params = {}
    postRequest('/tujie/index', params, true).then(res => {
      this.setData({
        sortNum: res.sort,
        imgObj: res.image,
        ids: res.id,
      })
      this.addLog()
      this.getallStatus()
      this.getCommentList()
    })
  },

  // 翻页
  pageTurning () {
    clearTimeout(timer)
    clearTimeout(timers)
    let that = this
    that.setData({
      allCommont: [],
      commentArr: [],
      doommData: [],
      arr: []
    })
    doommList = []
    let params = {
      sort: that.data.sortNum,
      action: that.data.actionNum
    }
    postRequest('/tujie/turnPageBySort', params, false).then(res => {
      if (res == null || res == 'null' || res == '') {
        util.showMsg('没有更多图解啦！')
      } else {
        that.setData({
          sortNum: res.sort,
          imgObj: res.image,
          ids: res.id,
          isAll: '1'
        })
        that.addLog()
        that.getallStatus()
        that.getCommentList()
      }
    })
  },

  // 点击搜索
  searchBtn: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  searchInputBtn: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 点击弹出日历
  showCalendar: function () {
    this.setData({
      dayArr: [],
      calendarShow: true
    })
    this.getEvery(this.data.yearN, this.data.monthN)
  },

  // 下月
  next: function (event) {
    // console.log(event.detail);
    this.setData({
      dayArr: []
    })
    this.getEvery(event.detail.currentYear, event.detail.currentMonth)
  },

  // 上月
  prev: function (event) {
    this.setData({
      dayArr: []
    })
    this.getEvery(event.detail.currentYear, event.detail.currentMonth)
  },

  // 点击日历标题选择
  dateChange: function (event) {
    this.setData({
      dayArr: []
    })
    // console.log(event.detail);
    this.getEvery(event.detail.currentYear, event.detail.currentMonth)
  },

  // 点击日历天数
  dayClick: function (event) {
    // console.log(event.detail);
    this.setData({
      dayArr: [],
      date: `${event.detail.year}/${event.detail.month}/${event.detail.day}`,
      calendarShow: false
    })
    wx.navigateTo({
      url: '/pages/calenderMore/calenderMore?date=' + this.data.date,
    })
  },

  // 获取每月带有图解的日期
  getEvery: function (ey, em) {
    let that = this
    that.setData({
      dayArr: []
    })
    wx.request({
      url: `${util.baseUrl}/tujie/calendar`,
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
  clickClose: function () {
    this.setData({
      dayArr: [],
      calendarShow: false
    })
  },

  // 手势事件开始
  touchStart: function (e) {
    // console.log(e)
    let _this = this
    _this.setData({
      touchDot: e.changedTouches[0].pageY
    })
  },

  // 手势事件结束
  touchEnd: function (e) {
    let _this = this
    _this.setData({
      endDot: e.changedTouches[0].pageY
    })
    if (this.data.touchDot - this.data.endDot > 50) {
      // console.log('上滑动')
      // 上滑
      _this.setData({
        actionNum: 1
      })
      _this.pageTurning()
    } else if (this.data.endDot - this.data.touchDot > 50) {
      // console.log('下滑动')
      _this.setData({
        actionNum: -1
      })
      _this.pageTurning()
    }
  },

  // 渲染日历
  setCalendar: function () {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo5_days_style = new Array;
    for (var d = 0; d < this.data.dayArr.length; d++) {
      demo5_days_style.push({ month: 'current', day: this.data.dayArr[d], color: 'white', background: '#84e7d0' });
    }
    this.setData({
      demo5_days_style
    });

  },

  // 获取某一天图解
  getOnlyPic () {
    let that = this
    clearTimeout(timer)
    clearTimeout(timers)
    that.setData({
      allCommont: [],
      commentArr: [],
      doommData: [],
      arr: []
    })
    doommList = []
    let params = {
      id: that.data.ids
    }
    postRequest('/tujie/detail', params, true).then(res => {
      console.log(res)
      if (res == null) {
        that.setData({
          textShow: true,
          mainShow: false
        })
      } else {
        that.setData({
          textShow: false,
          mainShow: true,
          sortNum: res.sort,
          imgObj: res.image,
          ids: res.id,
          isAll: '1'
        })
      }
      that.addLog()
      that.getallStatus()
      that.getCommentList()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    var that = this;
    app.globalData.picId = null
    // 获取当前日期
    let initDate = new Date()
    let iYear = initDate.getFullYear()
    let iMonth = initDate.getMonth() + 1
    let iDay = initDate.getDate()
    // let id = options.id
    let _this = this
    _this.setData({
      yearN: iYear,
      monthN: iMonth
    })
    let picIds = options.pids
    if (picIds) {
      _this.setData({
        ids: picIds
      })
      _this.getOnlyPic()
    } else {
      _this.getIndexPic()
    }
  },

  advtextVal (e) {
    // console.log(e.detail.value)
    let that = this
    that.setData({
      textVal: e.detail.value
    })
  },

  subSend () {
    let that = this
    if (that.data.textVal == '') {
      util.showMsg('请填写评论内容！')
    } else {
      let params = {
        token: app.globalData.openid,
        type: 1,
        project_id: that.data.ids,
        content: that.data.textVal,
        is_anonymous: that.data.anonymous
      }
      console.log(params)
      postRequest('/user/commentPublish', params, false).then(res => {
        console.log(res)
        util.showMsg('评论成功！')
        that.go(that.data.textVal)
        that.setData({
          sendShow: false,
          maskShow: false,
          textVal: '',
        })
        that.getallStatus()
      })
    }
  },

  clickMask () {
    let that = this
    that.setData({
      sendShow: false,
      maskShow: false,
      commentShow: false,
      shareCardShow: false
    })
  },

  // 发送评论
  sendStr () {
    let that = this
    that.setData({
      sendShow: true,
      autoFocus: true,
      maskShow: true,
      anonymous: '0'
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
    if (!app.globalData.openid) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      console.log(1)
      let that = this
      if (app.globalData.picId != null) {
        that.setData({
          ids: app.globalData.picId
        })
        that.getOnlyPic()
      }
    }
  },

  go: function (str) {
    doommList.push(new Doomm(str, Math.floor(Math.random() * (60 - 1 + 1) + 1), Math.ceil(25), getRandomColor()));
    this.setData({
      doommData: doommList
    })
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
    clearTimeout(timer)
    let that = this
    that.setData({
      allCommont: [],
      commentArr: [],
      doommData: [],
      arr: []
    })
    doommList = []
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

  // 分享
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      path: 'pages/picHome/picHome?pids=' + this.data.ids,
      console.log('来自页面内转发按钮')
      this.shareProject()
      this.getallStatus()
      this.setData({
        shareCardShow: false,
        maskShow: false
      })
    }
    return {
      title: '图解',
      path: 'pages/picHome/picHome?pids=' + this.data.ids,
      success: res => {
        if (res.errMsg == 'shareAppMessage:ok') {
          this.shareProject()
          this.getallStatus()
        }
      }
    }
  }
})
var doommList = [];
var i = 0;//用做唯一的wx:key
class Doomm {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    // timers = setTimeout(function () {
    //   doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
    //   page.setData({
    //     doommData: doommList
    //   })
    // }, this.time * 1000000)//定时器动画完成后执行。
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}