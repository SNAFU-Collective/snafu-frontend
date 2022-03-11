import {getField, updateField} from 'vuex-map-fields'
import {leaderboardAddressToFilter} from "../../utils/constants"
import axios from "axios"
import {orderBy} from "lodash"

export default {
    namespaced: true,
    state: {
        leaderboard: [],
        lastUpdate: "",
    },
    getters: {
        getField,
    },
    mutations: {
        updateField,
        setLeaderboard: (state, payload) => state.leaderboard = payload,
        setLastUpdated: (state, payload) => state.lastUpdate = payload,
    },
    actions: {
        async getLeaderboard(context) {
            let res = await axios.get("https://raw.githubusercontent.com/SNAFU-Collective/leaderboard/main/latest.json");

            let leaderboard = res.data.leaderboard.filter(
                (item) => !leaderboardAddressToFilter.includes(item.address)
            );

            leaderboard = orderBy(leaderboard, ['totalValue'],['desc'])

            context.commit("setLeaderboard", leaderboard)
            context.commit("setLastUpdated", new Date(res.data.lastUpdate).toLocaleString('en'))
        },
        async getUserRank(context, address) {
            const isUserAddress = (element) => element.address === address;
            let position = context.state.leaderboard.findIndex(isUserAddress)

            return position + 1
        },
        async getUserTotalPoints(context, address) {
            const isUserAddress = (element) => element.address === address;
            let data = context.state.leaderboard.find(isUserAddress)

            return data.totalValue
        }
    },
}