<template>
  <div>
    <v-row justify="center">
      <h2>ITEMS IN POOL</h2>
      <v-btn icon color="teal" @click="getNftsFromPool">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="poolSync" class="mt-10">
      <nft-card v-for="nft in poolNFTs" :key="nft.id" :nft="nft" class="ma-6" />
    </v-row>
    <v-row v-else justify="center" class="pt-16">
      <v-progress-circular
        size="60"
        indeterminate
        color="teal"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import NftCard from "./NftCard.vue";
export default {
  components: { NftCard },
  methods: {
    ...mapActions("nftContract", ["getNftsFromPool"]),
  },
  computed: {
    ...mapFields("nftContract", ["poolNFTs", "poolSync"]),
  },
};
</script>

<style>
</style>