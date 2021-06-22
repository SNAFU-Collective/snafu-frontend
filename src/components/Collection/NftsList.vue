<template>
  <div class="allNFTsContainer">
    <v-row class="pt-15" justify="center">
      <h1>Latest releases</h1>
    </v-row>
    <v-row v-if="allNFTs.length !== 0" class="mt-5">
      <nft-card :key="allNFTs.find(x => x.id === '81').id" :nft="allNFTs.find(x => x.id === '81')" :cardSize=300
                class="ma-6"/>
      <nft-card :key="allNFTs.find(x => x.id === '80').id" :nft="allNFTs.find(x => x.id === '80')" :cardSize=300
                class="ma-6"/>
      <nft-card :key="allNFTs.find(x => x.id === '77').id" :nft="allNFTs.find(x => x.id === '77')" :cardSize=300
                class="ma-6"/>
    </v-row>
    <v-row v-else justify="center" class="pt-16">
      <v-progress-circular
          size="60"
          indeterminate
          color="black"
      ></v-progress-circular>
    </v-row>

    <v-row justify="center" class="pt-15">
      <h2>SNAFU Collective's NFTs</h2>
    </v-row>
    <v-row justify="center" class="pt-15 filters-row">
      <v-btn small v-on:click="filter('all')" style="margin: 10px"
             :style="currentTag === 'all' ? 'background-color: black; color: white' : ''">All
      </v-btn>
      <v-btn small v-on:click="filter('collection2')" style="margin: 10px"
             :style="currentTag === 'collection2' ? 'background-color: black; color: white' : ''">Collection #2
      </v-btn>
      <v-btn small v-on:click="filter('collection1')" style="margin: 10px"
             :style="currentTag === 'collection1' ? 'background-color: black; color: white' : ''">Collection #1
      </v-btn>
      <v-btn small v-on:click="filter('collection1farming')" style="margin: 10px"
             :style="currentTag === 'collection1farming' ? 'background-color: black; color: white' : ''">Collection #1
        Farming
      </v-btn>
      <v-btn small v-on:click="filter('phobias')" style="margin: 10px"
             :style="currentTag === 'phobias' ? 'background-color: black; color: white' : ''">Phobias
      </v-btn>
    </v-row>
    <v-row class="mt-10" justify="center">
      <div v-for="(nft, index) in paginatedNFTs" :key="index">
        <nft-card :key="nft.id" :nft="nft" class="ma-6"/>
      </div>
    </v-row>
    <v-row justify="center" class="pb-15 pt-15">
      <v-btn medium dark @click="loadMore" v-if="currentPage * maxPerPage < filteredGallery.length"> LOAD MORE</v-btn>
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
      currentTag: 'collection2',
      nfts: {
        collection1: [57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30],
        phobias: [75, 74, 73, 72, 71, 70, 69, 68, 67],
        collection1farming: [58, 59, 60, 61, 62, 63, 64, 65, 66],
        collection2: [76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 91, 94, 95, 96, 97, 98],
      },
    }
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    paginatedNFTs() {
      return this.filteredGallery.slice(0, this.currentPage * this.maxPerPage)
    },
    filteredGallery: function () {
      let ids
      switch (this.currentTag) {
        case "all":
          return this.allNFTs
        case "collection2":
          ids = this.nfts.collection2
          break
        case "collection1":
          ids = this.nfts.collection1
          break
        case "collection1farming":
          ids = this.nfts.collection1farming
          break
        case "phobias":
          ids = this.nfts.phobias
          break
      }

      return this.allNFTs.filter(function (itm) {
        return ids.indexOf(+itm.id) > -1
      })
    },
  },
  methods: {
    filter: function (tag) {
      this.currentPage = 1
      this.currentTag = tag
    },
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
    margin-top: 40px;
  }
}

@media screen and (max-width: 768px) {
  .filters-row {
    margin: 0 10%;
  }
}

</style>