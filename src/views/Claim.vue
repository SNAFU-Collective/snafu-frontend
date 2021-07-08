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
      <v-row justify="center" class="pt-10"><strong>NFTs to claim</strong></v-row>
      <v-row v-if="nfts" justify="center"><strong>Total: {{nfts.length}}</strong></v-row>
      <v-row justify="center">
        <nft-select-card
            :nft="nft"
            v-for="nft in nftsToSelect"
            :key="nft.id"
            class="ma-5"
            :withdrawFromPool="false"
            :hideSelect="true"
            :claim="true"
            @claimNft="handleClaim"
        />
        <v-row v-if="nftToFetch" justify="center" class="my-3">
          <v-progress-circular
            size="40"
            indeterminate
            color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="nftsToSelect.length === 0" class="text-body-2 my-5">
           No SNAFU prizes found in your wallet. <br />
           Partecipate in our PoolTogether to have a chance to win one! 
        </div>
      </v-row>

      <confirm-claim-modal
      :show="showConfirmClaim"
      @updateDialog="() => (showConfirmClaim = false)"
      v-if="showConfirmClaim"
      />
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex"
import NftSelectCard from '../components/Collection/NftSelectCard.vue'
import WalletStatus from "../components/Wallet/WalletStatus"
import SnafuBalance from '../components/Wallet/SnafuBalance.vue';
import {mapFields} from "vuex-map-fields"
import ConfirmClaimModal from '../components/Claim/ConfirmClaimModal.vue';

export default {
  components: {NftSelectCard, WalletStatus, SnafuBalance, ConfirmClaimModal},
  data(){
    return {
      showConfirmClaim: false
    }
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("prizeContract", ["selectedNft", "selectedQuantity"]),
    ...mapState("prizeContract", {
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
  },
  methods:{
    handleClaim(payload){
      console.log(payload)
      this.showConfirmClaim = true;
      this.selectedNft = payload.nft;
      this.selectedNftMetadata = payload.metadata;
      this.selectedQuantity = 1;
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
