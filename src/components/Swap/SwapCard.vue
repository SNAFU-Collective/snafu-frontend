<template>
      <v-card
        height="450"
        width="400"
        color="#F5F5F5"
        class="d-flex flex-column rounded-lg"
      >
        <v-row no-gutters class="text-caption pa-3">
          <v-col cols="11" class="text-caption"> FROM </v-col>
          <v-col cols="1" align-self="start">
            <v-tooltip bottom>
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
              <span>Swap NFTs of SNAFU ERC1155 Collection <br> for $SNAFU and vice versa. <br><br> <strong>Price = 1000 $SNAFU / NFT rarity</strong><br> Rarity is the number of editions of an NFT</span>
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

        <v-row no-gutters class="text-caption px-3 mt-n3">
          <span> TO </span>
        </v-row>
        <v-row no-gutters justify="center">
          <snafu-input class="mx-3" />
        </v-row>
        <fee-infos />

        <v-spacer />
        <v-row no-gutters justify="center" align="end" class="rounded-0">
          <v-btn
            width="400"
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
          return "Wrong network. Switch to xDai"
        }

        return "Swap"
      }
  }
};
</script>

<style>
</style>