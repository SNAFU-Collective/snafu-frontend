<template>
  <div class="allNFTsContainer">
    <v-row justify="center" class="pt-15">
      <h2>SNAFU Collective's NFTs</h2>
    </v-row>
    <v-row class="mt-10" justify="center">
      <div v-for="(nft, index) in paginatedNFTs" :key="index">
        <nft-card :key="nft.id" :nft="nft" class="ma-6"/>
      </div>
    </v-row>
    <v-row justify="center" class="pb-15 pt-15">
      <v-btn medium dark @click="loadMore" v-if="currentPage * maxPerPage < allNFTs.length"> LOAD MORE</v-btn>
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
import NftCard from "./NftCard.vue"
import {mapFields} from "vuex-map-fields"

export default {
  components: {NftCard},
  data() {
    return {
      currentPage: 1,
      maxPerPage: 8,
      showReadMore: true,
    }
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    paginatedNFTs() {
      return this.allNFTs.slice(0, this.currentPage * this.maxPerPage)
    },
  },
  methods: {
    async loadMore() {
      this.currentPage += 1

      await setTimeout(() => {
        //scroll down only on desktop
        if (window.innerWidth > 768) {
          window.scrollTo({
            left: 0,
            top: document.body.scrollHeight || document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        }
      }, 500)
    },
  },
}
</script>

<style>
@media screen and (min-width: 768px) {
  .allNFTsContainer {
    margin-top: 15px;
  }
}
</style>