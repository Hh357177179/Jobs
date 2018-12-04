import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/font/iconfont.css'
import './assets/style.css'
import 'lib-flexible'
import { Popup, Picker } from 'vant';

Vue.use(Popup).use(Picker);
Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app