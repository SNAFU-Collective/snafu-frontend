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
  .walletconnect-modal__base {
    transform: translateY(0%) !important;
    top: 80px !important;
  }
  .walletconnect-qrcode__base{
    background: rgba(37, 41, 46, 0) !important;
  }
  .walletconnect-modal__header > p:nth-child(2) {
    color: #3b99fc;
  }

  .chnMFN web3modal-modal-card{
    max-width: 50% !important;
    margin-left: 25% !important;
  }

  .cKKrkP .web3modal-modal-container {
    display: block !important;
  }
}

/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 600px) {
  .walletconnect-modal__base{
    transform: translateY(0%) !important;
    top: 50px !important;
  }
  .chnMFN web3modal-modal-card{
    max-width: 80% !important;
    margin-left: 10% !important;
  }

  .cKKrkP .web3modal-modal-container {
    display: block !important;
  }
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
