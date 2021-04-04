
import Web3 from "web3";
import ERC1155ABI from "../../assets/abis/ERC1155.json";
import SNAFU20 from "@/assets/abis/SNAFU20Pair.json";

const snafuNftAddress = "";
const snafu20Address = "";
const xdaiWebSocket = "wss://rpc.xdaichain.com/wss";

export default {
    namespaced: true,
    state: {
        web3: null,
        isLoaded: false,
        account: null,
        pairCount: 0,
        pairs: [],
        trendingPairs: [],
        currentProject: null,
        selectedNfts: [],
        selectedNftsIn: [],
        selectedNftsOut: [],
        tokenSelected: "",
        casDeposit: "",
        casWithdraw: "",
        casPrice: 0,
        didSelectNfts: false,
        isLoading: false,
    },
    mutations: {
        disconnectWallet: async function(state) {
            let web3 = new Web3(
                new Web3.providers.WebsocketProvider(
                    xdaiWebSocket
                )
            );
            state.web3 = web3;
            state.account = null;
        },
        setWeb3: async function(state, web3) {
            console.log("OLD ACCOUNT", state.account);
            if (state.web3 != null && state.account != null) {
                //   // state.web3 = null;
                return;
            }
            state.web3 = web3;
            state.account = (await web3.eth.getAccounts())[0];
            
            state.snafuNft = new web3.eth.Contract(ERC1155ABI, snafuNftAddress);
            state.snafu20 = new web3.eth.Contract(SNAFU20.abi, snafu20Address);

            console.log("NEW ACCOUNT", state.account);
            if (state.isLoaded || state.isLoading) {
                return;
            }
            state.isLoading = true;

            console.log("set Web3");
            state.isLoaded = true;
        },

/*         setCurrentProject(state, payload) {
            state.currentProject = payload;
        },
        setSelectedNfts(state, payload) {
            state.selectedNfts = payload;
        },
        setSelectedNftsIn(state, payload) {
            state.selectedNftsIn = payload;
        },

        setSelectedNftsOut(state, payload) {
            state.selectedNftsOut = payload;
        },
        setDidSelectNfts(state, payload) {
            state.didSelectNfts = payload;
        },
        setTokenSelected(state, payload) {
            state.tokenSelected = payload;
        },
        setCasWithdraw(state, payload) {
            state.casWithdraw = payload;
        },
        setCasDeposit(state, payload) {
            state.casDeposit = payload;
        },
        setCasPrice(state, payload) {
            state.casPrice = payload;
        },
 */    },
    actions: {
        connectWallet: async function(context) {
            console.log("connecting");

            context.state.web3 = null;
            const provider = await this._vm.$web3Modal.connect();
            // provider.clearCachedProvider();

            const web3 = new Web3(provider);
            context.commit("setWeb3", web3);

            // eslint-disable-next-line no-unused-vars
            provider.on("accountsChanged", (accounts) => {
                context.dispatch("connectWallet");
            });

            // Subscribe to chainId change
            // eslint-disable-next-line no-unused-vars
            provider.on("chainChanged", (chainId) => {
                //TODO: alert with wrong chain
                context.dispatch("connectWallet");
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
        },
        startWeb3: async function(context) {
            let web3 = new Web3(
                new Web3.providers.WebsocketProvider(
                    xdaiWebSocket
                )
            );
            if (this._vm.$web3Modal.cachedProvider) {
                //This is case where someone already connected
                const provider = await this._vm.$web3Modal.connect();
                web3 = new Web3(provider);
            }

            context.commit("setWeb3", web3);
        },
    }
}
