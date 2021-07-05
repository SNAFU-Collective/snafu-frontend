import { getField, updateField } from 'vuex-map-fields';
import { ethers } from "ethers";

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
                return true;
            } catch(error) {
                return false
            }
        },
        async transfer(context, payload) {
            let snafuContract = context.rootGetters["connectweb3/getUserNftSnafu"];

            let ids = []
            let quantities = []
            payload.nfts.forEach((nft) => {
                ids.push(parseInt(nft.id))
                quantities.push(nft.quantity)
            })



//0x800Ce06e8a40799f2BF52fB7E877a4C310598eCB
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            console.log(userAddress, payload.destinationAddress, ids, quantities)

            return await snafuContract.safeBatchTransferFrom(userAddress, payload.destinationAddress, ids, quantities,  ethers.utils.hexlify("0x00"), { gasPrice: "1000000000" });
        }
    }
}