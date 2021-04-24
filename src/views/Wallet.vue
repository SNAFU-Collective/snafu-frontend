<template>
  <div>
    <v-container>
      <v-row justify="center" style="padding-top: 100px">
        <v-col cols="6" justify="center" >
          <wallet-status class="mt-5"/>
        </v-col>
      </v-row>
      <v-row justify="center" style="margin-top: -15px">
        <v-col cols="6" justify="center" >
          <SnafuBalance />
        </v-col>
      </v-row>
      <v-row justify="center">
        <nft-select-card
            :nft="nft"
            v-for="nft in nftsToSelect"
            :key="nft.id"
            class="ma-5"
            :withdrawFromPool="true"
            :hideSelect="true"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {ethers} from "ethers"
import {mapActions, mapState} from "vuex"
import NftSelectCard from '../components/Collection/NftSelectCard.vue'
import WalletStatus from "../components/Wallet/WalletStatus"
import SnafuBalance from '../components/Wallet/SnafuBalance.vue';
import {mapFields} from "vuex-map-fields"

export default {
  components: {NftSelectCard, WalletStatus, SnafuBalance},
  data() {
    return {
      addressToSearch: null,
    }
  },
  methods: {
    ...mapActions("nftContract", ["getNftsByAddress"]),
  },
  computed: {
    isValidAddress() {
      return ethers.utils.isAddress()
    },
    ...mapState("nftContract", {
      nfts(state) {
        if (!this.isValidAddress) {
          return []
        }
        return state[this.addressToSearch]
      },
      nftToFetch(state) {
        if (!this.isValidAddress) {
          return true
        }

        return state[this.addressToSearch] == undefined
      },
    }),
    nftsToSelect() {
      return this.nfts
    },
    ...mapFields("connectweb3", ["account"]),
  },
  created(){
    this.getNftsByAddress(this.account)
  },
}
</script>

<style>
</style>
