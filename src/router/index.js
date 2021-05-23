import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue')
  },
  {
    path: '/nfts',
    name: 'NFTs',
    component: () => import('../views/NFTs.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
