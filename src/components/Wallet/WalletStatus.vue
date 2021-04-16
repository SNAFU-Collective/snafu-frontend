<template>
    <div v-if="!isConnected">
      <v-btn @click="connectWallet">
          Connect wallet
      </v-btn>
    </div>
    <div v-else>
            <v-chip
          class="ma-2"
          color="rgb(245, 245, 245)"
          text-color="black"
        >
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
              {{account.slice(0, 6)}}...{{account.slice(account.length -4, account.length)}}
        </v-chip>
        <snafu-balance />
    </div>
</template>

<script>
import {mapActions} from "vuex";
import { mapFields } from 'vuex-map-fields';
import SnafuBalance from './SnafuBalance.vue';

export default {
  components: { SnafuBalance },
    methods:{
        ...mapActions("connectweb3", ["connectWallet"])
    },
    computed:{
        ...mapFields("connectweb3", ["isConnected", "account"])
    }

}
</script>

<style>

</style>