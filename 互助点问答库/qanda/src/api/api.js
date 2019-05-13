import axios from 'axios'
import app from '@/main'
// import api from '../../vue.config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  baseURL: 'http://huzhudian.zhaodaka.net/api'
})

// 请求拦截 
Ax.interceptors.request.use(
  config => {
    // let key = JSON.parse(localStorage.getItem('token'))
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
    if (response.data.code === 0) {
      app.$toast.clear()
      return response.data.data
    } else if (response.data.code == 1000) {
      app.$dialog.alert({
        message: '登录已经过期，请重新登录！'
      }).then(() => {
        // on close
        localStorage.removeItem('token')
        app.$router.push('/login')
      });
    } else {
      app.$toast.clear()
      app.$toast(response.data.message)
    }
  },
  err => {
    console.log(123321,err)
  }
)

// 登录
export function Login(params) { 
  return Ax.post(`/login`, params)
}

// 查询问题分类
export function cateList() {
  return Ax.get('/cateList')
}

// 上传图片
export function upLoad (params) {
  return Ax.post('/upload', params)  
}

// 专家查看问题列表
export function expertList (params) {
  return Ax.post(`/expertList`, params)
}

// 发布问题
export function publish(params) { 
  return Ax.post(`publish`, params)
 }

//  专家问题详情
export function expertDetail (params) {
  return Ax.post(`expertDetail`, params)
}

// 获取首页列表
export function homeList (params) {
  return Ax.get(`question`, {params})
}

// 获取普通用户详情
export function detail (params) {
  return Ax.get(`detail`, {params})
}

// 提交回答
export function answer (params) {
  return Ax.post(`answer`, params)
}

// 质疑一个回答
export function answerDistrust(params) { 
  return Ax.post(`/answerDistrust`, params)
 }

//  查看质疑列表
export function distrustList(params) { 
  return Ax.get(`/distrustList`, {params})
 }

//  查看历史版本
export function history(params) {
  return Ax.get(`history`, {params})
}

// 查看历史版本详情
export function historyDetail(params) {
  return Ax.get(`historyDetail`, {params})
}

// 修改答案
export function answerEdit(params) {
  return Ax.post(`answerEdit`, params)
}

// 同意
export function answerAgree (params) {
  return Ax.post(`/answerAgree`, params)
}

export default Ax