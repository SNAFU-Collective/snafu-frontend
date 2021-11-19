import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Artist Collective | SNAFU',
            headerSubtitle: 'Artist Collective',
        },
        component: () => import('../views/NFTs.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        meta: {
            title: 'Search | SNAFU',
            headerSubtitle: 'Search',
        },
        // route level code-splitting
        component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    },
    {
        path: '/wallet',
        name: 'Wallet',
        meta: {
            title: 'Wallet | SNAFU',
            headerSubtitle: 'Wallet',
        },
        component: () => import('../views/Wallet.vue'),
    },
    {
        path: '/swap',
        name: 'Marketplace',
        meta: {
            title: 'Marketplace | SNAFU',
            headerSubtitle: 'Marketplace',
        },
        component: Home,
    },
    {
        path: '/claim',
        name: 'Claim',
        meta: {
            title: 'Claim/Redeem - Pool Together | SNAFU',
            headerSubtitle: 'Claim/Redeem',
        },
        component: () => import('../views/Claim.vue'),
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard',
        meta: {
            title: 'Collectors leaderboard | SNAFU',
            headerSubtitle: 'Collectors',
        },
        component: () => import('../views/Leaderboard.vue'),
    },
    {
        path: '/user/:address',
        name: 'User',
        meta: {
            title: 'Collector page | SNAFU',
            headerSubtitle: 'Collectors',
        },
        component: () => import('../views/User.vue'),
        props: true,
    },
    {
        path: '/farm',
        name: 'Farm',
        meta: {
            title: 'Farm | SNAFU',
            headerSubtitle: 'Farming',
        },
        component: () => import('../views/Farms.vue'),
        props: true,
    },
    {
        path: '/bridge',
        name: 'Bridge',
        meta: {
            title: 'Bridge | SNAFU',
            headerSubtitle: 'test',
        },
        component: () => import('../views/Bridge.vue'),
        props: true,
    },
]

const router = new VueRouter({
    routes,
})

export default router
