//app.js
import {
  getRequest,
  postRequest
} from './utils/HttpRequest';

const util = require('./utils/util');
App({
  onLaunch: function () {
    console.log('onLaunch');


    if (this.globalData.userId) {
      this.globalData.hasUserInfo = true;
    }

   
   

  },
  onLoad: function () {

  },
  onShow: function () {
    console.log('全局 onshow')
    // 登录
    if(wx.getStorageSync('userInfo')==""){
      this.loginAction().then(() => {
      console.log('全局 onshow', wx.getStorageSync('userInfo'));
      const saveInfo_url = `${util.baseUrl}saveInfo`;
      const getUserInfo_url = `${util.baseUrl}getUserInfo`;
      const userId = wx.getStorageSync('userId');
      const userInfo = wx.getStorageSync('userInfo');
      let saveInfo_params = {
        uid: userId,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
      };
      let getUserInfo_params = {
        user_id: userId,
      };

      postRequest(getUserInfo_url, getUserInfo_params).then(res => {
        const response = res.data;
        console.log("重新赋值头像的操作",response)

        if (
          response.info.avatar == '' ||
          response.info.avatar == 'null ' ||
          response.info.avatar == null
        ) {
          console.log('要 save 的 userinfo', userId);
          getRequest(saveInfo_url, saveInfo_params);
        }

      });

    });
    }
    

  },

  //登录的封装
  loginAction: function () {
    console.log('初始化授权');
    let _this = this;
    return new Promise((resolve, rejects) => {
      wx.login({
        success: function (login_res) {
          //console.log(res.code);
          if (login_res.code) {
            wx.request({
              url: 'https://ssl.zhaodaka.net/pengqu/token',
              data: {
                code: login_res.code,
              },
              success: function (result) {
                console.log('静默 login ', result);
                _this.globalData.userId = result.data.uid;
                wx.setStorageSync('userId', result.data.uid);
              },
            });
          } else {
            console.log('获取用户登录code失败！' + res.errMsg);
          }
        },
      });
      // 获取用户信息
      wx.getSetting({
        success: (setres) => {
          console.log('api.js获取用户信息',setres.authSetting['scope.userInfo']);
          if (setres.authSetting['scope.userInfo']) {
            console.log('已经授权');
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                _this.globalData.userInfo = res.userInfo;
                _this.globalData.userId = wx.getStorageSync('userId');
                _this.globalData.userName = res.userInfo.nickName;
                _this.globalData.userImage = res.userInfo.avatarUrl;
                wx.setStorageSync('userInfo', res.userInfo);
                let params = {
                    uid: wx.getStorageSync('userId'),
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl,
                }
                console.log("写入用户头像等信息",params)
                wx.request({
                  url: 'https://ssl.zhaodaka.net/pengqu/saveInfo',
                  data: params,
                  success: function (result1) {
                    resolve()
                  },
                });
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (_this.userInfoReadyCallback) {
                  _this.userInfoReadyCallback(res);
                }
              },
            });

          } else {
            console.log("未授权,跳转授权页面")
            //wx.reLaunch(OBJECT)
            //wx.redirectTo
            //wx.navigateTo(OBJECT)
            wx.navigateTo({
              url: '/pages/login/login',
            });
          }

        },
      });
    })


  },

  globalData: {
    userInfo: null,
    userId: null,
    userName: null,
    userImage: null,
    phoneNum: null,
  },
});