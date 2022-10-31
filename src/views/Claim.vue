<template>
  <div>
    <v-container>
<!--      <v-row justify="center"><h1>Available Prizes</h1></v-row>-->
      <v-row style="margin-top: 100px" class="boxRow">
        <v-col class="claimBox">
          <v-row justify="center">
            <h3>Claim</h3>
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
              No SNAFU Prizes found in your wallet. <br/>
              Partecipate in our PoolTogether lottery to have a chance to win one!
               </span>
            </div>
          </v-row>
        </v-col>
        <v-col class="redeemBox">
          <v-row justify="center"
          >
            <h3>Redeem</h3>
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
            <div v-else-if="posterNftsToBurn.length === 0" class="text-body-2 my-50 mt-10 mb-10"
                 style="text-align: center">
            <span style="font-size: 13px; text-align: center">Here will appear your SNAFU NFTs redeemable for psyhical items found in your wallet. <br/>
              Partecipate in our PoolTogether lottery to have a chance to win one!</span>
            </div>
          </v-row>
          <v-row justify="center" class="mt-5">
            <span style="font-size: 15px">Did you already burned the NFT?</span>
          </v-row>
          <v-row justify="center" class="mt-5 mb-10">
            <v-btn small dark @click="handleManualClaim()">Manual redeem</v-btn>
          </v-row>
        </v-col>
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

      <manual-redeem-modal
          :show="showManualClaim"
          @updateDialog="() => (showManualClaim = false)"
          v-if="showManualClaim"
      />
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex"
import NftSelectCard from "../components/Collection/NftSelectCard.vue"
import {mapFields} from "vuex-map-fields"
import ConfirmClaimModal from "../components/Claim/ConfirmClaimModal.vue"
import ConfirmBurnModal from "../components/Claim/ConfirmBurnModal.vue"
import ClaimForm from '../components/Claim/ClaimForm.vue'
import WalletStatus from "../components/Wallet/WalletStatus"
import Banner from "../components/Common/Banner"
import ManualRedeemModal from "../components/Claim/ManualRedeemModal"

export default {
  components: {
    ManualRedeemModal, NftSelectCard, ConfirmClaimModal,
    // ClaimForm,
    ConfirmBurnModal,
  },
  data() {
    return {
      showConfirmClaim: false,
      showConfirmBurn: false,
      showManualClaim: false,
      prizesId: ["126", "129", "131", "132", "133", "134", "135", "136", "137", "138", "139", '225', '213'],
    }
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("prizeContract", ["selectedNft", "selectedQuantity"]),
    ...mapState("prizeContract", {
      nfts721(state) {
        return state[this.account]
      },
      nftsToClaimLoading(state) {
        return state[this.account] == undefined
      },
    }),
    nftsToClaim() {
      return this.nfts721
    },
    ...mapState("nftContract", {
      posterNfts(state) {
        return state[this.account]
      },
      posterNftsLoading(state) {
        return state[this.account] == undefined
      },
    }),
    posterNftsToBurn() {
      if (!this.posterNfts) {
        return []
      }
      return this.posterNfts.filter((nft) => this.prizesId.includes(nft.id))
    },
  },
  methods: {
    handleClaim(payload) {
      console.log(payload)
      this.showConfirmClaim = true
      this.selectedNft = payload.nft
      this.selectedNftMetadata = payload.metadata
      this.selectedQuantity = 1
    },
    handleBurn(payload) {
      console.log(payload)
      this.showConfirmBurn = true
      this.selectedNft = payload.nft
      this.selectedNftMetadata = payload.metadata
      this.selectedQuantity = 1
    },
    handleManualClaim() {
      this.showManualClaim = true
    },
  },
}
</script>

<style>
@media screen and (max-width: 768px) {
  #mainRowStatus {
    padding-top: 0px !important;
  }

  .claimBox {
    width: 100% !important;
    box-shadow: none !important;
  }

  .redeemBox {
    margin-top: 100px;
    width: 100% !important;
  }

  .boxRow {
    display: block !important;
  }
}

.claimBox {
  width: 50%;
  box-shadow: #0202023d 2px 0px
}

.redeemBox {
  width: 50%;
}

.boxRow {
  display: flex;
}
</style>
