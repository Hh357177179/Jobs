import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/font/iconfont.css'
import 'vant/lib/index.css'
import './assets/style.css'
import 'lib-flexible'
import { Popup, Picker, Toast, Dialog, Uploader, Icon } from 'vant';

Vue.use(Popup).use(Picker).use(Toast).use(Dialog).use(Uploader).use(Icon);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // if (to.path == '/') {
  //   sessionStorage.removeItem('userKey')
  // }
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token')) {
      next ()
    } else {
      next({
        path: '/login',
        // query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

Vue.filter('types', function (value) { 
  switch (value) {
    case 1:
    value = "职业健康"
    break;
    case 2:
    value = "消防安全"
    break;
    case 3:
    value = "生产安全"
    break;
    case 4:
    value = "危化品管理"
    break;
    case 5:
    value = "环境保护"
    break;
    case 6:
    value = "领导力"
    break;
    case 7:
    value = "可持续发展"
    break;
  }
  return value
})

Vue.filter('formDate', function (value) {
  let date = new Date()
  let date2 = new Date(value); 
  let dateResult = date.getTime() - date2.getTime()
  var day = parseInt(dateResult / (1000 * 60 * 60 * 24))
  return day + 1
})

Vue.filter('dateFr', function (val,splict,splicts) {
  let date = new Date (val * 1000)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDay()
  let h = date.getHours()
  let m = date.getMinutes()
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  return `${Y}-${M}-${D} ${h}:${m}`
})


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app