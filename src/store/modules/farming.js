import {getField, updateField} from 'vuex-map-fields'
import {ethers} from "ethers"
import {mapActions} from "vuex"

export default {
    namespaced: true,
    state: {
        pools: [],
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
    },
    actions: {
        async getFarmData(context) {

        },
        async balanceOf(context) {
            let account = context.rootGetters["connectweb3/getUserAccount"]

            let contract = context.rootGetters["connectweb3/getCommonFarm"]
            console.log(contract, account)
            let balance = await contract.balanceOf(account)

            console.log("Received balance", balance.toString())
            return balance


            // return balance / Math.pow(10, decimals >= 0 ? decimals : 0);

        },
    },
}