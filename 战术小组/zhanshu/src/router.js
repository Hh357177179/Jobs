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
      name: 'root',
      component: Root,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import ('./views/Home.vue')
        },
        {
          path: '/apply',
          name: 'apply',
          component: () => import ('./views/Apply.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import ('./views/Category.vue')
        },
        {
          path: '/category/grouplist',
          name: 'grouplist',
          component: () => import ('./views/GroupList.vue')
        },
        {
          path: '/category/detail/:id',
          name: 'detail',
          component: () => import ('./views/Detail.vue')
        }
      ]
    }
  ]
})
