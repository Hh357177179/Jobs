const myaudio = wx.createInnerAudioContext();
// const myVideo = wx.createVideoContext();
// pages/bookDetail/bookDetail.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
var timer = null;
var timers = null;
var page = undefined;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dmshow: false,
    danmuList: [],
    noVideo: false,
    doommData: [],
    arr: [],
    cpicshow: false,
    createPic: '',
    isplay: false,
    src: '',
    likeStatus: null,
    counts: 0,
    commentArr: [],
    allCommont: [],
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
    videoShow: false,
    freShow: false,
    bookId: '',
    bookDetail: {},
    imgArr:[],
    imgLength: '',
    currentIndex: 1,
    autoFocus: false,
    anonymous: '0'
  },
  

  showVideos () {
    let that = this
    that.setData({
      noVideo: false,
      videoShow: true
    })
    this.videoContext.play();
  },

  // pVideos () {
  //   let that = this
    
  // },

  audioPlay: function () {
    this.audioCtx.play()
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
    }, 1500)
    // console.log(1)
  },

  shareBtn() {
    // console.log(1)
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
      type: 2,
      project_id: that.data.bookId
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
      type: 2,
      project_id: that.data.bookId
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
  scrollBot() {
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
  plParise(e) {
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
  collectionSub() {
    let params = {
      token: app.globalData.openid,
      type: '2',
      project_id: this.data.bookId
    }
    postRequest('/user/collectionPublish', params, false).then(res => {
      util.showMsg(res)
      this.getallStatus()
    })
  },

  // 点赞
  likeSub() {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: '2',
      project_id: that.data.bookId
    }
    postRequest('/user/likePublish', params, false).then(res => {
      util.showMsg(res)
      that.getallStatus()
    })
  },

  // 获取项目评论列表
  getCommentList() {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: '2',
      project_id: that.data.bookId,
      page: that.data.page,
      pagesize: that.data.pagesize,
      is_all: that.data.isAll
    }
    // console.log(params)
    postRequest('/user/commentList', params, true).then(res => {
      console.log(123213,res)
      if (that.data.isAll == '1') {
        let dmArr = new Array()
        for (var i = 0, len = res.length; i < len; i++) {
          // console.log(res[i])
          dmArr.push({
            text: res[i],
            time: i + 2,
            color: getRandomColor()
          })
        }
        console.log('视频弹幕', dmArr)
        that.setData({
          allCommont: res,
          danmuList: dmArr
        })
        that.autoLoad();
        console.log('弹幕', res)
      } else {
        that.setData({
          commentArr: that.data.commentArr.concat(res.list),
          counts: res.count,
          // likeStatus
        })
        console.log('评论列表', res.list)
      }
    })
  },

  // 获取各种状态
  getallStatus() {
    let that = this
    let params = {
      token: app.globalData.openid,
      type: '2',
      project_id: that.data.bookId
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

  // 查看评论
  checkCom() {
    let that = this
    that.setData({
      commentShow: true,
      maskShow: true,
      isAll: '0',
      page: 1,
      commentArr: []
    })
    if (that.data.bookDetail.video != '') {
      that.setData({
        noVideo: true,
        videoShow: false
      })
      this.videoContext.pause();
    }
    that.getCommentList()
  },

  // 实名-匿名
  switchChange(e) {
    let that = this
    console.log(e.detail.value)
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

  // 访问记录
  addLog() {
    let that = this
    wx.request({
      url: `${util.baseUrl}/user/addBrowseLog`,
      data: {
        token: app.globalData.openid,
        type: '2',
        project_id: that.data.bookId
      },
      method: 'POST',
      success: res => {
        // console.log(res)
        console.log('访问一次了')
      }
    })
  },

  // 切换图片
  changeCurrent (e) {
    let that = this
    if (that.data.currentIndex <= that.data.imgLength) {
      that.setData({
        currentIndex: e.detail.current += 1
      })
    } else {
      that.setData({
        currentIndex: e.detail.current -= 1
      })
    }
  },

  // 获取书籍详情
  getBook () {
    wx.showLoading({
      title: 'loading...',
    })
    let that = this
    wx.request({
      url: `${util.baseUrl}/book/detail`,
      data: {
        book_id: that.data.bookId
      },
      metho: "POST",
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          wx.hideLoading()
          if (res.data.data.audio != '') {
            that.setData({
              freShow: true,
            })
            myaudio.src = res.data.data.audio
          }
          console.log(123,myaudio.src)
          if (res.data.data.video != '') {
            that.setData({
              videoShow: false,
              dmshow: false,
              noVideo: true
            })
          } else {
            that.setData({
              dmshow: true
            })
          }
          // console.log(res.data.data.content)
          let arrPic = res.data.data.content.split('|')
          let imgNum = arrPic.length
          that.setData({
            bookDetail: res.data.data,
            imgArr: arrPic,
            imgLength: imgNum
          })
          that.addLog()
        } else {
          wx.hideLoading()
          util.showMsg(res.data.msg)
        }
      },
      fail(){
        wx.hideLoading()
        util.showMsg('网络错误请重试')
      }
    })
  },

  advtextVal(e) {
    // console.log(e.detail.value)
    let that = this
    that.setData({
      textVal: e.detail.value
    })
  },

  subSend() {
    let that = this
    if (that.data.textVal == '') {
      util.showMsg('请填写评论内容！')
    } else {
      let params = {
        token: app.globalData.openid,
        type: '2',
        project_id: that.data.bookId,
        content: that.data.textVal,
        is_anonymous: that.data.anonymous
      }
      // console.log(params)
      postRequest('/user/commentPublish', params, false).then(res => {
        that.go(that.data.textVal)
        console.log(res)
        util.showMsg('评论成功！')
        that.setData({
          sendShow: false,
          maskShow: false,
          textVal: ''
        })
        that.getallStatus()
      })
    }
  },

  clickMask() {
    let that = this
    that.setData({
      sendShow: false,
      maskShow: false,
      commentShow: false,
      shareCardShow: false
    })
  },

  // 发送评论
  sendStr() {
    let that = this
    that.setData({
      sendShow: true,
      autoFocus: true,
      maskShow: true,
      shareCardShow: false,
    })
    if (that.data.bookDetail.video != '') {
      that.setData({
        noVideo: true,
        videoShow: false
      })
      this.videoContext.pause();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    let that = this
    let bookid = options.id
    that.setData({
      bookId: bookid
    })
    that.getBook()
    that.getCommentList()
    that.getallStatus()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createInnerAudioContext('myAudio')
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  play: function () {
    myaudio.play();
    console.log(myaudio.duration);
    this.setData({ isplay: true });
  },
  // 停止
  stop: function () {
    myaudio.pause();
    this.setData({ isplay: false });
  },

  go: function (str) {
    doommList.push(new Doomm(str, Math.floor(Math.random() * (60 - 1 + 1) + 1), Math.ceil(20), getRandomColor()));
    this.setData({
      doommData: doommList
    })
    console.log(this.data.doommData)
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
  onShareAppMessage: function (res) {
    return {
      title: '资料库',
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
    // }, this.time * 3000)//定时器动画完成后执行。
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