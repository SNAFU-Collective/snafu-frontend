import {getField, updateField} from 'vuex-map-fields'
import {ethers} from "ethers"

export default {
    namespaced: true,
    state: {
        nftsToTransfer: [],
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
    },
    actions: {
        async isAddress(context, address) {
            try {
                ethers.utils.getAddress(address)
                return true
            } catch (error) {
                return false
            }
        },
        async batchTransfer(context, payload) {
            let snafuContract = context.rootGetters["connectweb3/getUserNftSnafu"]

            let ids = []
            let quantities = []
            payload.nfts.forEach((nft) => {
                ids.push(parseInt(nft.id))
                quantities.push(nft.quantity)
            })

            let userAddress = context.rootGetters["connectweb3/getUserAccount"]

            return await snafuContract.safeBatchTransferFrom(userAddress, payload.destinationAddress, ids, quantities, ethers.utils.hexlify("0x00"), {gasPrice: "10000000000"})
        },
        async singleTransfer(context, payload) {
            let snafuContract = context.rootGetters["connectweb3/getUserNftSnafu"]
            let userAddress = context.rootGetters["connectweb3/getUserAccount"]
           
            return await snafuContract.safeTransferFrom(userAddress, payload.destinationAddress,  payload.id, payload.amount, ethers.utils.hexlify("0x00"), {gasPrice: "10000000000"})
        },
        refreshUserNfts(context) {
            context.dispatch("nftContract/getNftsFromUser", null, {root: true})
        },
    },
}