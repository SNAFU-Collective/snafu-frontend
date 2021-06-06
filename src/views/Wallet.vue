<template>
  <div>
    <v-container>
      <v-row class="ma-5 justify-center" id="mainRowStatus" style="padding-top: 70px; display: grid;">
        <v-row  style="width: 350px">
          <v-col cols="12" justify="center" >
            <wallet-status class="mt-5"/>
          </v-col>
        </v-row>
        <v-row style="margin-top: -15px; width: 350px">
          <v-col cols="12" justify="center" >
            <SnafuBalance />
          </v-col>
        </v-row>
      </v-row>
      <v-row justify="center" class="pt-10"><strong>Your NFTs</strong></v-row>
      <v-row v-if="nfts" justify="center"><strong>Total: {{nfts.length}}</strong></v-row>
      <v-row justify="center">
        <nft-select-card
            :nft="nft"
            v-for="nft in nftsToSelect"
            :key="nft.id"
            class="ma-5"
            :withdrawFromPool="false"
            :hideSelect="true"
        />
        <v-row v-if="nftToFetch" justify="center" class="my-3">
          <v-progress-circular
            size="40"
            indeterminate
            color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="nftsToSelect.length === 0" class="text-body-2 my-5">
          No SNAFU NFTs found in your wallet.
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex"
import NftSelectCard from '../components/Collection/NftSelectCard.vue'
import WalletStatus from "../components/Wallet/WalletStatus"
import SnafuBalance from '../components/Wallet/SnafuBalance.vue';
import {mapFields} from "vuex-map-fields"

export default {
  components: {NftSelectCard, WalletStatus, SnafuBalance},
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapState("nftContract", {
      nfts(state) {
        return state[this.account];
      },
      nftToFetch(state) {
        return state[this.account] == undefined
      },
    }),
    nftsToSelect() {
      return this.nfts
    }
  }
}
</script>

<style>
@media screen and (max-width: 768px) {
  #mainRowStatus {
    padding-top: 0px !important;
  }
}
</style>
