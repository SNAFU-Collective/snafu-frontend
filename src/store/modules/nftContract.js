import { getField, updateField } from 'vuex-map-fields';
import { snafuNftAddress, snafu20Address } from "../../utils/constants";
//Block when the collection was deployed
const minBlock = 14958798;
export default {
    namespaced: true,
    state: {
        poolNFTs: [],
        poolSync: false
    },
    getters: {
        getField
    },
    mutations: {
        updateField,
        setNftPool: (state, payload) => { state.poolNFTs = payload; state.poolSync = true }
    },
    actions: {
        async getNftsFromPool(context) {
            context.dispatch("getNftsFromAddress", snafu20Address)
        },
        async getNftsFromAddress(context, address) {
            let erc1155 = context.rootGetters["connectweb3/getNftSnafu"];
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
            console.log(events)

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

            //TODO: sottrarre gli nft ritirati!

            console.log(events);
            console.log(nfts);
            nfts.sort((a,b) => {
                return +b.id - +a.id
            })
            context.commit("setNftPool", nfts)

        }
    }
}