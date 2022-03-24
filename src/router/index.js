import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Artist Collective | SNAFU',
            headerSubtitle: 'Artist Collective',
        },
        component: () => import('../views/Home.vue'),
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
        component: () => import('../views/Profile.vue'),
    },
    {
        path: '/swap',
        name: 'Pool',
        meta: {
            title: 'Pool | SNAFU',
        },
        component: () => import('../views/Pool.vue'),
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
        name: 'Community',
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
        path: '/manifest',
        name: 'Manifest',
        meta: {
            title: 'Manifest | SNAFU',
            headerSubtitle: 'Manifest',
        },
        component: () => import('../views/Manifest.vue'),
        props: true,
    },
    {
        path: '/catalog',
        name: 'Catalog',
        meta: {
            title: 'Catalog | SNAFU',
            headerSubtitle: 'Catalog',
        },
        component: () => import('../views/Catalog.vue'),
        props: true,
    },
    {
        path: '/bridge',
        name: 'Bridge',
        meta: {
            title: 'NFT Bridge | SNAFU',
            headerSubtitle: 'NFT Bridge',
        },
        component: () => import('../views/XPNetworkBridge.vue'),
        props: true,
    },
    {
        path: '/artist/:username',
        name: 'Artist',
        meta: {
            title: 'Artist | SNAFU',
            headerSubtitle: 'Artist',
        },
        component: () => import('../views/Artist.vue'),
        props: true,
    },
]

const router = new VueRouter({
    routes,
})

export default router
