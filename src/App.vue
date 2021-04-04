<template>
  <v-app>
    <v-main>
      <connect-wallet />
    </v-main>
  </v-app>
</template>

<script>
import ConnectWallet from "./components/ConnectWallet.vue";
import {mapActions} from "vuex"

export default {
  name: "App",

  components: {
    ConnectWallet,
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
