<template>
  <v-container fluid class="white rounded-lg">
    <v-row no-gutters class="text-caption" v-if="!hideBalance">
      <v-col cols="8"> Quantity </v-col>
      <v-col cols="4" style="text-align: right">
        Balance: {{ selectedNft ? selectedNft.editions : "-" }}
      </v-col>
    </v-row>
    <v-row no-gutters align-content="center" class="pt-1 ml-n3">
      <v-col cols="4" class="whiteBorder pl-1">
        <v-numeric
          hide-details="auto"
          outlined
          v-model="selectedQuantity"
          :min="0"
          :max="selectedNft ? +selectedNft.editions : 0"
          :disabled="!selectedNft"
          :readonly="disableActions"
          :useCalculator="false"
          calcIcon=""
        ></v-numeric>
      </v-col>
      <v-col cols="4" />
      <v-col cols="4" @click="openSelectNftModal" :style="pointerStyle">
        <div v-if="selectedNft">
          <v-row no-gutters>
            <v-img
              :src="'/nfts/' + selectedNft.id + '/image'"
              height="50"
              width="50"
            />
            <v-icon medium v-if="!hideBalance"> mdi-menu-down </v-icon>
          </v-row>
        </div>
        <div v-else class="mt-2">
          <v-row no-gutters>
            <v-chip :style="pointerStyle">
              Select NFT
              <v-icon medium > mdi-menu-down </v-icon>
            </v-chip>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <select-nft-modal :show="showModal" @updateDialog="() => showModal = false" :pool="withdrawFromPool" />
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import SelectNftModal from './SelectNftModal.vue';

export default {
  components: { SelectNftModal },
  props:{
    disableActions:{
      type: Boolean,
      default: false
    },
    hideBalance:{
      type: Boolean,
      default: false
    },
    withdrawFromPool:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    openSelectNftModal() {
      if(!this.disableActions){
        this.showModal = true;
      }
    },
  },
  computed: {
    ...mapFields("nftContract", ["selectedNft", "selectedQuantity"]),
    pointerStyle(){
      if(this.disableActions){
        return "cursor: not-allowed;"
      }else{
        return "cursor: pointer;"
      }
    }
  },
};
</script>

<style>
.whiteBorder .v-text-field--outlined input {
  text-align: left!important;;
}
.whiteBorder .v-text-field--outlined fieldset {
  color: white !important;
}

.whiteBorder .v-text-field input {
  font-size: 1.6em !important;
}
</style>