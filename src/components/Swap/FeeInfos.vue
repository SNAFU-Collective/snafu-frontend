<template>
  <v-container fluid>
    <v-row no-gutters class="mt-3 ml-1">
      <v-col cols="6" class="text-caption px-3"> Fee: </v-col>
      <v-col cols="6" class="text-caption pl-7 pr-3" style="text-align: right"> {{ snafuFee }}% </v-col>
    </v-row>
    <v-row no-gutters class="mt-n1 ml-1 d-flex">
      <v-col cols="6" class="text-caption px-3"> Fee Value: </v-col>
      <v-col cols="6" class="text-caption pr-3" >
        <v-row no-gutters justify="end" style="text-align: right"> {{ nftFee }} SNAFU </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapFields} from "vuex-map-fields";

export default {
  computed: {
    ...mapFields("nftContract", [
      "selectedNft",
      "selectedNftMetadata",
      "selectedQuantity",
    ]),
    ...mapFields("connectweb3", ["snafuFee"]),

    nftFee() {
      if (!this.selectedNftMetadata) {
        return "-";
      } else {
        return this.selectedNftMetadata.fee * this.selectedQuantity;
      }
    },
  },
};
</script>

<style>
</style>