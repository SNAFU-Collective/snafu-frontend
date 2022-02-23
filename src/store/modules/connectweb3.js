import {ethers} from "ethers"
import ERC1155ABI from "../../assets/abis/ERC1155.json"
import SNAFU20 from "../../assets/abis/SNAFU20Pair.json"
import SNAFU721 from "../../assets/abis/SNAFU721.json"
import FARM from "../../assets/abis/UNIFTY_FARM.json"
import SNAFUXDAILP from "../../assets/abis/SNAFUXDAILP.json"

import detectEthereumProvider from '@metamask/detect-provider';

import {
    snafu20Address,
    snafuNftAddress,
    snafu721Address,
    xdaiRPC,
    commonFarmAddress,
    xDaiSnafuLiquidityAddress,
    pSnafuAddress
} from "../../utils/constants"

import {getField, updateField} from 'vuex-map-fields'

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
        snafuLockedSupply: 0,
        snafuCirculatingSupply: 0,
        snafuFee: 0,
        chainId: null,
        xDaiBalance: 0,
        xDaiSnafuLP: null,
        pSnafu: null,
        pSnafuBalance: 0,
        pSnafuSupply: 0,
        xDaiSnafuLPBalance: 0,
        xDaiSnafuLPSupply: 1,
    },
    getters: {
        getField,
        getSnafu20: (state) => state.snafu20,
        getNftSnafu: (state) => state.snafuNft,
        getUserNftSnafu: (state) => state.connected.snafuNft,
        getUserSnafu721: (state) => state.connected.snafu721,
        getSnafu721: (state) => state.snafu721,
        getCommonFarm: (state) => state.commonFarm,
        getUserSnafu20: (state) => state.connected.snafu20,
        getUserAccount: (state) => state.account,
        getUserSigner: (state) => state.connected.signer,
        isMetamask: async (state) => {
            if (state.connected.web3 && state.connected.web3.provider.isMetamask && !state.connected.web3.provider.isMetamask()) {
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
        },
    },
    mutations: {
        updateField,
        setConnected: (state, payload) => state.isConnected = payload,
        setSnafuBalance: (state, payload) => state.snafuBalance = payload,
        setxDaiBalance: (state, payload) => state.xDaiBalance = payload,
        setSnafuSupply: (state, payload) => state.snafuSupply = payload,
        setSnafuLockedSupply: (state, payload) => state.snafuLockedSupply = payload,
        setSnafuCirculatingSupply: (state, payload) => state.snafuCirculatingSupply = payload,
        setSnafuFee: (state, payload) => state.snafuFee = payload,
        setSnafuXDaiLPBalance: (state, payload) => state.xDaiSnafuLPBalance = payload,
        setSnafuXDaiLPSupply: (state, payload) => state.xDaiSnafuLPSupply = payload,
        setPSnafuSupply: (state, payload) => state.pSnafuSupply = payload,
        setPSnafuBalance: (state, payload) => state.pSnafuBalance = payload,
        disconnectWallet: async function (state) {
            state.connected = {}
            state.account = null
        },
    },
    actions: {
        setWeb3: async function (context, payload) {
            let {web3, connected} = payload
            let state = context.state
            console.log("connected", connected)

            if (connected) {
                state = context.state.connected
                state.web3 = web3
                let signer = await web3.getSigner()
                state.signer = signer
                context.state.account = (await signer.getAddress())
                context.state.chainId = (await web3.getNetwork()).chainId
                //console.log('Chain ID: ', context.state.chainId)
                context.dispatch("nftContract/getNftsFromUser", null, {root: true})
                context.dispatch("prizeContract/getNftsFromUser", null, {root: true})


                state.snafuNft = await new ethers.Contract(snafuNftAddress, ERC1155ABI, signer)
                state.snafu721 = await new ethers.Contract(snafu721Address, SNAFU721.output.abi, signer)
                state.snafu20 = await new ethers.Contract(snafu20Address, SNAFU20, signer)
                state.commonFarm = await new ethers.Contract(commonFarmAddress, FARM, signer)
                state.xDaiSnafuLP = await new ethers.Contract(xDaiSnafuLiquidityAddress, SNAFUXDAILP, signer)
                state.pSnafu = await new ethers.Contract(pSnafuAddress, SNAFUXDAILP, signer)
            } else {
                state.web3 = web3
                state.snafuNft = await new ethers.Contract(snafuNftAddress, ERC1155ABI, web3)
                state.snafu721 = await new ethers.Contract(snafu721Address, SNAFU721.output.abi, web3)
                state.snafu20 = await new ethers.Contract(snafu20Address, SNAFU20, web3)
                state.commonFarm = await new ethers.Contract(commonFarmAddress, FARM, web3)
                state.xDaiSnafuLP = await new ethers.Contract(xDaiSnafuLiquidityAddress, SNAFUXDAILP, web3)
                state.pSnafu = await new ethers.Contract(pSnafuAddress, SNAFUXDAILP, web3)
                context.dispatch("nftContract/getNftsFromPool", null, {root: true})
                context.dispatch("nftContract/getAllNfts", null, {root: true})
                context.dispatch("updateSnafu20Supply")
                context.dispatch("updateSnafu20Fee")
            }

            console.log("setting Web3")
        },
        connectWallet: async function (context) {
            console.log("connecting")

            let provider, hasProvider
            try {
                provider = await this._vm.$web3Modal.connect()
                hasProvider = true
            } catch (err) {
                await context.dispatch("disconnectWallet")
                hasProvider = false
            }

            if (hasProvider) {
                const web3 = new ethers.providers.Web3Provider(provider)
                await context.dispatch("setWeb3", {web3, connected: true})
                context.commit("setConnected", true)
                context.dispatch("updateSnafu20Balance")

                // eslint-disable-next-line no-unused-vars
                provider.on("accountsChanged", (accounts) => {
                    context.dispatch("connectWallet")
                    //Reset Selected NFT
                    context.commit("nftContract/resetSelectedNft", null, {root: true})

                    //Update balances
                    context.dispatch("updatexDaiBalance")
                    context.dispatch("updatePSnafuBalance")
                    context.dispatch("updateSnafuxDaiLPBalance")
                })

                // Subscribe to chainId change
                provider.on("chainChanged", (chainId) => {
                    context.state.chainId = chainId
                    context.commit("nftContract/resetSelectedNft", null, {root: true})
                    console.log('Chain ID: ', context.state.chainId)
                })

                // Subscribe to provider disconnection
                // eslint-disable-next-line no-unused-vars
                provider.on("disconnect", (error) => {
                    console.log('provider disconnect', error)
                    context.commit("nftContract/resetSelectedNft", null, {root: true})
                    context.dispatch("disconnectWallet")
                })
            }
        },
        disconnectWallet: async function (context) {
            await this._vm.$web3Modal.clearCachedProvider()
            context.commit("disconnectWallet")
            context.commit("nftContract/resetSelectedNft", null, {root: true})
            context.commit("setConnected", false)
        },
        startWeb3: async function (context) {
            let web3 = new ethers.providers.JsonRpcProvider(xdaiRPC)

            context.dispatch("setWeb3", {web3, connected: false})

            if (this._vm.$web3Modal.cachedProvider) {
                //This is case where someone already connected
                context.dispatch("connectWallet")
            }

        },
        async updateSnafu20Balance(context) {
            let contract = context.state.snafu20
            let account = context.state.account
            console.log("updatingBalance")
            let balance = await contract.balanceOf(account)
            context.commit("setSnafuBalance", balance.toString())
        },
        async updatexDaiBalance(context) {
            console.log("updating xdai Balance")
            let account = context.state.account
            await context.state.web3.getBalance(account).then(async (balance) => {
                console.log('updated xdai balance', balance.toString())
                context.commit("setxDaiBalance", ethers.utils.formatEther(balance))
            })
        },
        async updateSnafuxDaiLPBalance(context) {
            console.log("updateSnafuxDaiLPBalance")
            let contract = context.state.xDaiSnafuLP
            let account = context.state.account
            let balance = await contract.balanceOf(account)
            context.commit("setSnafuXDaiLPBalance", balance.toString())

            let supply = await contract.totalSupply()
            context.commit("setSnafuXDaiLPSupply", ethers.utils.formatEther(supply))
        },
        async updatePSnafuBalance(context) {
            console.log("updatePSnafuBalance")
            let contract = context.state.pSnafu
            let account = context.state.account
            let balance = await contract.balanceOf(account)
            context.commit("setPSnafuBalance", balance.toString())

            let supply = await contract.totalSupply()
            context.commit("setPSnafuSupply", ethers.utils.formatEther(supply))
        },
        async updateSnafu20Supply(context) {
            let contract = context.state.snafu20
            console.log("updatingSupply")
            let supply = await contract.totalSupply()
            context.commit("setSnafuSupply", supply.toString())
            context.dispatch("updateSnafu20LockedSupply")
        },
        async updateSnafu20LockedSupply(context) {
            const stakingPoolAddress = '0x09aAB5cE8e2F5f7De524FC000971c57f9E5E2B55'
            let contract = context.state.snafu20

            let vestedBalance = await contract.balanceOf(stakingPoolAddress)
            context.commit("setSnafuLockedSupply", vestedBalance.toString())

            let circulatingSupply = ethers.utils.formatEther(context.state.snafuSupply) - ethers.utils.formatEther(vestedBalance)
            context.commit("setSnafuCirculatingSupply", (ethers.utils.parseUnits(circulatingSupply.toString())).toString())
        },
        async updateSnafu20Fee(context) {
            let contract = context.state.snafu20
            console.log("updatingFee")
            let fee = await contract.fee()
            context.commit("setSnafuFee", fee.toString())
        },
        async addSnafuToMetamask(context) {
            const tokenAddress = snafu20Address
            const tokenSymbol = 'SNAFU'
            const tokenDecimals = 18
            const tokenImage = 'https://gateway.pinata.cloud/ipfs/QmYFnC1RxAvNzWFmtR5CQYWBz8pgzDidqQKg8o1WVqppEq'

            try {
                await context.state.connected.web3.provider.request({
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
                })
            } catch (error) {
                console.log(error)
            }
        },
        //Updates fees, balance, nfts ... to use after transactions!
        updateData(context) {
            context.dispatch("updateSnafu20Fee")
            context.dispatch("updateSnafu20Supply")
            context.dispatch("updateSnafu20LockedSupply")
            context.dispatch("updateSnafu20Balance")
            context.dispatch("nftContract/getNftsFromPool", null, {root: true})
            context.dispatch("nftContract/getAllNfts", null, {root: true})
            context.dispatch("nftContract/getNftsFromUser", null, {root: true})
            context.dispatch("prizeContract/getNftsFromUser", null, {root: true})

        },
        async addGnosisChainNetwork() {
            const provider = await detectEthereumProvider();

            provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x64'}],
            })
                .then((res) => {
                    console.log('switch', res)
                })
                .catch((e) => {
                    if (e.code === 4902) {
                        provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x64',
                                    chainName: 'Gnosis Chain',
                                    nativeCurrency: {
                                        name: 'xDai',
                                        symbol: 'xDai', // 2-6 characters long
                                        decimals: 18,
                                    },
                                    rpcUrls: ['https://rpc.xdaichain.com/'],
                                    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
                                },
                            ],
                        })
                    }
                })
        },
    },
}
