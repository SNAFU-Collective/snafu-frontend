<template>
    <div v-if="!isConnected">
      <v-btn @click="connectWallet" style="margin-bottom: 10px">
          Connect wallet
      </v-btn>
    </div>
    <v-row no-gutters v-else>
      <v-col cols="10">
      <v-chip
          :color="isXdai ? '#3EBD6A' : '#bc423e'"
          :text-color="isXdai ? '#fff' : '#fff'"
          style="margin-bottom: 10px; padding-left: 0"
      >
        <v-chip
          color="#e4e4e499"
          text-color="black"
          style="border: #A7A7A7"
        >
          <v-avatar left >
            <v-icon color="#fff">mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          <span style="color: rgba(0, 0, 0, 0.6); font-weight: 500">{{account | abbreviateAddress}}</span>
        </v-chip>
       <span style="padding-left: 5px; font-weight: 500">{{chainId | networkName}}</span>
      </v-chip>
      </v-col>

      <v-col cols="1"  v-if="isMetamask">
        <v-tooltip bottom color="rgb(0 0 0 / 89%)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="grey"
              dark
              v-bind="attrs"
              v-on="on"
              class="text-h6"
              icon
              style="background-color: whitesmoke;margin-bottom: 10px"
              small
              @click="addSnafuToMetamask"

          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add SNAFU to Metamask</span>
      </v-tooltip>
      </v-col>
      <v-col cols="1"  v-if="isConnected">
        <v-tooltip bottom color="rgb(0 0 0 / 89%)">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="grey"
                dark
                v-bind="attrs"
                v-on="on"
                class="text-h6"
                icon
                style="background-color: whitesmoke;margin-bottom: 10px;"
                small
                @click="disconnectWallet"

            >
              <v-icon size="22px">mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Disconnect</span>
        </v-tooltip>
      </v-col>
    </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { mapFields } from 'vuex-map-fields';
//import SnafuBalance from './SnafuBalance.vue';

export default {
  // components: { SnafuBalance },
  components: {  },
    methods:{
        ...mapActions("connectweb3", ["connectWallet", "addSnafuToMetamask", "disconnectWallet"])
    },
    computed:{
        ...mapFields("connectweb3", ["isConnected", "account", 'chainId']),
        ...mapGetters("connectweb3", ["isMetamask", "isXdai"])
    }

}
</script>

<style>

</style>