const util = require ('util');

const defaultRequest = function ({vurl, vmethod, params, visloading} = {}) {
  visloading && showLoading ();
  let header = {};
  if (vmethod == 'POST') {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
  }
  return new Promise ((resolve, reject) => {
    if (vurl == null || vurl == '') {
      reject ('请求地址未填写');
      wx.hideLoading ();
    } else {
      wx.request ({
        url: vurl,
        method: vmethod,
        header: header,
        data: params,
        success: function (res) {
          console.log (res);
          if (res.statusCode != 200) {
            reject (res);
            util.showMsg ('参数或者网络错误');
            console.log ('↑ 打印出的网络错误');
          } else {
            resolve (res);
            wx.hideLoading ();
          }
        },
        fail (res) {
          console.log ('网络错误');
          reject (res);
        },
        complete () {
          // wx.hideLoading()
        },
      });
    }
  });
};

const getRequest = function (vurl, params, visloading) {
  return defaultRequest ({
    vurl,
    vmethod: 'GET',
    params,
    visloading,
  });
};
const postRequest = function (vurl, params, visloading) {
  console.log('isloading',visloading)
  return defaultRequest ({
    vurl,
    vmethod: 'POST',
    params,
    visloading,
  });
};

const showLoading = function () {
  wx.showLoading ({
    title: 'loading...',
    mask: true,
    success: function (res) {},
    fail: function (res) {},
    complete: function (res) {},
  });
};

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
};
