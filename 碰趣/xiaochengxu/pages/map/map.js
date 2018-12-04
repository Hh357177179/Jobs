// pages/map/map.js
const util = require('../../utils/util.js')
Page({
  data: {
    lon: "",
    lat: "",


    markers: [

    ],
    // controls: [{
    //   id: 1,
    //   iconPath: '../../images/chuangjian.png',
    //   position: {
    //     left: 0,
    //     top: 0,
    //     width: 40,
    //     height: 40
    //   },
    //   clickable: true
    // }]

  },
  onShareAppMessage: function (e) {
    if (e.from === 'button') {
    }
    return {
      title: '让旅行有意思，自由发起或参与',
      path: '/pages/map/map',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  onLoad: function (e) {
    
    let createBtn = this.data.controls
  
    wx.getSystemInfo({
      success: function(res) {
      //  createBtn[0].position.left = res.windowWidth - 50
      //  createBtn[0].position.top = res.windowHeight - 50
      },
    })

    this.setData({
     // controls: createBtn
    })

    // this.mapCtx = wx.createMapContext('myMap')
    // this.getCurrLocation()
    //     .then(()=>{
    //       this.getActivityDate()
    //     })
    
  },
  /**
   * 生命周期函数--监听页面显示刷新
   */
  onShow: function (options) {
    this.mapCtx = wx.createMapContext('myMap')
    this.getCurrLocation().then(() => {
        this.getActivityDate()
      })
  },
  onReady: function (e) {

  },
  showDetails: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/active/active?id='+e.markerId,
    })
  },
  getActivityDate: function () {



    //发起请求
    wx.request({
      url: "https://ssl.zhaodaka.net/pengqu/api/v2/activity/get_today",
      data: {
        latitude: this.data.lat,
        longitude: this.data.lon
      },

      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        let marks = []
        for (let rd in res.data) {
          let mark = {}
          mark.id = res.data[rd].id

          mark.latitude = res.data[rd].latitude
          mark.longitude = res.data[rd].longitude
          mark.iconPath = "../../images/location.png"
          mark.width = 55
          mark.height = 53
          mark.callout = {}

          mark.callout.content =  res.data[rd].str
          mark.callout.fontSize = 9
          mark.callout.padding = 7
          mark.callout.color = "#ffffff"
          mark.callout.display = "ALWAYS"
          mark.callout.textAlign = "center"
          mark.callout.bgColor = "#333333"
          // mark.label = {}
          // mark.label.content = 
          // mark.label.color = '#000'
          // mark.label.fontSize = '9'
          // mark.label.borderRadius = 2
          // mark.label.bgColor = "#fff"
          // mark.label.textAlign = "center"
          // mark.label.x = -48
          // mark.label.y = 25


          marks.push(mark)
        }
        // console.log(marks)

        this.setData({
          markers: marks
        })

      },
      fail: function () {
        //失败后的逻辑
      },
    })
  },

  getCurrLocation: function () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          console.log(res)
          let latitude = res.latitude
          let longitude = res.longitude
          let speed = res.speed
          let accuracy = res.accuracy
          this.setData({
            lat: res.latitude,
            lon: res.longitude
          })
          resolve(res)


        },
        fail:res=>{
          reject()
        }
      })


    })

  },
  goCreate:function(){
    wx.navigateTo({
      url: '../create/create?title=create',
    })
  }

})
