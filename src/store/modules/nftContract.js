import { getField, updateField } from 'vuex-map-fields';
import { snafuNftAddress, snafu20Address } from "../../utils/constants";
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
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            context.dispatch("getNftsFromAddress", { address: userAddress, pool: false })
        },
        async getNftsFromPool(context) {
            context.dispatch("getNftsFromAddress", { address: snafu20Address, pool: true })
        },
        async transferNftToPool(context){
            let erc1155 = context.rootGetters["connectweb3/getUserNftSnafu"];
            let userAddress = context.rootGetters["connectweb3/getUserAccount"];
            let nftId = context.state.selectedNft.id;
            let selectedQuantity = context.state.selectedQuantity;

            //TODO: 
            return erc1155.methods.safeTransferFrom(userAddress, snafu20Address, nftId, selectedQuantity, "0x0").send({from: userAddress});

        },
        async getNftsFromAddress(context, payload) {
            let erc1155 = context.rootGetters["connectweb3/getNftSnafu"];
            let { address, pool } = payload;
            //console.log(erc1155)
            //let events = await erc1155.getPastEvents("TransferSingle", { fromBlock: minBlock, toBlock: 'latest' });
            //console.log(events)

            let events = await erc1155.getPastEvents('TransferSingle', {
                filter: {
                    _to: address
                },
                fromBlock: minBlock,
                toBlock: 'latest'
            });

            let nfts = [];

            if (Array.isArray(events)) {
                events = events.reverse();
                for (let i = 0; i < events.length; i++) {
                    if (typeof events[i] == 'object') {
                        let nftIndex = nfts.findIndex(n => n.id === events[i].returnValues._id);
                        if (nftIndex === -1) {
                            nfts.push({ id: events[i].returnValues._id, editions: events[i].returnValues._value });
                        } else {
                            nfts[nftIndex].editions += events[i].returnValues._value;
                        }
                    }
                }
            }

            events = await erc1155.getPastEvents('TransferBatch', {
                filter: {
                    _to: address
                },
                fromBlock: minBlock,
                toBlock: 'latest'
            });

            if (Array.isArray(events)) {
                events = events.reverse();
                for (let i = 0; i < events.length; i++) {
                    if (typeof events[i] == 'object') {
                        for (let j = 0; j < events[i].returnValues[3].length; j++) {
                            let nftIndex = nfts.find(n => n.id === events[i].returnValues[3][j])
                            if (nftIndex === -1) {
                                nfts.push({ id: events[i].returnValues[3][j], editions: events[i].returnValues[4][j] });
                            } else {
                                nfts[nftIndex].editions += events[i].returnValues[4][j];
                            }
                        }
                    }
                }
            }

            let accounts = Array(nfts.length).fill(address);
            let ids = nfts.map((n) => n.id)
            let balances = await erc1155.methods.balanceOfBatch(accounts, ids).call();
            let results = []

            for(let i = 0; i < ids.length; i++){
                results.push({id: ids[i], editions: balances[i]})
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