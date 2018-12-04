import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/root.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/',
          name: 'home',
          meta: { 
            title: '首页'
          },
          component: () => import('./views/home/Home.vue')
        },
        {
          path: '/special',
          name: 'special',
          meta: { 
            title: '专家频道'
          },
          component: () => import('./views/special/specialist.vue')
        },
        {
          path: '/sendcenter',
          name: 'sendcenter',
          meta: { 
            title: '发布中心'
          },
          component: () => import('./views/sendcenter/sendCenter.vue')
        }
      ]
    },
    {
      path: '/down',
      name: 'down',
      component: () => import('./views/home/down.vue')
    },
    {
      path: '/adetail',
      name: 'adetail',
      component: () => import('./views/home/adetail.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/home/history.vue')
    },
    {
      path: '/someone',
      name: 'someone',
      component: () => import('./views/home/someOne.vue')
    },
    {
      path: '/unanswer',
      name: 'unanswer',
      component: () => import('./views/special/unanswered.vue')
    },
    {
      path: '/publicityd',
      name: 'publicityd',
      component: () => import('./views/special/publicityd.vue')
    },
    {
      path: '/referquery',
      name: 'referquery',
      component: () => import('./views/special/referquery.vue')
    },
    {
      path: '/checkquery',
      name: 'checkquery',
      component: () => import('./views/special/checkquery.vue')
    }
  ]
})
