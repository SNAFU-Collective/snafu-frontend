<template>
  <div>
  <v-dialog v-model="showModal" max-width="550px" scrollable persistent >
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters
          ><v-col offset="1" cols="10" class="text-center">
            Confirm Redeem
          </v-col>
          <v-col cols="1">
            <v-icon class="pl-3 pb-2" @click="closeModal"> mdi-close </v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <div style="overflow-y: auto">
        <v-card-text class="pt-3">
          <v-row
              no-gutters
              class="ont-weight-bold pt-2 pb-0"
              justify="center"
              style="text-align: center"
          >
            In order to redeem the prize you will first need to burn the NFT, then fill the form and sign it with your wallet.
          </v-row>
          <v-row
            no-gutters
            class="text-caption font-weight-bold pt-8"
            justify="center"
          >
            You will burn:
          </v-row>
          <v-row no-gutters justify="center" class="pt-3">
            <nft-claim-output
              class="mx-3"
              :disableActions="true"
              :hideBalance="true"
              :withdrawFromPool="false"
            />
          </v-row>
          <v-row
              no-gutters
              class="text-caption font-weight-bold pt-12"
              justify="center"
          >
            And receive prize at the following address:
          </v-row>
          <v-row justify="center" >
            <claim-form style="margin-top:10px; max-width: 90%" class="container white rounded-lg mx-3 container--fluid"/>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters justify="center" class="mb-2">
            <v-btn :disabled="nftBurned" dark large @click="confirmClaim" class="ma-5"> 1. Burn </v-btn>
            <v-btn :disabled="!showNext" dark large @click="showConfirmClaim" class="ma-5"> 2. Redeem </v-btn>
          </v-row>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showTransactionModal" max-width="450px" scrollable persistent >
    <v-card color="#F5F5F5">
        <v-card-title>
          <v-row no-gutters
          ><v-col offset="1" cols="10" class="text-center">
            Confirm Burn
          </v-col>
            <v-col cols="1">
              <v-icon class="pl-3 pb-2" @click="closeModal"> mdi-close </v-icon>
            </v-col>
          </v-row>
      </v-card-title>

      <div v-if="loading">
        <v-card-text class="pt-3">
          <v-row no-gutters justify="center" class="py-4">
            <v-progress-circular
                :size="80"
                color="black"
                indeterminate
            ></v-progress-circular>
          </v-row>
          <v-row no-gutters justify="center" class="py-4 text-body-1">
            Transaction in progress
          </v-row>
        </v-card-text>
      </div>

      <div v-if="confirmed">
        <v-card-text class="pt-3">
          <v-row no-gutters justify="center" class="py-4">
            <v-icon size="100" color="success">mdi-check-circle</v-icon>
          </v-row>
          <v-row no-gutters justify="center" class="py-4 text-body-1">
            Transaction completed
          </v-row>
          <v-row no-gutters justify="center" class="mt-n3">
            <a :href="txUrl" target="_blank" style="color: black">
              View Details on Blockscout
            </a>
          </v-row>
        </v-card-text>
      </div>

      <div v-if="error">
        <v-card-text class="pt-3">
          <v-row no-gutters justify="center" class="py-4">
            <v-icon size="100" color="error">mdi-alert</v-icon>
          </v-row>
          <v-row no-gutters justify="center" class="py-4 text-body-1">
            Transaction failed
          </v-row>
          <v-row
              no-gutters
              justify="center"
              class="mt-n3 red--text"
              v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-row>
          <v-row no-gutters justify="center" class="mt-n3" v-if="txHash">
            <a :href="txUrl" target="_blank" style="color: black">
              View Details on Blockscout
            </a>
          </v-row>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import NftClaimOutput from './NftClaimOutput.vue';
import { mapFields } from 'vuex-map-fields';
import ClaimForm from './ClaimForm.vue';

export default {
  components: { NftClaimOutput,ClaimForm},
  data() {
    return {
      loading: false,
      confirmed: false,
      error: false,
      errorMessage: null,
      txHash: null,
      nftBurned: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    withdrawFromPool: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapFields("prizeContract", ["formData"]),
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateDialog", false);
      },
    },
    showTransactionModal: {
      get() {
        return this.loading || this.success || this.error;
      },
      set(val) {
        // this.$emit("updateDialog2", false);
      },
    },
    showNext() {
      return this.formData && this.formData.fullName && this.formData.email && this.formData.address
    },
    txUrl() {
      return "https://blockscout.com/xdai/mainnet/tx/" + this.txHash;
    },
  },
  methods: {
    ...mapActions("prizeContract", ["burnErc1155"]),
    ...mapMutations("prizeContract", ["resetSelectedNft"]),
    ...mapActions("connectweb3", ["updateData"]),
    closeModal() {
      this.$emit("updateDialog", false);
    },
    async showConfirmClaim() {
      console.log(this.formData)
    },
    async confirmClaim() {
      this.loading = true;
      try {
        let tx = await this.burnErc1155();
        tx.wait()
          .then((res) => {
            //console.log(res);
            this.confirmed = true;
            this.txHash = res.transactionHash;
            this.formData.burnTxHash = res.transactionHash;
            this.updateData();
          })
          .catch((err) => {
            //console.log(err);
            this.error = true;
            if (err.transactionHash) {
              this.txHash = err.transactionHash;
            }
            if (err.message) {
              this.errorMessage = err.message;
            }
          })
          .finally(() => {
            this.resetSelectedNft();
            this.loading = false;
          });
      } catch (err) {
        //console.log(err);
        this.error = true;
        if (err.transactionHash) {
          this.txHash = err.transactionHash;
        }
        if (err.message) {
          this.errorMessage = err.message;
        }
        this.resetSelectedNft();
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg{
  background-color: #5f5f5f1f !important;
}
.theme--dark.v-btn.v-btn--disabled {
  color: #0000004d !important;
}
</style>