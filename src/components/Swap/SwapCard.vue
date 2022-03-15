<template>
  <v-card
    height="413"
    width="350"
    color="#F5F5F5"
    class="d-flex flex-column rounded-lg"
    style="max-width: 350px"
  >
    <v-row no-gutters class="text-caption pa-3 pb-0">
      <v-col cols="8" class="text-caption greyColor px-2"> <span style="font-size: 10px">FROM</span> </v-col>
      <v-col cols="4" class="text-caption greyColor px-2" style="text-align: end;">
        <span style="font-size: 8px">
          <a href="https://info.honeyswap.org/#/pair/0xd6c8ad00302ca94952e7746d956e8b45b0ea90e3" target="_blank" class="link" style="font-decoration: underline">BUY $SNAFU</a>
        </span>
      </v-col>
    </v-row>
    <v-row class="mt-1" no-gutters justify="center" v-if="!withdrawFromPool">
      <nft-input
        class="mx-3"
        :disableActions="disableActions"
        :withdrawFromPool="withdrawFromPool"
      />
    </v-row>
    <v-row no-gutters justify="center" v-else>
      <snafu-input class="mx-3" :withdrawFromPool="withdrawFromPool" />
    </v-row>
    <v-row no-gutter />
    <v-row no-gutters justify="center" class="pt-5">
      <v-btn large icon :disabled="disableActions" @click="switchCard">
        <v-icon>mdi-swap-vertical</v-icon>
      </v-btn>
    </v-row>

    <v-row no-gutters class="text-caption px-3 mt-n3 greyColor">
      <v-col cols="12" class="text-caption greyColor px-2">  <span style="font-size: 10px">TO</span> </v-col>
    </v-row>
    <v-row no-gutters justify="center" v-if="!withdrawFromPool">
      <snafu-input class="mx-3" :withdrawFromPool="withdrawFromPool" />
    </v-row>
    <v-row no-gutters justify="center" v-else>
      <nft-input
        class="mx-3"
        :disableActions="disableActions"
        :withdrawFromPool="withdrawFromPool"
      />
    </v-row>

    <fee-infos v-if="!withdrawFromPool" />

    <v-spacer />
    <v-row no-gutters justify="center" align="end" class="rounded-0">
      <v-btn
        width="350"
        height="52"
        color="black"
        class="white--text rounded-0 rounded-b-lg"
        @click="startSwap"
        :disabled="disableSwap"
      >
        {{ buttonText }}
      </v-btn>
    </v-row>
    <confirm-swap-modal
      :show="showConfirmSwap"
      :withdrawFromPool="withdrawFromPool"
      @updateDialog="() => (showConfirmSwap = false)"
      v-if="showConfirmSwap"
    />
  </v-card>
</template>

<script>
import NftInput from "./NftInput.vue";
import SnafuInput from "./SnafuInput.vue";
import { mapFields } from "vuex-map-fields";
import { mapGetters, mapActions } from "vuex";
import ConfirmSwapModal from "./ConfirmSwapModal.vue";
import FeeInfos from "./FeeInfos.vue";

export default {
  components: { NftInput, SnafuInput, ConfirmSwapModal, FeeInfos },
  data() {
    return {
      showConfirmSwap: false
    };
  },
  methods: {
    ...mapActions("connectweb3", ["connectWallet"]),
    startSwap() {
      if(!this.isConnected){
        this.connectWallet()
      }else{
        this.showConfirmSwap = true;
      }
    },
    switchCard() {
      this.selectedNft = null;
      this.selectedQuantity = null;

      this.withdrawFromPool = !this.withdrawFromPool;
    },
  },
  computed: {
    ...mapFields("connectweb3", ["isConnected", "snafuBalance"]),
    ...mapFields("nftContract", [
      "selectedNft",
      "selectedNftMetadata",
      "selectedQuantity",
      "withdrawFromPool"
    ]),
    ...mapGetters("connectweb3", ["isXdai"]),
    disableActions() {
      return !this.isConnected || !this.isXdai;
    },
    insufficientBalance() {
      if (this.withdrawFromPool) {
        let amountToPay = this.selectedNftMetadata
          ? (+this.selectedNftMetadata.price + +this.selectedNftMetadata.fee) *
            this.selectedQuantity
          : 0;
        let balance = this.snafuBalance
          ? this.$options.filters.fromWei(this.snafuBalance)
          : 0;
        if (+balance < amountToPay) {
          return true;
        }
      }
      return false;
    },
    disableSwap() {
      
      if(!this.isConnected){
        return false;
      }

      if(!this.isXdai){
        return true;
      }

      if (!this.selectedNft) {
        return true;
      }

      if (this.selectedQuantity <= 0) {
        return true;
      }

      if (this.withdrawFromPool && this.insufficientBalance) {
        return true;
      }

      return false;
    },
    buttonText() {
      if (!this.isConnected) {
        return "Connect wallet";
      }

      if (!this.isXdai) {
        return "Wrong network: Switch to Gnosis Chain";
      }

      if (this.withdrawFromPool && this.insufficientBalance) {
        return "Insufficient Balance";
      }

      if (this.withdrawFromPool) {
        return "Mint"
      }

      if (!this.withdrawFromPool) {
        return "Burn"
      }
      return "Swap";
    },
  },
};
</script>

<style>
.greyColor {
  color: #a7a7a7;
  font-weight: bold;
}
</style>