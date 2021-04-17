<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "App",

  components: {
  },

  methods: {
    ...mapActions("connectweb3", ["startWeb3"]),
  },
  beforeMount(){
    this.startWeb3()
  },
  data: () => ({
    //
  }),
};
</script>

<style>
/* On screens that are 992px or less, set the background color to blue */
@media screen and (min-width: 600px) {
  .walletconnect-modal__base .web3modal-modal-card{
    transform: translateY(0%) !important;
    top: 15px !important;
  }
  .walletconnect-qrcode__base .web3modal-modal-card{
    background: rgba(37, 41, 46, 0) !important;
  }
  .walletconnect-modal__header > p:nth-child(2) {
    color: #3b99fc;
  }
}

/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 600px) {
  .walletconnect-modal__base{
    transform: translateY(0%) !important;
    top: 50px !important;
  }
}
</style>
