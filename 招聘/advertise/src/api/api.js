import axios from 'axios'
import app from '@/main'
// import api from '../../vue.config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let Ax = axios.create({
  baseURL: 'http://zhaopin.zhaodaka.vip/api'
})

// 响应拦截
Ax.interceptors.response.use(
  response => {
    if (response.data.code == 200) {
      return response.data.data
    } else {
      app.$toast(response.data.message)
    }
  },
  err => {
    console.log(123321,err)
  }
)

export function recruitList(params) { 
  return Ax.post(`/project/index`, params)
 }

 export function subPublish(params) {
   return Ax.post(`/project/publish`, params)
 }

 export function upPic(params) { 
  return Ax.post(`/project/upload`, params)
  }

 export default Ax