import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */'../views/home.vue')
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: "about" */'../views/about.vue')
    }
  ]
})

export default router
