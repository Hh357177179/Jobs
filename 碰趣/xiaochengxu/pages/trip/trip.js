// pages/trip/trip.js
const util = require('../../utils/util.js')
import initCalendar from '../../template/calendar/index';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //活动数据
    pagedata: {},
    activestates: [],
 
 
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
   * 生命周期函数--监听页面隐藏
   */
  
 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
    
    // 初始化日历
    initCalendar()
    // this.setData({
    //   'calendar.monthIndex':0
    // })

    let today = util.dateFormat(new Date())
    //获取状态数据
    const monthIndex = this.data.monthIndex?this.data.monthIndex:0
    console.log(monthIndex)
    const year = this.data.calendar.termArr[monthIndex].year
    const month  = this.data.calendar.termArr[monthIndex].month
    this.getActiveState(year, month).then(() => {
      console.log("monthIndex",monthIndex)
      this.setActionState(monthIndex)

    })
    .then(() => {
      this.getTripActive(today)
      

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


  getTripActive: function (date) {
    let pd = []
    const today = util.dateFormat(new Date())
    pd.length = 0
    this.setData({
      pagedata: pd
    })
    wx.request({
      url: util.baseUrl + 'getByDate',
      method: 'GET',
      data: {
        date: date
      },
      success: res => {
        console.log(res.data)
        if (res.data.length != 0) {
          this.setData({
            pagedata: res.data
          })
        } else {
          if (today == date) {
            util.showMsg('今日期暂无活动')
          } else {
            util.showMsg('此日期暂无活动')
          }

        }
      },
      fail: res => {
        util.showMsg("网络错误")
      }
    })
  },


  // getAllActiveState: function () {

  //   let termArr = this.data.calendar.termArr

  //   wx.showLoading({
  //     title: '载入中...',
  //   })
  //   let step = 0
  //   let promiseArray = []
  //   // return new Promise((resolve, reject) => {

  //   //   let si = setInterval(() => {
  //   //     if (step == termArr.length) {
  //   //       wx.hideLoading()
  //   //       resolve()
  //   //       clearInterval(si)
  //   //       console.log("循环结束")
  //   //     }
  //   //     else {
  //   //         this.getActiveState(termArr[step].year, termArr[step].month)

  //   //     }
  //   //     // console.log(termArr[step].year, termArr[step].month)

  //   //     step++



  //   //   }, 200)





  //   return new Promise((resolve, reject) => {

  //     for (let i = 0; i < termArr.length; i++) {
  //       //console.log(i)
  //       let res = this.getActiveState(termArr[i].year, termArr[i].month)

  //       promiseArray.push(res)
  //     }
  //     let active = this.data.activestates

  //     Promise.all(promiseArray).then(function (resArr) {
  //       resArr.forEach((item, index) => {
  //         active.push(item)
  //         //console.log("执行数组赋值", item)
  //       })


  //     }).then(() => {
  //       // console.log("执行setdata赋值")
  //       wx.hideLoading()
  //       resolve(active)
  //       this.setData({
  //         activestates: active
  //       })
  //     })

  //   })

  //   // })

  // },



  getActiveState: function (year, month) {
    // wx.showLoading({
    //   title: '载入中...',
    // })
    let dateparam = year + "-" + month
    let active = this.data.activestates
    return new Promise((resole, reject) => {
      const uid =    wx.getStorageSync("userId")
      if(uid!=""){
         wx.request({
        url: util.baseUrl + "api/v2/activity/amount_in_month",
        method: "GET",
        data: {
          date: dateparam,
          uid: wx.getStorageSync("userId")
          //uid: 808
        },
        success: res => {

          // wx.hideLoading()
          resole(res.data)
          // active.push(res.data)
          this.setData({
            activestates: res.data
          })




        },
        fail: res => {
          reject(res)
          console.log("网络错误")
        }
      })
      }
     



    })



  },

  //设定活动显示状态
  setActionState: function (monthIndex) {
    let _this = this
    //====设定当天的显示状态
    let today = util.dateFormat(new Date())
    let year = today.split("-")[0]
    let month = today.split("-")[1]
    let day = today.split("-")[2]
    const termArr = this.data.calendar.termArr
    const currMonthdays = termArr[monthIndex].days

    const cyear = wx.getStorageSync('dateinfo').year
    const cmonth = wx.getStorageSync('dateinfo').month
    if (year == cyear && month == cmonth) {
      currMonthdays[day - 1].choosed = true;
    }
    //===================

    //设定有活动的数目和自己创建或者参与的活动在日历上的状态
    const active = this.data.activestates


    // termArr.forEach((item, index) => {

    for (let i = 0; i < termArr[monthIndex].days.length; i++) {
      termArr[monthIndex].days[i].flag = false


      active.forEach(function (dt, index) {
        //console.log(dt)
        let active_year = dt.date.split("-")[0]
        let active_month = dt.date.split("-")[1]
        let active_day = dt.date.split("-")[2]
        let tmpday = termArr[monthIndex].days[i].day < 10 ? tmpday = "0" + termArr[monthIndex].days[i].day : termArr[monthIndex].days[i].day
        let dayindex = i
        if (active_day == tmpday) {
          termArr[monthIndex].days[dayindex].num = dt.num
          //let cyear = _this.data.calendar.curYear
          //let cmonth = _this.data.calendar.curMonth
         
          

          //设定每月的flag状态
          if (active_year == cyear && active_month == cmonth) {
            termArr[monthIndex].days[dayindex].flag = dt.flag
          }
        }
      })



    }
    // })







    // for (let i = 0; i < days.length; i++) {
    //   days[i].flag = false
    //   this.data.activestates.forEach(function (dt, index) {
    //     let active_year = dt.date.split("-")[0]
    //     let active_month = dt.date.split("-")[1]
    //     let active_day = dt.date.split("-")[2]
    //     let tmpday = days[i].day<10 ? tmpday = "0" + days[i].day : days[i].day
    //     let dayindex = i
    //     if (active_day == tmpday) {
    //       days[dayindex].num = dt.num
    //       let cyear = _this.data.calendar.curYear
    //       let cmonth = _this.data.calendar.curMonth

    //       //设定当前月的flag状态
    //       if (active_year == cyear && active_month == cmonth){
    //         days[dayindex].flag = dt.flag
    //       }
    //     }
    //   })

    // }


    this.setData({
      'calendar.termArr': termArr,
    })
  },


  calendarTouch: function (e) {
    console.log(e.detail)

  }
})