<template>
  <v-dialog v-model="showModal" max-width="450px" persistent>
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters
          ><v-col offset="1" cols="10" class="text-center">
            Confirm Claim
          </v-col>
          <v-col cols="1">
            <v-icon class="pl-3 pb-2" @click="closeModal"> mdi-close </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <div v-if="!loading && !confirmed && !error">
        <v-card-text class="pt-3">
          <v-row
            no-gutters
            class="text-caption font-weight-bold pt-8"
            justify="center"
          >
            You will receive:
          </v-row>
          <v-row no-gutters justify="center" class="pt-3">
            <nft-claim-output
              class="mx-3"
              :disableActions="true"
              :hideBalance="true"
              :withdrawFromPool="false"
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters justify="center" class="mb-2" @click="confirmClaim">
            <v-btn dark large> Confirm </v-btn>
          </v-row>
        </v-card-actions>
      </div>

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
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import NftClaimOutput from './NftClaimOutput.vue';
export default {
  components: { NftClaimOutput },
  data() {
    return {
      loading: false,
      confirmed: false,
      error: false,
      errorMessage: null,
      txHash: null,
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
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateDialog", false);
      },
    },
    txUrl() {
      return "https://blockscout.com/xdai/mainnet/tx/" + this.txHash;
    },
  },
  methods: {
    ...mapActions("prizeContract", ["convertErc1155"]),
    ...mapMutations("prizeContract", ["resetSelectedNft"]),
    ...mapActions("connectweb3", ["updateData"]),
    closeModal() {
      this.$emit("updateDialog", false);
    },
    async confirmClaim() {
      this.loading = true;
      try {
        let tx = await this.convertErc1155();
        tx.wait()
          .then((res) => {
            //console.log(res);
            this.confirmed = true;
            this.txHash = res.transactionHash;
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
</style>