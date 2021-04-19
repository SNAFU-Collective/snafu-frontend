<template>
      <v-card
        height="450"
        width="350"
        color="#F5F5F5"
        class="d-flex flex-column rounded-lg"
        style="max-width: 350px"
      >
        <v-row no-gutters class="text-caption pa-3">
          <v-col cols="11" class="text-caption greyColor px-2"> FROM </v-col>
          <v-col cols="1" align-self="start">
            <v-tooltip bottom color="#616161ed">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="grey"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="text-h6"
                >
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>Swap NFTs of SNAFU ERC1155 Collection <br> for $SNAFU and vice versa.
                <br><br> <strong>NFT Price = 1000 $SNAFU / NFT rarity</strong><br> Rarity is the number of editions of an NFT.
                <br><br> $SNAFU tokens are automatically <strong>minted</strong> when <br> someone sells NFTs and <strong>burned</strong> when <br>someone buys NFTs.
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <nft-input class="mx-3" :disableActions="disableActions" />
        </v-row>
        <v-row no-gutter />
        <v-row no-gutters justify="center">
          <v-btn large icon :disabled="disableActions">
            <v-icon>mdi-swap-vertical</v-icon>
          </v-btn>
        </v-row>

        <v-row no-gutters class="text-caption pa-3 mt-n3 greyColor">
          <v-col cols="12" class="text-caption greyColor px-2"> TO </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <snafu-input class="mx-3" />
        </v-row>
        <fee-infos />

        <v-spacer />
        <v-row no-gutters justify="center" align="end" class="rounded-0">
          <v-btn
            width="350"
            height="60"
            color="black"
            class="white--text rounded-0 rounded-b-lg"
            @click="startSwap"
            :disabled="disableActions || disableSwap"
          >
            {{buttonText}}
          </v-btn>
        </v-row>
        <confirm-swap-modal  :show="showConfirmSwap" @updateDialog="() => showConfirmSwap = false"/>
      </v-card>
</template>

<script>
import NftInput from "./NftInput.vue";
import SnafuInput from "./SnafuInput.vue";
import {mapFields} from "vuex-map-fields";
import {mapGetters} from "vuex";
import ConfirmSwapModal from './ConfirmSwapModal.vue';
import FeeInfos from './FeeInfos.vue';

export default {
  components: { NftInput, SnafuInput, ConfirmSwapModal, FeeInfos },
  data(){
    return{
      showConfirmSwap: false
    }
  },
  methods:{
    startSwap(){
      this.showConfirmSwap = true;
    }
  },
  computed:{
      ...mapFields("connectweb3", ["isConnected"]),
      ...mapFields("nftContract", [ "selectedNft", "selectedNftMetadata", "selectedQuantity"]),
      ...mapGetters("connectweb3", ["isXdai"]),
      disableActions(){
        return !this.isConnected || !this.isXdai;
      },
      disableSwap(){
        return !this.selectedNft || this.selectedQuantity <= 0;
      },
      buttonText(){
        if(!this.isConnected){
          return "Connect wallet"
        }

        if(!this.isXdai){
          return "Wrong network: Switch to xDai"
        }

        return "Swap"
      }
  }
};
</script>

<style>
.greyColor {
  color: #A7A7A7;
  font-weight: bold;
}
</style>