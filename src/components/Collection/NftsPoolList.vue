<template>
  <div style="min-width: 100%;">
    <v-row v-if="poolSync" class="mt-10" style="min-width: 100%; justify-content: center;">
      <v-row class="pt-15 filters-row" style="min-width: 98%;max-width: 98%">
        <v-col cols="3" style="display: flex">
          <h4 style="padding-top: 6px;padding-left: 10px;">Available NFTs: {{ poolNFTs.length }}/{{ allNFTs.length }}</h4>
          <v-btn icon color="black" @click="getNftsFromPool">
            <v-icon>mdi-cached</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="9" style="text-align: right;">
          <v-btn plain v-on:click="filter('all')" class="filter"
                 :class="currentTag === 'all' ? 'currentTag' : ''">All
          </v-btn>
          <v-btn v-for="category in extractedFilters" :key="category" plain v-on:click="filter(category)" class="filter"
                 :class="currentTag === category ? 'currentTag' : ''">{{ category }}
          </v-btn>

        </v-col>
      </v-row>

      <nft-card style="margin-top: 50px !important;" v-for="nft in paginatedNFTs" :key="nft.id" :nft="nft" class="ma-6" :cardSize="windowWidth > 728 ? 250 : 300" show-buy-button/>
    </v-row>
    <v-row v-if="poolSync" justify="center" class="pb-15 pt-15">
      <h3 v-if="filteredGallery.length === 0">No NFT available</h3>
      <v-btn medium dark @click="loadMore" v-if="currentPage * maxPerPage < filteredGallery.length"> LOAD MORE</v-btn>
    </v-row>
    <v-row v-if="!poolSync" justify="center" class="pt-16">
      <v-progress-circular
          size="60"
          indeterminate
          color="black"
      > <h3 style="padding-top: 150px;white-space: pre;">Loading NFTs</h3></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import NftCard from "./NftCard.vue"
import {snafu20Address} from "../../utils/constants"
import ids from "../../utils/ids"
import {mapFields} from "vuex-map-fields"

export default {
  data() {
    return {
      currentPage: 1,
      maxPerPage: 8,
      showReadMore: true,
      currentTag: 'all',
      nfts: ids,
      windowWidth: window.innerWidth.toString(),
    }
  },
  components: {NftCard},
  methods: {
    ...mapActions("nftContract", ["getNftsFromPool"]),
    async loadMore() {
      this.currentPage += 1

      // await setTimeout(() => {
      //   //scroll down only on desktop
      //   if (window.innerWidth > 768) {
      //     window.scrollTo({
      //       left: 0,
      //       top: document.body.scrollHeight || document.documentElement.scrollHeight,
      //       behavior: 'smooth',
      //     })
      //   }
      // }, 500)
    },
    filter: function (tag) {
      this.currentPage = 1
      this.currentTag = tag
    },
    toArray: function (my_object) {
      let my_array = Object.entries(my_object).map(function (entry) {
        let key = entry[0]
        let value = entry[1]

        let nested_object = value
        nested_object.key = key

        return nested_object
      })

      // Expected output : [
      //    {"key": "key1", "a": 1, "b": 2},
      //    {"key": "key2", "y": 25, "z": 26},
      //    {"key": "key3", "much": "stuff"}
      //]
      return my_array
    },
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    ...mapState("nftContract", {
      paginatedNFTs() {
        return this.filteredGallery.slice(0, this.currentPage * this.maxPerPage)
      },
      filteredGallery: function () {
        let ids
        switch (this.currentTag) {
          case "all":
            return this.poolNFTs
          default:
              ids = this.nfts[this.currentTag]
              break
        }

        return this.poolNFTs.filter(function (itm) {
          return ids.indexOf(+itm.id) > -1
        })
      },
      extractedFilters: function () {
        let poolNfts = this.poolNFTs
        let filters = []

        const nfts = this.toArray(this.nfts)
        nfts.forEach(function (val, index, theArray) {
          poolNfts.forEach((nft) => {
            if (val.includes(parseInt(nft.id)) && !filters.includes(val.key))
              filters.push(val.key)
          })
        })

        return filters
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
</style>