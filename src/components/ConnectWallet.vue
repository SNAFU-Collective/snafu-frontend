<template>
  <v-btn @click="connectWallet">
      Connect wallet
  </v-btn>
</template>

<script>
import {mapActions} from "vuex";
export default {
    methods:{
        ...mapActions("connectweb3", ["connectWallet"])
    }

}
</script>

<style>

</style>