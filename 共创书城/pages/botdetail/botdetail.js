// pages/botdetail/botdetail.js
const util = require('../../utils/util.js')
import { postRequest } from '../../utils/httpRequest.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareCardShow: false,
    cpicshow: false,
    createPic: '',
    pro_id: '',
    detailObj: {},
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
    autoFocus: false,
    anonymous: '0'
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
      type: 3,
      project_id: that.data.pro_id
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
      type: 3,
      project_id: that.data.pro_id
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

  // 获取详情
  getDetail () {
    let params = {
      project_id: this.data.pro_id
    }
    postRequest('/user/projectDetail', params, true).then(res => {
      // console.log(res)
      this.setData({
        detailObj: res
      })
      this.addLog()
    })
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
      type: '3',
      project_id: this.data.pro_id
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
      type: '3',
      project_id: that.data.pro_id
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
      type: '3',
      project_id: that.data.pro_id,
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
      type: '3',
      project_id: that.data.pro_id
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
    that.getCommentList()
  },

  // 实名-匿名
  switchChange(e) {
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

  // 访问记录
  addLog() {
    let that = this
    wx.request({
      url: `${util.baseUrl}/user/addBrowseLog`,
      data: {
        token: app.globalData.openid,
        type: '3',
        project_id: that.data.pro_id
      },
      method: 'POST',
      success: res => {
        // console.log(res)
        console.log('访问一次了')
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
        type: '3',
        project_id: that.data.pro_id,
        content: that.data.textVal,
        is_anonymous: that.data.anonymous
      }
      // console.log(params)
      postRequest('/user/commentPublish', params, true).then(res => {
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
      anonymous: '0'
    })
    console.log(that.data.anonymous)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    if (options.sid) {
      that.setData({
        pro_id: options.sid
      })
      that.getDetail()
      that.getallStatus()
    }
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
    onShareAppMessage: function (options) {
    // console.log(res)
    // if (options.from === 'button') {
    //   // 来自页面内转发按钮
    //   // console.log(res.target)
    // }
    return {
      title: '项目详情',
      success: res => {
        console.log(res)
        if (res.errMsg == 'shareAppMessage:ok') {
          this.shareProject()
          this.getallStatus()
        }
      }
    }
  }
})