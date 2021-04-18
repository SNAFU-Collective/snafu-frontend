<template>
  <v-container fluid>
    <v-row no-gutters class="mt-3 ml-1">
      <v-col cols="10" class="text-caption px-3"> Fee: </v-col>
      <v-col cols="2" class="text-caption pl-7"> {{ snafuFee }}% </v-col>
    </v-row>
    <v-row no-gutters class="mt-n1 ml-1 d-flex">
      <v-col cols="4" class="text-caption px-3"> Fee Value: </v-col>
      <v-col cols="8" class="text-caption pr-5">
        <v-row no-gutters justify="end"> {{ nftFee }} SNAFU </v-row>
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