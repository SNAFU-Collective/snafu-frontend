<template>
  <v-container>
    <div class="allNFTsContainer" style="padding-top: 20px;">
      <v-row justify="center" class="pt-15">
        <router-link class="backHome" :to="{ name: 'Leaderboard'}" style="display: flex">
          <v-icon class="backIcon">mdi-arrow-left</v-icon>  BACK
        </router-link>
      </v-row>
      <v-row justify="center" class="pt-15" style="display: block; text-align: center">
        <vth-blockie :string="$route.params.address"/>
        <h3><a class="addressLink" style="text-decoration: unset;" :href="'https://blockscout.com/poa/xdai/address/'+$route.params.address" target="_blank">{{$route.params.address }} <v-icon style="font-size: 0.8em; color:black"> mdi-open-in-new </v-icon></a></h3>
      </v-row>
      <v-row v-if="nfts" justify="center"><strong>Total: {{ nfts.length }} NFTs</strong></v-row>
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
  mounted(){
        this.getNftsByAddress(this.$route.params.address)
  },
  computed: {
    ...mapState("nftContract", {
      nfts(state) {
        return state[this.$route.params.address]
      },
      nftToFetch(state) {
        return state[this.$route.params.address] == undefined
      },
    }),
    nftsToSelect() {
      return this.nfts
    },
  },
}
</script>

<style>
.backHome:hover > .backIcon {
  color: rgb(219, 219, 219) !important;
}

.backIcon:before  {
  font-size: 18px;
  margin-right: 5px;
}

.addressLink:hover {
  text-decoration: underline !important;
}
</style>
