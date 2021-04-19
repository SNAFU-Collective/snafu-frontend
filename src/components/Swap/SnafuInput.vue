<template>
  <v-container fluid class="white rounded-lg">
    <v-row no-gutters class="text-caption" v-if="!hideBalance">
      <v-col cols="4"> Value </v-col>
      <v-col cols="8" > 
          <v-row no-gutters justify="end">
          Balance: {{ balance | fromWei | truncatePrice }}
          </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters align-content="center" class="pt-1 ml-n3">
      <v-col cols="8"  class="whiteBorder">
        <v-text-field
          outlined
          dense
          hide-details
          readonly
          v-model="snafuValue"
        ></v-text-field>
      </v-col>
      <v-col cols="4" >
        <v-row no-gutters class="pt-2" justify="end">
          <v-avatar class="mr-2" size="25">
            <v-img src="logo.png" />
          </v-avatar>
          <span class="text-body-1"> SNAFU </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  props:{
        hideBalance:{
      type: Boolean,
      default: false
    },
    withdrawFromPool:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapFields("connectweb3", { balance: "snafuBalance" }),
    ...mapFields("nftContract", ["selectedNft", "selectedNftMetadata", "selectedQuantity"]),
    snafuValue(){
      if(!this.selectedNft){
        return "-"
      }
      else{
        return (+this.selectedNftMetadata.price + +this.selectedNftMetadata.fee) * this.selectedQuantity;
      }
    }
  },

};
</script>