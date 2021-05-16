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
        <v-dialog
            v-model="dialog"
            width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                class="text-h6"
                icon
                style="background-color: whitesmoke;margin-bottom: 10px"
                small
                @click="askHelp"
                color="grey"
            >
              ?
            </v-btn>
          </template>
          <v-card>
            <v-toolbar
                light
            >
              <v-row>
                <v-col cols="8" offset="2" >
                  <v-card-title class="headline" style="justify-content: center; font-weight: lighter;" >
                    Who are we
                  </v-card-title>
                </v-col>
                <v-col cols="2" style="margin-top: 10px; text-align: right;">
                  <v-btn

                      icon
                      @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-toolbar>
            <v-card-text class="mt-15">
              <v-row style="padding: 0px 10%; margin-bottom: 30px">
                <v-col  cols="4" style="text-align: center">
                  <a class="modalSocials">twitter</a>
                </v-col>
                <v-col  cols="4" style="text-align: center">
                  <a class="modalSocials">telegram</a>
                </v-col>
                <v-col cols="4" style="text-align: center">
                  <a class="modalSocials">github</a>
                </v-col>
              </v-row>
              <v-row class="modalBody" >

              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
<!--        <span>Add SNAFU to Metamask</span>-->
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
  data() {
    return {
      dialog: false,
      showConfirmSwap: false,
    };
  },
    methods:{
        ...mapActions("connectweb3", ["connectWallet", "addSnafuToMetamask", "disconnectWallet"]),
      askHelp() {
        this.showConfirmSwap = true;
      }
    },
    computed:{
        ...mapFields("connectweb3", ["isConnected", "account", 'chainId']),
        ...mapGetters("connectweb3", ["isMetamask", "isXdai"])
    }

}
</script>

<style>
.modalSocials {
  font-weight: bold; font-size: 25px
}
a.modalSocials:hover {
  color: #000000a3 !important;
}
.modalBody {
  height: 300px;
  margin: 30px 30px;
  border: #00000045;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}
</style>