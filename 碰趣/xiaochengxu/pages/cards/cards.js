// pages/cards/cards.js
var app = getApp();
var image_path = new Array()
Page({
  data: {
    image: [],
    img_button: 'inline-block'
  },
  
  bindfunction () {
    var that = this;
    var image = this.data.image;
    if (this.data.image.length < 3) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.uploadFile({
            url: 'https://ssl.zhaodaka.net/pengqu/uploadimg',//这个方法就是后台处理上传的方法
            filePath: res.tempFilePaths[0], //获取到上传的图片
            name: 'file',
            success: function (info) {
              image_path.push(info.data);
              console.log(image_path);//info.data就是上传成功的图片名称 您可以在wxml里面搞一个隐藏域存储起来，在上面Submit提交里拼装一块提交出去
            }
          })
        },
        complete: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          if (that.data.image.length == 2) {
            that.setData({
              img_button: 'none',
            })
          }
          image.push(res.tempFilePaths);
          that.setData({
            image: image,
          })
        }
      })
    }
  },

  uploadimg: function () {//这里触发图片上传的方法
    var str = "";
    image_path.forEach(function (item, index) {
      str += item + ",";
    });
    var uid = wx.getStorageSync("userId")
    console.log(str);
    console.log(uid);
    wx.request({
      url: 'http://localhost/uploadIdCardImg',
      data: {
        uid: uid,
        image_path: str
      },
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '上传成功，请等待后台验证',
        })
      },
      fail: function(){
        wx.showToast({
          title: '上传身份证失败',
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    images:[
      {
        id:'1',
        src: '../../images/addmore.png',
        text:"请上传身份证正面"
      },
      {
        id:'2',
        src: '../../images/addmore.png',
        text:'请上传身份证反面'
      }
    ],
    pics: []
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})