<template>
  <div id="mainNftsDive">
    <v-row>
      <v-carousel hide-delimiter-background show-arrows-on-hover cycle style="height: 300px">
        <v-carousel-item v-for="(item, i) in carouselItems"  :key="i">
          <banner
              :src="item.src"
              :mobile-src="item.mobileSrc"
              :text="item.text"
              :showActionBtn="false"
          ></banner>
        </v-carousel-item>
      </v-carousel>
    </v-row>

    <v-row class="pt-15" justify="center">
      <h1>Latest releases</h1>
    </v-row>
    <v-row v-if="allNFTs.length !== 0" class="mt-5">
      <nft-card :key="allNFTs.find(x => x.id === '211').id" :nft="allNFTs.find(x => x.id === '211')" :cardSize=300
                class="ma-6"/>
      <nft-card :key="allNFTs.find(x => x.id === '149').id" :nft="allNFTs.find(x => x.id === '149')" :cardSize=300
                class="ma-6"/>
      <nft-card :key="allNFTs.find(x => x.id === '172').id" :nft="allNFTs.find(x => x.id === '172')" :cardSize=300
                class="ma-6"/>
    </v-row>
    <v-row v-else justify="center" class="pt-16">
      <v-progress-circular
          size="60"
          indeterminate
          color="black"
      ></v-progress-circular>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="pl-6">
        <collection-info />
      </v-col>

    </v-row>

    <v-row justify="center" style="padding-top: 100px">
      <h1>Catalog</h1>
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
      <v-btn small v-on:click="filter('okki')" style="margin: 10px"
             :style="currentTag === 'okki' ? 'background-color: black; color: white' : ''">Okki <span class="newFlag">NEW</span>
      </v-btn>
      <v-btn small v-on:click="filter('physical')" style="margin: 10px"
             :style="currentTag === 'physical' ? 'background-color: black; color: white' : ''">Physical <span class="newFlag">NEW</span>
      </v-btn>
      <v-btn small v-on:click="filter('gadgets')" style="margin: 10px"
             :style="currentTag === 'gadgets' ? 'background-color: black; color: white' : ''">Gadgets
      </v-btn>
    </v-row>
    <v-row v-if="currentTag === 'physical'"  justify="center" style="margin-top:40px;text-align: center; padding: 0 10px">
      <p>Real, at your house: the artworks of our artists are on sale! <br>
      <a href="https://www.nftsnafu.org/physical-artworks" target="_blank">Read here</a> for more info. </p>
    </v-row>
    <v-row v-if="currentTag === 'okki'"  justify="center" style="margin-top:40px;text-align: center; padding: 0 10px">
      <p>The eyes are the mirror of the soul, they convey our emotional state better than anything else. A glance can show us happiness, sadness, desire, and even fear. <br>
        <a href="https://www.nftsnafu.org/okki-snafumett" target="_blank">Read more</a> about this collection. </p>
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
import Banner from "../Common/Banner"
import CollectionInfo from '../Common/CollectionInfoCard.vue'
import ids from "../../utils/ids"

export default {
  components: {NftCard, Banner, CollectionInfo},
  data() {
    return {
      currentPage: 1,
      maxPerPage: 8,
      showReadMore: true,
      currentTag: 'okki',
      nfts: ids,
      carouselItems: [
        {
          src: '/banners/banner-coll-3.png',
          mobileSrc: '/banners/banner-coll-3-mob.png',
        },
        {
          src: '/banners/pool-banner.png',
          mobileSrc: '/banners/pool-banner-mobile.png',
        },
        {
          src: '/banners/farming.png',
          mobileSrc: '/banners/farming-mobile.png',
        },
        {
          src: '/banners/discord-banner.png',
          mobileSrc: '/banners/discord-banner-mobile.png',
        },
      ],
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
        case "physical":
          ids = this.nfts.physical
          break
        case "okki":
          ids = this.nfts.okki
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
  #mainNftsDive {
    margin-top: 100px;
  }
}

@media screen and (max-width: 768px) {
  .filters-row {
    margin: 0 10%;
  }
  #mainNftsDive {
    margin-top: 0px !important;
  }
}

.newFlag {
  position: absolute;
  top: -16px;
  right: -20px;
  background-color: red;
  padding: 2px;
  color: white;
  font-weight: 800;
  border-radius: 3px;
  font-size: 10px;
}

</style>