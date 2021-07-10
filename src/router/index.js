import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/NFTs.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        // route level code-splitting
        component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: () => import('../views/Wallet.vue'),
    },
    {
        path: '/pool',
        name: 'Pool',
        component: Home,
    },
    {
        path: '/claim',
        name: 'Claim',
        component: () => import('../views/Claim.vue'),
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard',
        component: () => import('../views/Leaderboard.vue'),
    },
    {
        path: '/user/:address',
        name: 'User',
        component: () => import('../views/User.vue'),
        props: true,
    },
]

const router = new VueRouter({
    routes,
})

export default router
