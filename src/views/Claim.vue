<template>
  <div>
    <v-container>
      <v-row
        class="ma-5 justify-center"
        id="mainRowStatus"
        style="padding-top: 70px; display: grid"
      >
      </v-row>
      <v-row justify="center" class="pt-1"
        ><strong>Claim SNAFU Prizes</strong></v-row
      >
      <v-row justify="center">
        <nft-select-card
          :nft="nft"
          v-for="nft in nftsToClaim"
          :key="nft.id"
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
        <div v-else-if="nftsToClaim.length === 0" class="text-body-2 my-5">
          No SNAFU Prizes found in your wallet. <br />
          Partecipate in our PoolTogether to have a chance to win one!
        </div>
      </v-row>
      <v-row justify="center" class="pt-15"
        ><strong>Burn tokens to get SNAFU Prizes</strong></v-row
      >

      <v-row justify="center">
        <nft-select-card
          :nft="nft"
          v-for="nft in posterNftsToBurn"
          :key="nft.id"
          class="ma-5"
          :withdrawFromPool="false"
          :hideSelect="true"
          :claim="true"
          @claimNft="handleClaim"
        />
        <v-row v-if="posterNftsLoading" justify="center" class="my-3">
          <v-progress-circular
            size="40"
            indeterminate
            color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="posterNftsToBurn.length === 0" class="text-body-2 my-5">
          No SNAFU Prizes found in your wallet. <br />
          Partecipate in our PoolTogether to have a chance to win one!
        </div>
      </v-row>
      
      <v-row no-gutters class="pt-10 justify-center">
      <claim-form />
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
import { mapState } from "vuex";
import NftSelectCard from "../components/Collection/NftSelectCard.vue";
import { mapFields } from "vuex-map-fields";
import ConfirmClaimModal from "../components/Claim/ConfirmClaimModal.vue";
import ClaimForm from '../components/Claim/ClaimForm.vue';

export default {
  components: { NftSelectCard, ConfirmClaimModal, ClaimForm },
  data() {
    return {
      showConfirmClaim: false,
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
