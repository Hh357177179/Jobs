// pages/create/create.js
const util = require('../../utils/util.js')
import {
  getRequest
} from "../../utils/HttpRequest"
var uid;
var type;
var title;
var keyword;
var content;
var address;
var phone;
var total_num;
var start_time;
var last_time;
var adult_price;
var child_price;
var image_path;
var signup_during_activity;
var globalData = getApp().globalData;
Page({
  data: {
    // text:"这是一个页面"

    array: ['0小时', '1小时', '2小时', '3小时'],
    arrayType: ['0.5小时游', '1小时游', '1.5小时游', '2小时游', '2.5小时游', '3小时游',
      '3.5小时游', '4小时游', '4.5小时游', '5小时游', '5.5小时游', '6小时游', '6.5小时游', '7小时游', '7.5小时游', '8小时游', '8.5小时游', '9小时游', '9.5小时游', '10小时游', '10.5小时游', '11小时游', '11.5小时游', '12小时游', '12.5小时游', '13小时游', '13.5小时游', '14小时游', '14.5小时游', '15小时游', '15.5小时游', '16小时游', '16.5小时游', '17小时游', '17.5小时游', '18小时游', '18.5小时游', '19小时游', '19.5小时游', '20小时游', '20.5小时游', '21小时游', '21.5小时游', '22小时游', '22.5小时游', '23小时游', '23.5小时游', '24小时游',
    ],
    date: '2018-01-01',
    time: '12:01',
    tempFilePaths: '',
    showDialog: false,
    showDialogRight: false,
    localaddress: "",
    latitude: "",
    longitude: "",
    begin_date: "",
    begin_time: "",

    is_repeat: false,
    repeat_freq: "",
    repeat_start_date: "",
    repeat_end_date: "",

    items: [{
        name: '0',
        value: '每周日',
        label: 'Sun',
        checked: false,
      },
      {
        name: '1',
        value: '每周一',
        label: 'Mon',
        checked: false,
      },
      {
        name: '2',
        value: '每周二',
        label: 'Tue',
        checked: false,
      },
      {
        name: '3',
        value: '每周三',
        label: 'Wed',
        checked: false,
      },
      {
        name: '4',
        value: '每周四',
        label: 'Thu',
        checked: false,
      },
      {
        name: '5',
        value: '每周五',
        label: 'Fri',
        checked: false,
      },
      {
        name: '6',
        value: '每周六',
        label: 'Sat',
        checked: false,
      },
    ],
    image: [],
    img_button: 'inline-block',
  },
  checkChange: function (e) {
    var that = this
    that.setData({
      value: e.detail.value
    })
    var items = this.data.items;
    var checkArr = e.detail.value;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      items: items
    })
  },

  //主题类型
  bindPickerChange_type: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    var typecc = that.data.arrayType[e.detail.value]
    this.setData({
      type: typecc
    })
    type = typecc;
  },

  //主题时长
  bindPickerChange_time: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    var last_time_aa = that.data.array[e.detail.value]
    this.setData({
      last_time: last_time_aa
    })
    last_time = last_time_aa
    console.log(last_time)
  },

  // 主题标题
  bindNameInput: function (e) {
    var value = e.detail.value
    console.log(value)
    title = value;
  },
  // 主题关键词
  bindKeywordInput: function (e) {
    var value = e.detail.value
    console.log(value)
    keyword = value;
  },
  // 主题详细内容
  bindContentInput: function (e) {
    var value = e.detail.value
    console.log(value)
    content = value;
  },
  //联系手机
  bindPhoneInput: function (e) {
    var value = e.detail.value
    // console.log(value)
    phone = value;
  },
  // 详细地址 
  bindDetailInput: function (e) {
    var value = e.detail.value
    // console.log(value)
    address = value;
    this.setData({
      localaddress: e.detail.value
    })
  },
  // 主题人数 
  bindTotalNumInput: function (e) {
    var value = e.detail.value
    // console.log(value)
    total_num = value;
  },
  // 开始时间 
  bindStartTimeInput: function (e) {
    var value = e.detail.value
    // console.log(value)
    start_time = value;
  },
  // 成人单价
  bindAdultPriceInput: function (e) {
    var value = e.detail.value
    // console.log(value)
    adult_price = value;
  },
  // 儿童单价
  bindChildPriceInput: function (e) {
    var value = e.detail.value
    // console.log(value)
    child_price = value;
  },
  onLoad: function (options) {
    //==========全局变量用==========
    uid = options.uid
    type = options.type
    title = options.title
    keyword = options.keyword
    content = options.content
    address = options.address
    phone = options.phone
    total_num = options.total_num
    start_time = options.start_time
    last_time = options.last_time
    adult_price = options.adult_price
    child_price = options.child_price
    image_path = new Array()
    signup_during_activity = options.signup_during_activity
    //=====================================
    // 页面初始化 options为页面跳转所带来的参数  
    const today = new Date()
    const begin_date = util.dateFormat(today)
    this.setData({
      begin_date: begin_date
    })

  },

  uploadImg: function () {
    var that = this,
      image = this.data.image;
    if (this.data.image.length < 9) {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          res.tempFilePaths.forEach(function (file, index) {
            wx.uploadFile({
              url: 'https://ssl.zhaodaka.net/pengqu/uploadimg', //这个方法就是后台处理上传的方法
              filePath: file, //获取到上传的图片
              name: 'file',
              success: function (info) {
                //"https://ssl.zhaodaka.net/pengqu/uploads/images/"+
                image_path.push(info.data);
                console.log(info)
                // console.log(image_path);//info.data就是上传成功的图片名称 您可以在wxml里面搞一个隐藏域存储起来，在上面Submit提交里拼装一块提交出去
                if (that.data.image.length == 8) {
                  that.setData({
                    img_button: 'none',
                  })
                }
                image = image_path
                that.setData({
                  image: image,
                })
              }
            })

          })

        },
        complete: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        }
      })
    }

  },

  delectImg: function (e) {
    var image = this.data.image;
    image.splice(e.currentTarget.dataset.num, 1);
    image_path.splice(e.currentTarget.dataset.num, 1);
    this.setData({
      image: image,
      img_button: 'inline-block',
    })
  },

  // 重复发布
  switch1Change: function (e) {
    var value = e.detail.value
    console.log(e.detail.value)
    this.setData({
      is_repeat: e.detail.value
    })
  },

  // 活动中是否允许报名
  switch2Change: function (e) {
    // console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var value = e.detail.value
    signup_during_activity = value;
  },

  checkChange: function (e) {
    var that = this
    console.log(e.detail.value)
    let checkArr = e.detail.value;
    this.setData({
      repeat_freq: checkArr
    })

    // console.log(repeat_freq)
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },
  submit: function () {
    //写入参数
    var params = new Object()
    //检查数据


    var fields = {}
    //传入的值没有使用base64编码
    var str = "";

    image_path.forEach(function (item, index) {
      str += item + ",";
    });
    fields.uid = wx.getStorageSync('userId');
    fields.type = type
    fields.title = title
    fields.keyword = keyword
    fields.content = content
    fields.address = this.data.localaddress
    fields.phone = phone
    fields.total_num = total_num
    fields.start_time = this.data.begin_date + " " + this.data.begin_time
    fields.last_time = last_time
    fields.adult_price = adult_price
    fields.child_price = child_price
    fields.image_path = str
    fields.signup_during_activity = signup_during_activity

    fields.is_repeat = 0
    fields.repeat_start_date = ""
    fields.repeat_end_date = ""
    fields.repeat_freq = ""
    if (this.data.is_repeat == true) {
      this.data.is_repeat == false ? fields.is_repeat = 0 : fields.is_repeat = 1
      fields.repeat_start_date = this.data.repeat_start_date
      fields.repeat_end_date = this.data.repeat_end_date
      fields.repeat_freq = this.data.repeat_freq.join("_")
    }

    fields.latitude = this.data.latitude
    fields.longitude = this.data.longitude
    params.fields = fields
    var that = this
    if (this.data.begin_date == '' && this.data.begin_time == '') {
      util.showMsg('请填写开始日期和开始时间')
      return
    }
    util.Validate(fields, {
      rules: {
        title: {
          required: true,
          message: '请填写标题'
        },
        phone: {
          required: true,
          phone: true,
          message: ['请填写联系方式', '手机号格式不正确!']

        },
        start_time: {
          required: true,
          message: '请选择开始时间'
        },

        address: {
          required: true,
          message: '请选择地址'
        },
        adult_price: {
          required: true,
          message: '请输入成人价格'
        },
        total_num: {
          required: true,
          message: '请输入人数'
        },
        content: {
          required: true,
          message: '请输入详细内容'
        },

        image_path: {
          required: true,
          message: '请选择图片'
        },
      },
    }).then(() => {
      console.log('params', params.fields)
      const submit_url = `${util.baseUrl}/add`
      getRequest(submit_url, fields).then(res => {
        if (res.data.status == 1) {
          util.showMsg(res.data.msg)
          wx.switchTab({
            url: '/pages/trip/trip'
          })
        } else {
          wx.showToast({
            title: res.data.msg,

            duration: 2000
          })
        }
      })
    }).catch(err => {
      util.showMsg(err.msg)
      console.log(err.msg)
    })

    

  },

  chooseAddressAction: function () {
    wx.chooseLocation({
      success: res => {
        if (res) {
          // console.log(res)
          address = res.address
          this.setData({
            localaddress: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      },
      fail: res => {},
      complete: res => {},
    })
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      begin_date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      begin_time: e.detail.value
    })
  },
  bindRepeatStartDate: function (e) {
    this.setData({
      repeat_start_date: e.detail.value
    })
  },
  bindRepeatEndDate: function (e) {
    this.setData({
      repeat_end_date: e.detail.value
    })
  }
})