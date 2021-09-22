import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/banks-management',
    name: 'banks-management'
  },
  {
    path: '/mortgage-calculator',
    name: 'mortgage-calculator'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
