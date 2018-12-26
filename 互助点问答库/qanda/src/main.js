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


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default app