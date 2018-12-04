import axios from 'axios'
import app from '@/main'
// imprort config from './api.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  baseURL: 'http://zhanshu.zhaodaka.vip/api'
})

// 请求拦截
Ax.interceptors.request.use(
  config => {
    app.$toast.loading({
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
      message: '正在加载',
      mask: true
    });
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截
Ax.interceptors.response.use(
  response => {
    if (response.data.code == 200) {
      app.$toast.clear()
      return response.data.data
    } else {
      console.log(response.data.msg)
    }
  },
  error => {
    console.log(error)
  }
)

// 广告位列表
export function GetBanner () { 
  return Ax.post(`/main/banner`)
}

// 申请战术小组
export function Apply(params) { 
  return Ax.post(`/main/apply`, params)
}

// 分类列表
export function getType(params) { 
  return Ax.post(`/main/cate`, params)
}

// 获取战术小组列表
export function getGroupList(params) { 
  return Ax.post(`/main/project`, params)
}

// 战术小组详情
export function getDetail(params) { 
  return Ax.post(`/main/detail`, params) 
}

export default Ax

