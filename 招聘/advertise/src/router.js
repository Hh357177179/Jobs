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
      path: '/job',
      name: 'job',
      component: () => import(/* webpackChunkName: "about" */ './views/job.vue')
    },
    {
      path: '/directives',
      name: 'directives',
      component: () => import(/* webpackChunkName: "about" */ './views/directives.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import(/* webpackChunkName: "about" */ './views/record.vue')
    },
    {
      path: '/skill',
      name: 'skill',
      component: () => import(/* webpackChunkName: "about" */ './views/skill.vue')
    },
    {
      path: '/refining',
      name: 'refining',
      component: () => import(/* webpackChunkName: "about" */ './views/refining.vue')
    },
    {
      path: '/nature',
      name: 'nature',
      component: () => import(/* webpackChunkName: "about" */ './views/nature.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "about" */ './views/contact.vue')
    },
    {
      path: '/thank',
      name: 'thank',
      component: () => import(/* webpackChunkName: "about" */ './views/thank.vue')
    }
  ]
})
