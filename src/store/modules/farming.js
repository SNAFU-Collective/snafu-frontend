import {getField, updateField} from 'vuex-map-fields'
import {ethers} from "ethers"
import {mapActions} from "vuex"

export default {
    namespaced: true,
    state: {
        pools: [],
        commonFarmStakedBalance: 0,
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        setCommonFarmStakedBalance: (state, payload) => state.commonFarmStakedBalance = payload,
    },
    actions: {
        async updateCommonFarmStakedBalance(context) {
            let account = context.rootGetters["connectweb3/getUserAccount"]

            let contract = context.rootGetters["connectweb3/getCommonFarm"]
            // console.log(contract, account)
            let balance = await contract.balanceOf(account)
            context.commit("setCommonFarmStakedBalance", ethers.utils.formatEther(balance))
            // console.log("Received balance", balance.toString())
            return balance
        },
    },
}