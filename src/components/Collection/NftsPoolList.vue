<template>
  <div>
    <v-row justify="center" class="pt-15">
      <h2>Available NFTs</h2>
      <v-btn icon color="black" @click="getNftsFromPool">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center" class="pt-15 filters-row">
      <v-btn small v-on:click="filter('all')" style="margin: 10px"
             :style="currentTag === 'all' ? 'background-color: black; color: white' : ''">All
      </v-btn>
      <v-btn small v-on:click="filter('collection3')" style="margin: 10px"
             :style="currentTag === 'collection3' ? 'background-color: black; color: white' : ''">Collection #3
      </v-btn>
      <v-btn small v-on:click="filter('collection2')" style="margin: 10px"
             :style="currentTag === 'collection2' ? 'background-color: black; color: white' : ''">Collection #2
      </v-btn>
      <v-btn small v-on:click="filter('collection1')" style="margin: 10px"
             :style="currentTag === 'collection1' ? 'background-color: black; color: white' : ''">Collection #1
      </v-btn>
      <v-btn small v-on:click="filter('communityPool')" style="margin: 10px"
             :style="currentTag === 'communityPool' ? 'background-color: black; color: white' : ''">Community Pool
      </v-btn>
      <v-btn small v-on:click="filter('phobias')" style="margin: 10px"
             :style="currentTag === 'phobias' ? 'background-color: black; color: white' : ''">Phobias
      </v-btn>
      <v-btn small v-on:click="filter('gadgets')" style="margin: 10px"
             :style="currentTag === 'gadgets' ? 'background-color: black; color: white' : ''">Gadgets
      </v-btn>
    </v-row>
    <v-row v-if="poolSync" class="mt-10">
      <nft-card v-for="nft in paginatedNFTs" :key="nft.id" :nft="nft" class="ma-6" show-buy-button />
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
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import NftCard from "./NftCard.vue"
import {snafu20Address} from "../../utils/constants"
import ids from "../../utils/ids"

export default {
  data() {
    return {
      currentPage: 1,
      maxPerPage: 8,
      showReadMore: true,
      currentTag: 'all',
      nfts: ids,
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
    filter: function (tag) {
      this.currentPage = 1
      this.currentTag = tag
    },
  },
  computed: {
    ...mapState("nftContract", {
      paginatedNFTs() {
        return this.filteredGallery.slice(0, this.currentPage * this.maxPerPage)
      },
      filteredGallery: function () {
        let ids
        switch (this.currentTag) {
          case "all":
            return this.poolNFTs
          case "collection3":
            ids = this.nfts.collection3
            break
          case "collection2":
            ids = this.nfts.collection2
            break
          case "collection1":
            ids = this.nfts.collection1
            break
          case "phobias":
            ids = this.nfts.phobias
            break
          case "communityPool":
            ids = this.nfts.communityPool
            break
          case "gadgets":
            ids = this.nfts.gadgets
            break
        }

        return this.poolNFTs.filter(function (itm) {
          return ids.indexOf(+itm.id) > -1
        })
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