var Util = require('../utils/util.js')
// 正式环境
var basicUrlGet = "https://service.loveonline.net.cn/appService/mouthGet/get"
var basicUrlPost = "https://service.loveonline.net.cn/appService/mouthPost/post"

var ab = 'aaaaaaaaaa'; //替换字符
var requestHandler = {
  params: {},
  success: function (res) {
    // success
  },
  fail: function () {
    // fail
  },
}

//GET请求
function GET(requestHandler) {
  request('GET', requestHandler,true)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler, true)
}

//GET请求
function GET(requestHandler,isShow) {
  request('GET', requestHandler,isShow)
}

function request(method, requestHandler,isShow) {
  //注意：可以对params加密等处理
  var dic = {
    // 'sign': '77c421f94942e615faa2c6ebf8ed58f5',
    // 'token': 'edb73e008bfb43a492c0b92f450be5ef',
    'version': '1.0'
    };
  
  var fields = requestHandler.params;
  var params = Object.assign(dic, fields);
  var basicUrl ;
  var contentType;
  if(method == "GET"){
    basicUrl = basicUrlGet;
    contentType = "application/json";
    console.log("get请求参数:"+ JSON.stringify(params));
  }else if (method == "POST"){//直接拼接成url
    basicUrl = basicUrlPost;
    contentType = "application/x-www-form-urlencoded, charset=utf-8";
    //对象转字符.
    var aa = JSON.stringify(params.fields);
    params.fields = ab;//用作后面替换
    
    basicUrl = basicUrl + '?' + Util.json2Form(params);
    basicUrl = basicUrl.replace(ab, aa);//替换为之前的数据
    params = '';//清空参数
    console.log("post请求参数:" + basicUrl);
  }
  //加载提示

  if(isShow){
    wx.showLoading({
      title: '加载中...',
    })
  }
  

  //开始网络请求
  wx.request({
    url: basicUrl,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { "content-type": 'application/x-www-form-urlencoded'}, // 设置请求的 header
    success: function (res) {
      // console.log(res)
      //注意：可以对参数解密等处理
      wx.hideLoading()
      if (res.statusCode == 200) {
        if (Util.getDesc(res.data.status)){
          requestHandler.success(res)
        }else{
          requestHandler.fail()
        }  
      } else {
        requestHandler.fail()
      }
      wx.stopPullDownRefresh();
    },
    fail: function () {
      wx.hideLoading()
      requestHandler.fail()
      wx.stopPullDownRefresh();
      if(isShow){
        wx.showToast({ title: '失败', icon: 'fail', duration: 1500 })
      }
      
    },
    complete: function () {
      // complete
      wx.stopPullDownRefresh();
    
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}