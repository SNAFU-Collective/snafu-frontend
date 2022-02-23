import {getField, updateField} from 'vuex-map-fields'
import {ethers} from "ethers"
import {mapActions} from "vuex"

export default {
    namespaced: true,
    state: {
        pools: [],
        commonFarmStakedBalance: 0,
        rareFarmStakedBalance: 0,
        ultraRareFarmStakedBalance: 0,
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        setCommonFarmStakedBalance: (state, payload) => state.commonFarmStakedBalance = payload,
        setRareFarmStakedBalance: (state, payload) => state.rareFarmStakedBalance = payload,
        setUltraRareFarmStakedBalance: (state, payload) => state.ultraRareFarmStakedBalance = payload,
    },
    actions: {
        async updateCommonFarmStakedBalance(context) {
            let account = context.rootGetters["connectweb3/getUserAccount"]

            let contract = context.rootGetters["connectweb3/getCommonFarm"]
            // console.log(contract, account)
            let balance = await contract.balanceOf(account)
            context.commit("setCommonFarmStakedBalance", ethers.utils.formatEther(balance))
            // console.log("setCommonFarmStakedBalance", balance.toString())
        },
        async updateRareFarmStakedBalance(context) {
            let account = context.rootGetters["connectweb3/getUserAccount"]

            let contract = context.rootGetters["connectweb3/getRareFarm"]
            // console.log(contract, account)
            let balance = await contract.balanceOf(account)
            context.commit("setRareFarmStakedBalance", ethers.utils.formatEther(balance))
            // console.log("setRareFarmStakedBalance", balance.toString())
        },
        async updateUltraRareFarmStakedBalance(context) {
            let account = context.rootGetters["connectweb3/getUserAccount"]

            let contract = context.rootGetters["connectweb3/getUltraRareFarm"]
            // console.log(contract, account)
            let balance = await contract.balanceOf(account)
            context.commit("setUltraRareFarmStakedBalance", ethers.utils.formatEther(balance))
            // console.log("setUltraRareFarmStakedBalance", balance.toString())
        },
    },
}