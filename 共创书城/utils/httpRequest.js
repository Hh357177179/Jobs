const util = require('./util.js')

const defaultRequest = function ({ vurl, vmethod, params, visloading } = {}) {
  // visloading && util.sLoading();
  return new Promise((resolve, reject) => {
    if (vurl == null || vurl == '') {
      reject('请求地址未填写');
      // wx.hideLoading()
    } else {
      wx.request({
        url: util.baseUrl + vurl,
        method: vmethod,
        data: params,
        success: res => {
          if (res.data.code == 200) {
            // wx.hideLoading()
            resolve(res.data.data)
          } else {
            util.showMsg(res.data.msg)
          }
        },
        fail: res => {
          reject(res)
          console.log('网络错误')
        }
      })
    }
  })
}

// get请求
const getRequest = function (vurl, params, visloading) {
  return defaultRequest({
    vurl,
    vmethod: "GET",
    params,
    visloading
  })
}

// post请求
const postRequest = function (vurl, params, visloading) {
  return defaultRequest({
    vurl,
    vmethod: "POST",
    params,
    visloading
  })
}

// 导出
module.exports = {
  getRequest: getRequest,
  postRequest: postRequest
}