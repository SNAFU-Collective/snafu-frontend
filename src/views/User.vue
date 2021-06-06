<template>
  <v-container>
    <div class="allNFTsContainer" style="padding-top: 20px;">

      <v-row justify="center" class="pt-15" style="display: block; text-align: center">
                <vth-blockie :string="$route.params.address" />
        <h3>{{ $route.params.address }}</h3>
      </v-row>
      <v-row v-if="nfts" justify="center"><strong>Total: {{ nfts.length }}</strong></v-row>
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
          No SNAFU NFTs found in this wallet.
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex"
import NftSelectCard from '../components/Collection/NftSelectCard.vue'
import WalletStatus from "../components/Wallet/WalletStatus"
import SnafuBalance from '../components/Wallet/SnafuBalance.vue'
import {mapFields} from "vuex-map-fields"

export default {
  components: {NftSelectCard},
  data() {
    return {}
  },
  methods: {
    ...mapActions("nftContract", ["getNftsByAddress"]),
  },
  computed: {
    ...mapState("nftContract", {
      nfts(state) {
        this.getNftsByAddress(this.$route.params.address);
        return state[this.$route.params.address]
      },
      nftToFetch(state) {
        return state[this.$route.params.address] == undefined
      },
    }),
    nftsToSelect() {
      return this.nfts
    },
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
