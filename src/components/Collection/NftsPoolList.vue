<template>
  <div>
    <v-row justify="center" class="pt-15">
      <h2>ITEMS IN POOL</h2>
      <v-btn icon color="black" @click="getNftsFromPool">
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
        color="black"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NftCard from "./NftCard.vue";
import { snafu20Address } from "../../utils/constants";

export default {
  components: { NftCard },
  methods: {
    ...mapActions("nftContract", ["getNftsFromPool"]),
  },
  computed: {
    ...mapState("nftContract", {
      poolNFTs: state => state[snafu20Address],
      poolSync: state => state[snafu20Address] !== undefined
    })
  },
};
</script>

<style>
</style>