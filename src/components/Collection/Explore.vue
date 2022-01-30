<template>
  <div style="min-width: 100%;">
    <v-row style="min-width: 100%; justify-content: center; margin-top: 100px">
      <v-col cols="3" style="display: flex">
        <h4 style="padding-top: 6px;padding-left: 10px;">Explore</h4>
      </v-col>
      <v-col cols="9" style="text-align: right;">
        <v-btn v-for="category in categories" :key="category" plain v-on:click="filter(category)" class="filter"
               :class="currentTag === category ? 'currentTag' : ''">{{ category }} <span v-if="showNewFlag(category)" class="newFlag">NEW</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="currentTag === 'physical'"  justify="center" style="margin-top:40px;text-align: center; padding: 0 20px">
      <p>Real, at your house: the artworks of our artists are on sale! <br>
      <a href="https://www.nftsnafu.org/physical-artworks" target="_blank">Read here</a> for more info. </p>
    </v-row>
    <v-row v-if="currentTag === 'okki'"  justify="center" style="margin-top:40px;text-align: center; padding: 0 20px">
      <p>The eyes are the mirror of the soul, they convey our emotional state better than anything else. A glance can show us happiness, sadness, desire, and even fear. <br>
        <a href="https://www.nftsnafu.org/okki-snafumett" target="_blank">Read more</a> about this collection. </p>
    </v-row>
    <v-row class="mt-10" justify="center">
      <div v-for="(nft, index) in paginatedNFTs" :key="index">
        <nft-card :cardSize="200" :key="nft.id" :nft="nft" style='margin:6px;'/>
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
import ids from "../../utils/ids"

export default {
  components: {
    NftCard,
  },
  data() {
    return {
      currentPage: 1,
      maxPerPage: 10,
      showReadMore: true,
      currentTag: 'all',
      nfts: ids,
      windowWidth: window.innerWidth.toString(),
      categories: [
          'all',
          'collection3',
          'collection2',
          'collection1',
          'communityPool',
          'phobias',
          'okki',
          'physical',
          'gadgets',
      ],
    }
  },
  props: {
    shuffle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    paginatedNFTs() {
      return this.filteredGallery.slice(0, this.currentPage * this.maxPerPage)
    },
    filteredGallery: function () {
      let ids
      let copyArray =  [].slice.call(this.allNFTs)
      switch (this.currentTag) {
        case "all":
          console.log(this.shuffle)
          return this.shuffle ? this.shuffleArray(copyArray) : this.allNFTs
        default:
          ids = this.nfts[this.currentTag]
          break
      }

      return this.allNFTs.filter(function (itm) {
        return ids.indexOf(+itm.id) > -1
      })
    },
  },
  methods: {
    showNewFlag: function (category) {
      switch (category) {
        case 'physical':
          return true
        case 'okki':
          return true
        default:
          return false
      }
    },
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
    shuffleArray(arr) {
      let len = arr.length;
      let d = len;
      let array = [];
      let k, i;
      for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(arr[k]);
        arr.splice(k, 1);
        len = arr.length;
      }
      for (i = 0; i < d; i++) {
        arr[i] = array[i];
      }
      return arr;
    }
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
  top: -15px;
  right: -20px;
  background-color: rgba(255, 0, 0, 0.81);
  padding: 2px;
  color: white;
  font-weight: 800;
  border-radius: 3px;
  font-size: 10px;
}

</style>