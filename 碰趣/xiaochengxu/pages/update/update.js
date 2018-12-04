// pages/udpate/update.js
const util = require('../../utils/util.js')
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
// var duplicate_posts;
// var duplicate_time;
var localaddress;
var globalData = getApp().globalData;
Page({
  data: {
    // text:"这是一个页面"
    open: false,
    array: ['0小时', '1小时', '2小时', '3小时'],
    arrayType: ['0.5小时游', '1小时游', '1.5小时游', '2小时游', '2.5小时游', '3小时游',
      '3.5小时游', '4小时游', '4.5小时游', '5小时游', '5.5小时游', '6小时游', '6.5小时游', '7小时游', '7.5小时游', '8小时游', '8.5小时游', '9小时游', '9.5小时游', '10小时游', '10.5小时游', '11小时游', '11.5小时游', '12小时游', '12.5小时游', '13小时游', '13.5小时游', '14小时游', '14.5小时游', '15小时游', '15.5小时游', '16小时游', '16.5小时游', '17小时游', '17.5小时游', '18小时游', '18.5小时游', '19小时游', '19.5小时游', '20小时游', '20.5小时游', '21小时游', '21.5小时游', '22小时游', '22.5小时游', '23小时游', '23.5小时游', '24小时游',],
    date: '2016-09-01',
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



    items: [
      { name: '0', value: '每周日', label: 'Sun', checked: false, },
      { name: '1', value: '每周一', label: 'Mon', checked: false, },
      { name: '2', value: '每周二', label: 'Tue', checked: false, },
      { name: '3', value: '每周三', label: 'Wed', checked: false, },
      { name: '4', value: '每周四', label: 'Thu', checked: false, },
      { name: '5', value: '每周五', label: 'Fri', checked: false, },
      { name: '6', value: '每周六', label: 'Sat', checked: false, },
    ],
    image: [],
    img_button: 'inline-block',
    active_data: []
  },
  checkChange: function (e) {
    var that = this
    console.log(e.detail.value)
    let checkArr = e.detail.value;
    this.setData({
      repeat_freq: checkArr
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
    localaddress = value;
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
  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    let aid = options.aid

    this.getActiveDetails(aid)
    this.setData({
      active_id: aid
    })
    console.log(options)
    // uid = options.uid
    // type = options.type
    // title = options.title
    // keyword = options.keyword
    // content = options.content
    // address = options.address
    // phone = options.phone
    // total_num = options.total_num
    // start_time = options.start_time
    // last_time = options.last_time
    // adult_price = options.adult_price
    // child_price = options.child_price
    // image_path = new Array()
    // signup_during_activity = options.signup_during_activity
    // duplicate_posts = options.duplicate_posts
    // duplicate_time = options.duplicate_time
  },
  uploadImg: function () {
    var that = this, image = this.data.image;
    if (this.data.image.length < 9) {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          res.tempFilePaths.forEach(function (file, index) {

            wx.uploadFile({
              url: util.baseUrl +'uploadimg',//这个方法就是后台处理上传的方法
             // url: 'https://ssl.zhaodaka.net/pengqu/uploadimg',//这个方法就是后台处理上传的方法
              filePath: file, //获取到上传的图片
              name: 'file',
              success: function (info) {
                console.log(info)
                image_path.push(info.data);
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
  // 重复报名
  switch2Change: function (e) {
    // console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var value = e.detail.value
    signup_during_activity = value;
  },
  // checkChange: function (e) {
  //   var that = this
  //   that.setData({
  //     value: e.detail.value
  //   })
  //   var items = this.data.items;
  //   var checkArr = e.detail.value;
  //   // console.log(e.detail.value)
  //   for (var i = 0; i < items.length; i++) {
  //     if (checkArr.indexOf(i + "") != -1) {
  //       items[i].checked = true;
  //     } else {
  //       items[i].checked = false;
  //     }
  //   }
  //   this.setData({
  //     duplicate_time: checkArr
  //   })
  //   duplicate_time = checkArr
  //   // console.log(duplicate_time)
  // },
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
    //检查数据,暂时只检查手机号、地址
    if (!phone) {
      wx.showToast({
        title: '手机号为空',
      })
      return;
    }
    var fields = new Object()
    //传入的值没有使用base64编码
    var str = image_path.join()
    fields.aid = this.data.active_id
    fields.uid = globalData.userId;
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
    // fields.duplicate_posts = duplicate_posts
    // fields.duplicate_time = duplicate_time
    fields.latitude = this.data.latitude
    fields.longitude = this.data.longitude


    // this.data.is_repeat == false ? fields.is_repeat = 0 : fields.is_repeat = 1
    // fields.repeat_start_date = this.data.repeat_start_date
    // fields.repeat_end_date = this.data.repeat_end_date
    // fields.repeat_freq = this.data.repeat_freq.join("_")

    params.fields = fields
    var that = this
    // console.log(params.fields),
    //发起请求
    wx.request({
      url: util.baseUrl + 'update',
      // url:'www.baidu.com',
      header: {
        'content-type': 'multipart/form-data'
      },
      data: params.fields,
      success: function (res) {
        // console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function () {
        //失败后的逻辑
        wx.showToast({
          title: '提交失败',
        })
      },
    })
  },
  chooseAddressAction: function () {
    // latitude:"",
    //longitude: "",
    wx.chooseLocation({
      success: res => {
        if (res) {
          console.log(res.address)
          this.setData({
            localaddress: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      },
      fail: res => {
      },
      complete: res => {
      },
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
  getActiveDetails: function (aid) {
    wx.request({
      url: util.baseUrl + 'creator_query?aid=' + aid,
      success: res => {
        if (res.data.length != 0) {
          if (res.data.status != 0) {

            let begindate = res.data.activity.start_time.split(" ")[0]
            let begintime = res.data.activity.start_time.split(" ")[1]
            title = res.data.activity.title
            type = res.data.activity.type
            keyword = res.data.activity.keyword
            content = res.data.activity.content
            localaddress = res.data.activity.address
            phone = res.data.activity.phone
            total_num = res.data.activity.total_num
            adult_price = res.data.activity.adult_price
            child_price = res.data.activity.child_price
            image_path = res.data.activity.image_path
            //===================

            let repeat_freq = []

            let items = this.data.items
            let is_repeat = false
            if (res.data.activity.repeat_freq != "") {
              repeat_freq = res.data.activity.repeat_freq.split("_")


              res.data.activity.is_repeat == 0 ? is_repeat = false : is_repeat = true


              for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < repeat_freq.length; j++) {
                  console.log(items[i].label)
                  if (repeat_freq[j] == items[i].label) {

                    items[i].checked = true
                  }
                }
              }
            }

            this.setData({
              active_data: res.data.activity,
              begin_date: begindate,
              begin_time: begintime,
              title: res.data.activity.title,
              type: res.data.activity.type,
              keyword: res.data.activity.keyword,
              content: res.data.activity.content,
              localaddress: res.data.activity.address,
              phone: res.data.activity.phone,
              total_num: res.data.activity.total_num,
              adult_price: res.data.activity.adult_price,
              child_price: res.data.activity.child_price,
              image: res.data.activity.image_path,
              latitude: res.data.activity.latitude,
              longitude: res.data.activity.longitude,
              items: items,
              is_repeat: is_repeat,
              repeat_freq: repeat_freq,
              repeat_start_date: res.data.activity.repeat_start_date,
              repeat_end_date: res.data.activity.repeat_end_date

            })
          }
          else {
            uitl.showMsg(res.data.msg)
          }
        }
        else {
          util.showMsg('无此活动主题')
        }
      },
      fail: res => {
        util.showMsg('网络错误')
      }
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
