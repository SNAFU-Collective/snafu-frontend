import { getField, updateField } from 'vuex-map-fields';
import { snafuNftAddress, snafu20Address } from "../../utils/constants";
import { ethers } from "ethers";

//Block when the collection was deployed
const minBlock = 14958798;

export default {
    namespaced: true,
    state: {
        poolNFTs: [],
        userNFTs: [],

        poolSync: false,
        userSync: false,

        selectedNft: null,
        selectedNftMetadata: null,
        selectedQuantity: 0
    },
    getters: {
        getField
    },
    mutations: {
        updateField,
        setNftPool: (state, payload) => { state.poolNFTs = payload; state.poolSync = true },
        setNftUser: (state, payload) => { state.userNFTs = payload; state.userSync = true },
        resetSelectedNft: (state) => {
            state.selectedNft = null;
            state.selectedNftMetadata = null;
            state.selectedQuantity = 0;
        }
    },
    actions: {
        async getNftsFromUser(context) {
            console.log("updating nfts for user")
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            context.dispatch("getNftsFromAddress", { address: userAddress, pool: false })
        },
        async getNftsFromPool(context) {
            console.log("updating nfts for pool")
            context.dispatch("getNftsFromAddress", { address: snafu20Address, pool: true })
        },
        async transferNftToPool(context){
            let erc1155 = context.rootGetters["connectweb3/getUserNftSnafu"];
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            let nftId = context.state.selectedNft.id;
            let selectedQuantity = context.state.selectedQuantity;
            return erc1155.safeTransferFrom(userAddress, snafu20Address, nftId, selectedQuantity, ethers.utils.hexlify("0x00"),  {gasPrice: "1000000000"});
        },
        async withdrawNftFromPool(context){
            let snafuContract = context.rootGetters["connectweb3/getUserSnafu20"];
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            let nftId = context.state.selectedNft.id;
            let selectedQuantity = context.state.selectedQuantity;
            return snafuContract.withdraw([nftId], [selectedQuantity], userAddress,  {gasPrice: "1000000000"});
        },

        //event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
        //event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);
        async getNftsFromAddress(context, payload) {
            let erc1155 = context.rootGetters["connectweb3/getNftSnafu"];
            let { address, pool } = payload;
            let filterSingleTo = erc1155.filters.TransferSingle(null, null, address);
            let events = await erc1155.queryFilter(filterSingleTo, minBlock)


            let nfts = [];

                for (let i = 0; i < events.length; i++) {
                    if (typeof events[i] == 'object') {
                        let nftIndex = nfts.findIndex(n => n.id === events[i].args._id.toString());
                        if (nftIndex === -1) {
                            nfts.push({ id: events[i].args._id.toString()});
                        }
                    }
                }
            

            let filterBatchTo = erc1155.filters.TransferBatch(null, null, address)
            events = await erc1155.queryFilter(filterBatchTo, minBlock)

                for (let i = 0; i < events.length; i++) {
                    if (typeof events[i] == 'object') {
                        for (let j = 0; j < events[i].args[3].length; j++) {
                            let nftIndex = nfts.find(n => n.id === events[i].args[3][j].toString())
                            if (nftIndex === -1) {
                                nfts.push({ id: events[i].args[3][j].toString()});
                            }
                        }
                    }
                
            }

            let accounts = Array(nfts.length).fill(address);
            let ids = nfts.map((n) => n.id)
            let balances = await erc1155.balanceOfBatch(accounts, ids);
            let results = []

            for(let i = 0; i < ids.length; i++){
                results.push({id: ids[i], editions: balances[i].toString()})
            }


            results = results.filter(n => n.editions > 0);

            results.sort((a, b) => {
                return +b.id - +a.id
            })

            if (pool) {
                context.commit("setNftPool", results)
            } else {
                context.commit("setNftUser", results)
            }

        }
    }
}