
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
        snafuFee: 0,
        chainId: null,
    },
    getters: {
        getField,
        getSnafu20: (state) => state.snafu20,
        getNftSnafu: (state) => state.snafuNft,
        getUserNftSnafu: (state) => state.connected.snafuNft,
        getUserSnafu20: (state) => state.connected.snafu20,

        getUserAccount: (state) => state.account,
        isMetamask: async (state) => {
            if (state.connected.web3 && state.connected.web3.givenProvider.isMetamask && !state.connected.web3.givenProvider.isMetamask()) {
                return false
            } else {
                return true
            }
        },
        isXdai: (state) => {
            if (state.chainId === 100 || state.chainId === '0x64') {
                return true
            } else {
                return false
            }
        }
    },
    mutations: {
        updateField,
        setConnected: (state, payload) => state.isConnected = payload,
        setSnafuBalance: (state, payload) => state.snafuBalance = payload,
        setSnafuSupply: (state, payload) => state.snafuSupply = payload,
        setSnafuFee: (state, payload) => state.snafuFee = payload,

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
                //console.log('Chain ID: ', context.state.chainId)
                context.dispatch("nftContract/getNftsFromUser", null, { root: true })

            }

            state.web3 = web3;

            state.snafuNft = await new web3.eth.Contract(ERC1155ABI, snafuNftAddress);
            state.snafu20 = await new web3.eth.Contract(SNAFU20, snafu20Address);

            if (!connected) {
                context.dispatch("nftContract/getNftsFromPool", null, {root: true})
                context.dispatch("updateSnafu20Supply");
                context.dispatch("updateSnafu20Fee");
            }


            console.log("NEW ACCOUNT", state.account);
            console.log("set Web3");
        },
        connectWallet: async function (context) {
            console.log("connecting");

            let provider, hasProvider
            try {
                provider = await this._vm.$web3Modal.connect();
                hasProvider = true;
            } catch ( err ) {
                await context.dispatch("disconnectWallet");
                hasProvider = false;
            }

            if (hasProvider) {
                const web3 = new Web3(provider);
                await context.dispatch("setWeb3", { web3, connected: true });
                context.commit("setConnected", true)
                context.dispatch("updateSnafu20Balance");


                // eslint-disable-next-line no-unused-vars
                provider.on("accountsChanged", (accounts) => {
                    context.dispatch("connectWallet");
                    //Reset Selected NFT
                    context.commit("nftContract/resetSelectedNft", null, { root: true })
                });

                // Subscribe to chainId change
                provider.on("chainChanged", (chainId) => {
                    context.state.chainId = chainId
                    context.commit("nftContract/resetSelectedNft", null, { root: true })
                    console.log('Chain ID: ', context.state.chainId)
                });

                // Subscribe to provider disconnection
                // eslint-disable-next-line no-unused-vars
                provider.on("disconnect", (error) => {
                    console.log('provider disconnect', error)

                    context.dispatch("disconnectWallet");
                });
            }
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
        },
        async updateSnafu20Fee(context) {
            let contract = context.state.snafu20;
            console.log("updatingFee")
            let fee = await contract.methods.fee().call();
            console.log("fee", fee)
            context.commit("setSnafuFee", fee);
        },
        async addSnafuToMetamask(context) {
            const tokenAddress = snafu20Address
            const tokenSymbol = 'SNAFU';
            const tokenDecimals = 18;
            const tokenImage = 'https://gateway.pinata.cloud/ipfs/QmYFnC1RxAvNzWFmtR5CQYWBz8pgzDidqQKg8o1WVqppEq';

            try {
                await context.state.connected.web3.givenProvider.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20', // Initially only supports ERC20, but eventually more!
                        options: {
                            address: tokenAddress, // The address that the token is at.
                            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                            decimals: tokenDecimals, // The number of decimals in the token
                            image: tokenImage, // A string url of the token logo
                        },
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
}
