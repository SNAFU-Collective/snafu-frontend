<template>
  <div>
    <v-row justify="center" class="pt-15 mt-15">
      <h2>ALL SNAFU NFTs</h2>
    </v-row>
    <v-row class="mt-10">
      <nft-card v-for="nft in allNFTs" :key="nft.id" :nft="nft" class="ma-6" />
    </v-row>
    <v-row v-if="allNFTs.length === 0" justify="center" class="pt-16">
      <v-progress-circular
          size="60"
          indeterminate
          color="black"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import NftCard from "./NftCard.vue";
import {mapFields} from "vuex-map-fields"

export default {
  components: { NftCard },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
  },
};
</script>

<style>
</style>