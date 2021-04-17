<template>
    <div v-if="!isConnected">
      <v-btn @click="connectWallet" style="margin-bottom: 10px">
          Connect wallet
      </v-btn>
    </div>
    <div v-else>
      <v-chip
          color="rgb(245, 245, 245)"
          text-color="black"
          style="margin-bottom: 10px; padding-left: 0"
      >
            <v-chip

          color="rgb(228 228 228)"
          text-color="black"
        >
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
              {{account | abbreviateAddress}}
        </v-chip>
       <span style="padding-left: 5px">{{chainId | networkName}}</span>
      </v-chip>
<!--        <snafu-balance />-->
    </div>
</template>

<script>
import {mapActions} from "vuex";
import { mapFields } from 'vuex-map-fields';
import SnafuBalance from './SnafuBalance.vue';

export default {
  // components: { SnafuBalance },
  components: {  },
    methods:{
        ...mapActions("connectweb3", ["connectWallet"])
    },
    computed:{
        ...mapFields("connectweb3", ["isConnected", "account", 'chainId'])
    }

}
</script>

<style>

</style>