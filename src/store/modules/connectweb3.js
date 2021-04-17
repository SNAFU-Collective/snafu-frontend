
import Web3 from "web3";
import ERC1155ABI from "../../assets/abis/ERC1155.json";
import SNAFU20 from "@/assets/abis/SNAFU20Pair.json";

import { snafu20Address, snafuNftAddress, xdaiRPC, xdaiWebSocket } from "../../utils/constants"

import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state: {
        connected: {},
        web3: null,
        isConnected: false,
        isLoaded: false,
        account: null,
        isLoading: false,
        snafuBalance: null,
        snafuSupply: 0,
        chainId: null,
    },
    getters: {
        getField,
        getSnafu20: (state) => state.snafu20,
        getNftSnafu: (state) => state.snafuNft,
    },
    mutations: {
        updateField,
        setConnected: (state, payload) => state.isConnected = payload,
        setSnafuBalance: (state, payload) => state.snafuBalance = payload,
        setSnafuSupply: (state, payload) => state.snafuSupply = payload,
        disconnectWallet: async function (state) {
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
        setWeb3: async function (context, payload) {
            let { web3, connected } = payload;
            let state = context.state;
            console.log("connected", connected)

            if (connected) {
                state = context.state.connected;
                context.state.account = (await web3.eth.getAccounts())[0];
                context.state.chainId = await web3.eth.getChainId()
                console.log('Chain ID: ', context.state.chainId)
            }

            state.web3 = web3;

            state.snafuNft = await new web3.eth.Contract(ERC1155ABI, snafuNftAddress);
            state.snafu20 = await new web3.eth.Contract(SNAFU20, snafu20Address);

            if (!connected) {
                context.dispatch("nftContract/getNftsFromPool", null, { root: true })
                context.dispatch("updateSnafu20Supply");
            }


            console.log("NEW ACCOUNT", state.account);
            console.log("set Web3");
        },
        connectWallet: async function (context) {
            console.log("connecting");

            const provider = await this._vm.$web3Modal.connect();
            // provider.clearCachedProvider();

            const web3 = new Web3(provider);
            await context.dispatch("setWeb3", { web3, connected: true });
            context.commit("setConnected", true)
            context.dispatch("updateSnafu20Balance");
            




            // eslint-disable-next-line no-unused-vars
            provider.on("accountsChanged", (accounts) => {
                context.dispatch("connectWallet");
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                context.state.chainId = chainId
                console.log('Chain ID: ', context.state.chainId)
            });

            // Subscribe to provider disconnection
            // eslint-disable-next-line no-unused-vars
            provider.on("disconnect", (error) => {
                //TODO: error!
                // context.dispatch("connectWallet");
            });

        },
        disconnectWallet: async function (context) {
            await this._vm.$web3Modal.clearCachedProvider();
            context.commit("disconnectWallet");
            context.commit("setConnected", false)
        },
        startWeb3: async function (context) {
            let web3 = new Web3(
                new Web3.providers.HttpProvider(
                    xdaiRPC
                )
            );

            context.dispatch("setWeb3", { web3, connected: false });

            if (this._vm.$web3Modal.cachedProvider) {
                //This is case where someone already connected
                context.dispatch("connectWallet")
            }

        },
        async updateSnafu20Balance(context) {
            let contract = context.state.snafu20;
            let account = context.state.account;
            console.log("updatingBalance")
            let balance = await contract.methods.balanceOf(account).call();
            console.log("balance", balance)
            context.commit("setSnafuBalance", balance);
        },
        async updateSnafu20Supply(context) {
            let contract = context.state.snafu20;
            console.log("updatingSupply")
            let supply = await contract.methods.totalSupply().call();
            console.log("supply", supply)
            context.commit("setSnafuSupply", supply);
        }
    }
}
