import { getField, updateField } from 'vuex-map-fields';
import { snafu20Address } from "../../utils/constants"
import { ethers } from "ethers";
import Vue from "vue"
//Block when the erc721 was deployed
const minBlock = 14958798;

function addressEqual(a, b) {
    return a.toLowerCase() === b.toLowerCase();
}

export default {
    namespaced: true,
    state: {
        allNFTs: [],
        formData: {
            burnTxHash: null
        },
        selectedNft: null,
        selectedNftMetadata: null,
        selectedQuantity: 0,
        withdrawFromPool: true,
        recaptchaResponse: null,
        validForm: false,
    },
    getters: {
        getField,
        getUserBalance: (state, getters, rootState, rootGetters) => (id) => {
            let userAddress = rootGetters["connectweb3/getUserAccount"];
            let nft = state[userAddress].find(nft => nft.id === id)
            return nft ? nft.editions : 0;
        }
    },
    mutations: {
        updateField,
        setNfts: (state, payload) => {
            Vue.set(state, payload.address, payload.results)
        },
        setAllNfts: (state, payload) =>  state.allNFTs = payload,
        resetSelectedNft: (state) => {
            state.selectedNft = null;
            state.selectedNftMetadata = null;
            state.selectedQuantity = 0;
        }
    },
    actions: {
        async convertErc1155(context){
          let token = context.rootGetters["connectweb3/getUserSnafu721"];
          let nftId = context.state.selectedNft.claimId;
          return token.claim(nftId, { gasPrice: "1000000000" });
        },
        async burnErc1155(context) {
          let erc1155 = context.rootGetters["connectweb3/getUserNftSnafu"];
          let userAddress = context.rootGetters["connectweb3/getUserAccount"];
          let nftId = context.state.selectedNft.id;
          let selectedQuantity = context.state.selectedQuantity;
          return erc1155.burn(userAddress, nftId, selectedQuantity, { gasPrice: "1000000000" });
        },
        async getNftsFromUser(context) {
            console.log("updating nfts721 for user")
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            context.dispatch("getNftsFromAddress", { address: userAddress })
        },
        async getNftsByAddress(context, address) {
            console.log("updating nfts721 for: " + address)
            context.dispatch("getNftsFromAddress", { address: address })
        },
        //https://github.com/OpenZeppelin/openzeppelin-contracts/issues/1102#issuecomment-799623364
        async getNftsFromAddress(context, payload) {
            let token = context.rootGetters["connectweb3/getSnafu721"];
            let account = payload.address;
            const sentLogs = await token.queryFilter(
                token.filters.Transfer(account, null),
              );
              const receivedLogs = await token.queryFilter(
                token.filters.Transfer(null, account),
              );
            
              const logs = sentLogs.concat(receivedLogs)
                .sort(
                  (a, b) =>
                    a.blockNumber - b.blockNumber ||
                    a.transactionIndex - b.TransactionIndex,
                );
            
              const owned = new Set();
            
              for (const log of logs) {
                const { from, to, tokenId } = log.args;
                
                if (addressEqual(to, account)) {
                  owned.add(tokenId.toString());
                } else if (addressEqual(from, account)) {
                  owned.delete(tokenId.toString());
                }
              }
              
              let results = [];

              for (const nft of owned) {
                let erc1155Id = await token.tokenIdsMap(nft);
                results.push( {id: erc1155Id.toString(), editions: 1, claimId: nft } )

              }  

             context.commit("setNfts", { address:account, results });

        },
    }
}