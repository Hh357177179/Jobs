// pages/companion/Playmate/Playmate.js
const util = require ('../../../utils/util');
import {postRequest} from '../../../utils/HttpRequest';

Page ({
  /**
   * 页面的初始数据
   */
  data: {
    signList: [],
    hotList: [],
    hostlimit: 10,
    mylongitude: '',
    mylatitude: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSignList ();
    this.getHotList ();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  getSignList: function () {
    const submit_url = `${util.baseUrl}/getSignList`;
    let parmas = {
      user_id: wx.getStorageSync ('userId'),
      // limit:
    };
    postRequest (submit_url, parmas, true).then (res => {
      const response = res.data;
      this.setData ({
        signList: response.info,
      });
    });
  },
  getHotList: function () {
    const submit_url = `${util.baseUrl}/getHotList`;
    const limit = this.data.hostlimit;
    let parmas = {
      user_id: wx.getStorageSync ('userId'),
      limit: limit,
    };
    postRequest (submit_url, parmas, true).then (res => {
      const response = res.data;
      this.setData ({
        hotList: response.info,
      });
    });
  },
  cancelSignin: function (e) {
    const submit_url = `${util.baseUrl}/cancelSignin`;
    const signId = e.currentTarget.dataset.id;
    const parmas = {
      user_id: wx.getStorageSync ('userId'),
      id: signId,
    };
    postRequest (submit_url, parmas).then (() => {
      util.showMsg ('取消成功');
      this.getSignList ();
    });
  },

  //../PlaymateList/PlaymateList?latitude={{item.latitude}}&longitude={{item.longitude}}
  goPlaymeteList:function(e){
    const longitude =  e.currentTarget.dataset.longitude
    const latitude = e.currentTarget.dataset.latitude
    const position = {
      longitude:longitude,
      latitude:latitude
    }
    wx.setStorageSync('position',position)
    wx.switchTab({
      url: '/pages/companion/PlaymateList/PlaymateList'
    })
  }
});
