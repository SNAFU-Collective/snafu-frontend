import Vue from 'vue'
import Vuex from 'vuex'
import connectweb3 from "./modules/connectweb3"
import nftContract from "./modules/nftContract"
import prizeContract from "./modules/prizeContract"
import transferNFTs from "./modules/transferNFTs"
import farming from "./modules/farming"
import leaderboard from "./modules/leaderboard"

import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters:{
    getField
  },
  mutations: {
    updateField
  },
  actions: {
  },
  modules: {
    connectweb3,
    nftContract,
    prizeContract,
    transferNFTs,
    farming,
    leaderboard,
  }
})
