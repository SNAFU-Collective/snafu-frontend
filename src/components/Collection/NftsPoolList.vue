<template>
  <div>
    <v-row justify="center" class="pt-15">
      <h2>NFTS IN POOL</h2>
      <v-btn icon color="black" @click="getNftsFromPool">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="poolSync" class="mt-10">
      <nft-card v-for="nft in paginatedNFTs" :key="nft.id" :nft="nft" class="ma-6"/>
    </v-row>
    <v-row v-if="poolSync" justify="center" class="pb-15 pt-15">
      <v-btn medium dark @click="loadMore" v-if="currentPage * maxPerPage < poolNFTs.length"> LOAD MORE</v-btn>
    </v-row>
    <v-row v-if="!poolSync" justify="center" class="pt-16">
      <v-progress-circular
          size="60"
          indeterminate
          color="black"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import NftCard from "./NftCard.vue"
import {snafu20Address} from "../../utils/constants"

export default {
  data() {
    return {
      currentPage: 1,
      maxPerPage: 8,
      showReadMore: true,
    }
  },
  components: {NftCard},
  methods: {
    ...mapActions("nftContract", ["getNftsFromPool"]),
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
  computed: {
    ...mapState("nftContract", {
      paginatedNFTs() {
        return this.poolNFTs.slice(0, this.currentPage * this.maxPerPage)
      },
      poolNFTs: state => state[snafu20Address],
      poolSync: state => state[snafu20Address] !== undefined,
    }),
  },
}
</script>

<style>
@media screen and (min-width: 768px) {
  .allNFTsContainer {
    margin-top: 40px;
  }
}

@media screen and (max-width: 768px) {
  .filters-row {
    margin: 0 10%;
  }
}
</style>