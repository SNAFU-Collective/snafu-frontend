
import Web3 from "web3";
import ERC1155ABI from "../../assets/abis/ERC1155.json";
import SNAFU20 from "@/assets/abis/SNAFU20Pair.json";

import {snafu20Address, snafuNftAddress, xdaiWebSocket} from "../../utils/constants"

import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state: {
        web3: null,
        isConnected: false,
        isLoaded: false,
        account: null,
        isLoading: false,

        snafuBalance: null
    },
    getters:{
        getField,
        getSnafu20: (state) => state.snafu20,
        getNftSnafu: (state) => state.snafuNft,
    },
    mutations: {
        updateField,
        setConnected: (state, payload) => state.isConnected = payload,
        setSnafuBalance: (state, payload) => state.snafuBalance = payload,
        disconnectWallet: async function(state) {
            let web3 = new Web3(
                new Web3.providers.WebsocketProvider(
                    xdaiWebSocket
                )
            );
            state.web3 = web3;
            state.account = null;
        }
    },
    actions: {
        setWeb3: async function(context, web3) {
            let state = context.state;

            console.log("OLD ACCOUNT", state.account);
            if (state.web3 != null && state.account != null) {
                //   // state.web3 = null;
                return;
            }
            state.web3 = web3;
            state.account = (await web3.eth.getAccounts())[0];
            
            state.snafuNft = await new web3.eth.Contract(ERC1155ABI, snafuNftAddress);
            state.snafu20 = await new web3.eth.Contract(SNAFU20.abi, snafu20Address);

            console.log("NEW ACCOUNT", state.account);
            if (state.isLoaded || state.isLoading) {
                return;
            }
            state.isLoading = true;

            console.log("set Web3");
            state.isLoaded = true;    
        },
        connectWallet: async function(context) {
            console.log("connecting");

            context.state.web3 = null;
            const provider = await this._vm.$web3Modal.connect();
            // provider.clearCachedProvider();

            const web3 = new Web3(provider);
            await context.dispatch("setWeb3", web3);
            context.commit("setConnected", true)
            context.dispatch("updateSnafu20Balance")
            


            // eslint-disable-next-line no-unused-vars
            provider.on("accountsChanged", (accounts) => {
                context.dispatch("connectWallet");
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                //TODO: alert with wrong chain
                console.log("chainId", chainId)
            });

            // Subscribe to provider disconnection
            // eslint-disable-next-line no-unused-vars
            provider.on("disconnect", (error) => {
                //TODO: error!
                // context.dispatch("connectWallet");
            });
            
        },
        disconnectWallet: async function(context) {
            await this._vm.$web3Modal.clearCachedProvider();
            context.commit("disconnectWallet");
            context.commit("setConnected", false)
        },
        startWeb3: async function(context) {
  
            if (this._vm.$web3Modal.cachedProvider) {
                //This is case where someone already connected
                context.dispatch("connectWallet")
            }else{
                let web3 = new Web3(
                    new Web3.providers.WebsocketProvider(
                        xdaiWebSocket
                    )
                );
                context.commit("setWeb3", web3);
            }
        },
        async updateSnafu20Balance(context){
            let contract = context.state.snafu20;
            let account = context.state.account;
            console.log("updatingBalance")
            let balance = await contract.methods.balanceOf(account).call();
            console.log("balance", balance)
            context.commit("setSnafuBalance", balance);
        }
    }
}
