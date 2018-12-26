import axios from 'axios'
import app from '@/main'
import api from '../../vue.config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  baseURL: 'api'
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
    if (response.data.code == 0) {
      app.$toast.clear()
      return response.data.data
    } else if (response.data.code == 1000) {
      app.$alert({
        message: '登录已经过期，请重新登录！'
      }).then(() => {
        // on close
        localStorage.removeItem('token')
        app.$router.push('/login')
      });
    } else {
      app.$toast(response.data.message)
    }
  },
  err => {
    console.log(err)
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

export default Ax