import Vue from 'vue'
import Vuex from 'vuex'
import connectweb3 from "./modules/connectweb3"
import nftContract from "./modules/nftContract"

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
    nftContract
  }
})
