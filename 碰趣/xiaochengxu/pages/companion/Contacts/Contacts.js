// pages/companion/Contacts/Contacts.js
const util = require('../../../utils/util')
import { postRequest }  from '../../../utils/HttpRequest'
let getTalk
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talkinfo: [],
    myuser_id: wx.getStorageSync('userId'),
    receivermsg_id:'',
    input_msg:'',
    initID:{},
    scrollTop:0
  },
  tapMove(e){
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     /**
     * sender_id    发送者
     * receiver_id  接受者  
     */
    const sender_id = options.sender_id
    const receiver_id = options.receiver_id
    const initID = {
      sender_id :sender_id,
      receiver_id:receiver_id
    }
    this.getTalkInfo(sender_id,receiver_id)
    this.setData({
      receivermsg_id:sender_id,
      initID:initID
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
    const initID = this.data.initID
    getTalk = setInterval(()=>{
      this.getTalkInfo(initID.sender_id,initID.receiver_id)
    },1000)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     clearInterval(getTalk)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(getTalk)
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
  getTalkInfo:function(sender_id,receiver_id){
    /**
     * sender_id    发送者
     * receiver_id  接受者  
     */
    const submit_url = `${util.baseUrl}/getTalkInfo`
    
    let parmas = {
      sender_id:sender_id,
      receiver_id:receiver_id,
    }
    postRequest(submit_url,parmas).then(res=>{
      const response = res.data
      let  scrollTop = 0
      if(response.info.length!=0){
        scrollTop = response.info.length*200
      }
      

      this.setData({
        talkinfo: response.info,
        scrollTop:scrollTop
      })
    })
  },
  addTalk:function(e){
    const submit_url = `${util.baseUrl}/addTalk`
    const receivermsg_id = this.data.receivermsg_id
    const message = e.detail.value.message
    let parmas = {
      sender_id:wx.getStorageSync('userId'),
      receiver_id:receivermsg_id,
      message:message
    }
    console.log("parmas",parmas)
    postRequest(submit_url,parmas).then(res=>{
      // this.getTalkInfo(receivermsg_id,parmas.sender_id)
      
       this.setData({
        input_msg:''
   
       })
    })
  }

})