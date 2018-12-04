// pages/group/group.js
const util = require("../../../utils/util.js");
import { postRequest, getRequest } from "../../../utils/HttpRequest";
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultStartDate: "2018-01-01",
    defaultEndDate: "2018-12-31",
    start_time: "",
    end_time: "",
    images_path: [],
    localaddress: "",
    editformdata: {
      child_amount: 0,
      child_price: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const today = new Date();
    const begindate = util.dateFormat(today);
    if (options.gp_id) {
      this.getGroupDetailed(options.gp_id);
    }
    this.setData({
      begin_date: begindate
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * ====自定义事件开始====
   */

  dateChange: function(e) {
    const target = e.currentTarget.dataset.target;
    if (target == "start_time") {
      this.setData({
        start_time: e.detail.value
      });
    } else {
      this.setData({
        end_time: e.detail.value
      });
    }
  },

  chooseAddressAction: function() {
    wx.chooseLocation({
      success: res => {
        if (res) {
          // console.log(res)
          this.setData({
            localaddress: res.address
          });
        }
      },
      fail: res => {},
      complete: res => {}
    });
  },

  uploadImg: function() {
    let that = this;
    let images_path = this.data.images_path;

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res);
        res.tempFilePaths.forEach(function(file, index) {
          wx.uploadFile({
            url: `${util.baseUrl}/uploadimg`, //这个方法就是后台处理上传的方法
            filePath: file, //获取到上传的图片
            name: "file",
            success: function(info) {
              //"https://ssl.zhaodaka.net/pengqu/uploads/images/"+
              images_path.push(info.data);
              console.log(info);
              // console.log(image_path);//info.data就是上传成功的图片名称 您可以在wxml里面搞一个隐藏域存储起来，在上面Submit提交里拼装一块提交出去

              that.setData({
                images_path: images_path
              });
            }
          });
        });
      },
      complete: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      }
    });
  },

  delectImg: function(e) {
    var images_path = this.data.images_path;
    images_path.splice(e.currentTarget.dataset.num, 1);
    this.setData({
      images_path: images_path
    });
  },

  submitAction: function(e) {
    let submit_url = `${util.baseUrl}/editGroup`; //`${util.baseUrl}/editGroup`
    let gid = 0;
    Object.keys(this.data.editformdata).length != 0
      ? (gid = this.data.editformdata.id)
      : gid;
    let params = {
      id: gid,
      user_id: wx.getStorageSync("userId"),
      //user_id: 808,
      img_url: this.data.images_path.join()
    };
    Object.assign(params, e.detail.value);
    console.log("params", params);
    util
      .Validate(params, {
        rules: {
          title: {
            required: true,
            message: "请填写标题"
          },
          contact_phone: {
            required: true,
            phone: true,
            message: ["请填写联系方式", "手机号格式不正确!"]
          },
          start_time: {
            required: true,
            message: "请选择开始时间"
          },
          end_time: {
            required: true,
            message: "请选择结束时间"
          },
          address: {
            required: true,
            message: "请选择地址"
          },
          adult_amount: {
            required: true,
            message: "请输入成人人数"
          },
          adult_price: {
            required: true,
            message: "请输入成人价格"
          },

          img_url: {
            required: true,
            message: "请选择图片"
          }
        }
      })
      .then(response => {
        console.log("zzz", response);
        postRequest(submit_url, params, true).then(res => {
          if (res.data.status == 1) {
            util.showMsg("提交成功!");

            if (
              Object.keys(this.data.editformdata).length == 0 &&
              res.data.info.id != ""
            ) {
              wx.navigateTo({
                url: `../addtrip/addtrip?group_id=${res.data.info.id}`
              });
            }
          } else {
            console.log(res);
          }
        });
      })
      .catch(err => {
        console.log("err", err);
        util.showMsg(err.msg);
      });
  },

  getGroupDetailed: function(gp_id) {
    const submit_url = `${util.baseUrl}/getGroupDetail`;
    let params = {
      id: gp_id,
      user_id: wx.getStorageSync("userId")
    };
    postRequest(submit_url, params, true).then(res => {
      let image_path = [];
      res.data.info.img_url != ""
        ? (image_path = res.data.info.img_url.split(","))
        : image_path;
      this.setData({
        images_path: image_path,
        start_time: res.data.info.start_time,
        end_time: res.data.info.end_time,
        localaddress: res.data.info.address,
        editformdata: res.data.info
      });
    });
  }
});
