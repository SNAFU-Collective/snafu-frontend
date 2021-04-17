import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import Web3Modal from "web3modal";
import web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "axios";
import VueAxios from "vue-axios";
import AsyncComputed from "vue-async-computed";
import {xdaiRPC} from "./utils/constants"

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(AsyncComputed);

const providerOptions = {
  walletconnect: {
      package: WalletConnectProvider, // required
      options:{
      rpc: {
        100: xdaiRPC
      },
    }
  },
};

const web3Modal = new Web3Modal({
  network: "xdai", // optional
  cacheProvider: false, // optional
  providerOptions, // required
});


Vue.prototype.$web3Modal = web3Modal;

Vue.filter('fromWei', function (value) {
  if (!value) return '0'
  return web3.utils.fromWei(value);
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

