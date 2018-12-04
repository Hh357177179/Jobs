import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/font/iconfont.css'
import './assets/style.css'
import 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { Toast } from 'vant';
import VueScroller from 'vue-scroller'


Vue.use(VueScroller)
Vue.use(Toast);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

// 时间过滤
Vue.filter("formatTime", function(value){
  var date = new Date(value * 1000)
  var M = date.getMonth() + 1
  var D = date.getDate()
  if (10 > M > 0) {
    M = "0" + M
  }
  if (D < 10) {
    D = "0" + D
  }
  return `${M}-${D}`
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app
