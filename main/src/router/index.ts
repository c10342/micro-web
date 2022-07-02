import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppView from '../App.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/vue3',
    component: AppView
  },
  {
    path: '/vue3',
    component: AppView
  },
  {
    path: '/react18',
    component: AppView
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
