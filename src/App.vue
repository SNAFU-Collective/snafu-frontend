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
.walletconnect-modal__base{
  transform: translateY(0%) !important;
  top: 50px !important;
}
</style>
