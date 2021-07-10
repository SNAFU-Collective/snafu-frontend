<template>
  <div>
    <v-container>
      <v-row id="mainRow" justify="center" style="display: grid; padding-top: 100px">
        <wallet-status class="mt-5 pb-2"/>
        <swap-card />
      </v-row>
    </v-container>
    <v-container>
      <v-row
        class="mt-0 justify-center"
        id="mainRowStatus"
        style="padding-top: 70px; display: grid"
      >
      </v-row>
      <v-row justify="center"  class="pt-15">
        <h2>CLAIM</h2>
      </v-row>
      <v-row justify="center">
        <nft-select-card
          :nft="nft"
          v-for="nft in nftsToClaim"
          :key="nft.id * Math.random()"
          class="ma-5"
          :withdrawFromPool="false"
          :hideSelect="true"
          :claim="true"
          @claimNft="handleClaim"
        />
        <v-row v-if="nftsToClaimLoading" justify="center" class="my-3">
          <v-progress-circular
            size="40"
            indeterminate
            color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="nftsToClaim.length === 0" class="text-body-2 my-50 mt-10 mb-10" style="text-align: center">
           <span style="font-size: 13px; text-align: center">
          No SNAFU Prizes found in your wallet. <br />
          Partecipate in our PoolTogether to have a chance to win one!
           </span>
        </div>
      </v-row>
      <v-row justify="center" class="pt-15" style="margin-top: 100px"
        >
          <h2>REDEEM</h2>
        </v-row
      >

      <v-row justify="center">
        <nft-select-card
          :nft="nft"
          v-for="nft in posterNftsToBurn"
          :key="nft.id"
          class="ma-5"
          :withdrawFromPool="false"
          :hideSelect="true"
          :claim="false"
          :burn="true"
          @burnNft="handleBurn"
        />
        <v-row v-if="posterNftsLoading" justify="center" class="my-3">
          <v-progress-circular
            size="40"
            indeterminate
            color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="posterNftsToBurn.length === 0" class="text-body-2 my-50 mt-10 mb-10" style="text-align: center">
          <span style="font-size: 13px; text-align: center">Here will appear your SNAFU Prizes found in your wallet. <br />
            Partecipate in our PoolTogether to have a chance to win one!</span>
        </div>
      </v-row>

      <v-row no-gutters class="pt-10 justify-center">
<!--      <claim-form />-->
      </v-row>

      <confirm-claim-modal
        :show="showConfirmClaim"
        @updateDialog="() => (showConfirmClaim = false)"
        v-if="showConfirmClaim"
      />

     <confirm-burn-modal
        :show="showConfirmBurn"
        @updateDialog="() => (showConfirmBurn = false)"
        v-if="showConfirmBurn"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NftSelectCard from "../components/Collection/NftSelectCard.vue";
import { mapFields } from "vuex-map-fields";
import ConfirmClaimModal from "../components/Claim/ConfirmClaimModal.vue";
import ConfirmBurnModal from "../components/Claim/ConfirmBurnModal.vue";
import ClaimForm from '../components/Claim/ClaimForm.vue';
import WalletStatus from "../components/Wallet/WalletStatus"

export default {
  components: { NftSelectCard, ConfirmClaimModal,
    // ClaimForm,
    ConfirmBurnModal,
    WalletStatus,
  },
  data() {
    return {
      showConfirmClaim: false,
      showConfirmBurn: false,

      //FIXME: cambiare con id token di poster!
      prizesId: ["6"],
    };
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("prizeContract", ["selectedNft", "selectedQuantity"]),
    ...mapState("prizeContract", {
      nfts721(state) {
        return state[this.account];
      },
      nftsToClaimLoading(state) {
        return state[this.account] == undefined;
      },
    }),
    nftsToClaim() {
      return this.nfts721;
    },
    ...mapState("nftContract", {
      posterNfts(state) {
        return state[this.account];
      },
      posterNftsLoading(state) {
        return state[this.account] == undefined
      },
    }),
    posterNftsToBurn() {
      if(!this.posterNfts){
        return [];
      }
      return this.posterNfts.filter((nft) => this.prizesId.includes(nft.id));
    }
  },
  methods: {
    handleClaim(payload) {
      console.log(payload);
      this.showConfirmClaim = true;
      this.selectedNft = payload.nft;
      this.selectedNftMetadata = payload.metadata;
      this.selectedQuantity = 1;
    },
    handleBurn(payload) {
      console.log(payload);
      this.showConfirmBurn = true;
      this.selectedNft = payload.nft;
      this.selectedNftMetadata = payload.metadata;
      this.selectedQuantity = 1;
    },
  },
};
</script>

<style>
@media screen and (max-width: 768px) {
  #mainRowStatus {
    padding-top: 0px !important;
  }
}
</style>
