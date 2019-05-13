import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/font/iconfont.css'
import 'vant/lib/index.css'
import './assets/style.css'
import 'lib-flexible'
import { Picker, Popup, Toast } from 'vant'

Vue.use(Picker).use(Popup).use(Toast);
Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app