const baseUrl = 'https://ssl.zhaodaka.net/wowo/api'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// toast提示封装
const showMsg = function (msg) {
  wx.showToast({
    title: msg,
    mask: true,
    icon: "none"
  });
};

// loading的封装
const sLoading = function () {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
}

module.exports = {
  formatTime: formatTime,
  baseUrl: baseUrl,
  showMsg: showMsg,
  sLoading: sLoading
}
