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
          component: () => import('./views/home/Home.vue'),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/special',
          name: 'special',
          meta: { 
            title: '专家频道'
          },
          component: () => import('./views/special/specialist.vue'),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/sendcenter',
          name: 'sendcenter',
          meta: { 
            title: '发布中心'
          },
          component: () => import('./views/sendcenter/sendCenter.vue'),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { 
        title: '登录'
      },
      component: () => import('./views/login/Login.vue')
    },
    {
      path: '/down',
      name: 'down',
      component: () => import('./views/home/down.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/adetail',
      name: 'adetail',
      component: () => import('./views/home/adetail.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/home/history.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/someone',
      name: 'someone',
      component: () => import('./views/home/someOne.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/unanswer',
      name: 'unanswer',
      component: () => import('./views/special/unanswered.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/publicityd',
      name: 'publicityd',
      component: () => import('./views/special/publicityd.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/referquery',
      name: 'referquery',
      component: () => import('./views/special/referquery.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/checkquery',
      name: 'checkquery',
      component: () => import('./views/special/checkquery.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
