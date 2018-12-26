import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mycard/:id',
      name: 'mycard',
      component: () => import('./views/Mycard.vue')
    },
    {
      path: '/mecard',
      name: 'mecard',
      component: () => import('./views/meCard.vue')
    },
    {
      path: '/buydetail/:id',
      name: 'buydetail',
      component: () => import('./views/buyDetail.vue')
    },
    {
      path: '/applyfor',
      name: 'applyfor',
      component: () => import('./views/applyFor.vue')
    },
    {
      path: '/buyback',
      name: 'buyback',
      component: () => import('./views/buyBack.vue')
    },
    {
      path: '/exchange/:orderid/:coupon_id',
      name: 'exchange',
      component: () => import('./views/exchange.vue')
    }
  ]
})
