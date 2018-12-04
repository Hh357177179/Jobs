
const baseUrl = 'https://ssl.zhaodaka.net/gongchuangcheng/api'
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

const showMsg = function (msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}


const sLoading = function () {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
}

module.exports = {
  baseUrl: baseUrl,
  showMsg: showMsg,
  sLoading: sLoading,
  formatTime: formatTime
}
