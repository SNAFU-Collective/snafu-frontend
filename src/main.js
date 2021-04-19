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
import {xdaiRPC} from "./utils/constants"
import VNumeric from 'vuetify-numeric/vuetify-numeric.umd.min'

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(VNumeric);

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

Vue.filter('networkName', function (value) {
    console.log('networknamevalue', value)
  if (value === 100 || value === '0x64'){
      return 'xDai'
  } else {
      return 'Wrong network'
  }
})

Vue.filter('abbreviateAddress', (value) => {
    if (!value)
        return ''

    return value.slice(0, 6) + '...' + value.slice(value.length -4, value.length)
})

Vue.filter('truncatePrice', (value) => {
    if (!value)
        return ''

    return Number(Number(value).toFixed(6))
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

