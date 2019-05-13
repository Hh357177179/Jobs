import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


import { Dialog, Toast } from 'vant';

Vue.use(Dialog).use(Toast)
Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app