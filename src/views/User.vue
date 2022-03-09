<template>
  <v-container>
    <div class="allNFTsContainer" style="padding-top: 20px;">
<!--      <v-row justify="center" class="backBtnRow">-->
<!--        <router-link class="backHome" :to="{ name: 'Leaderboard'}" style="display: flex">-->
<!--          <v-icon class="backIcon">mdi-arrow-left</v-icon>  BACK-->
<!--        </router-link>-->
<!--      </v-row>-->
      <v-row justify="center" class="pt-15" style="display: block; text-align: center">
        <v-row justify="center">
          <v-avatar left style="width: 200px !important; height: 200px !important;">
            <v-img src="/pfp/unknown.jpeg"/>
          </v-avatar>
        </v-row>
        <v-row justify="center" style=" margin-top: 50px">
          <h3 ><a class="addressLink" style="text-decoration: unset; color: #2196f3" :href="'https://blockscout.com/poa/xdai/address/'+$route.params.address" target="_blank">{{$route.params.address }} <v-icon style="font-size: 0.8em; color:black"> mdi-open-in-new </v-icon></a></h3>
        </v-row>
        <v-row justify="center" style=" margin-top: 25px">
          <v-btn color="blue" style="color:#fff;" @click="chatWithOwner">Chat with owner <v-icon class="ml-2">mdi-chat</v-icon></v-btn>
        </v-row>

      </v-row>
      <v-row justify="center">
        <v-row  v-if="userNfts" class="pt-15 filters-row" style="min-width: 98%;max-width: 98%">
          <v-col cols="3" style="display: flex">
            <h4 style="padding-top: 6px;padding-left: 10px;">Collection: {{ filteredGallery ? filteredGallery.length : '0' }} NFTs</h4>
          </v-col>
          <v-col cols="9" style="text-align: right;">
            <v-btn plain v-on:click="filter('all')" class="filter"
                   :class="currentTag === 'all' ? 'currentTag' : ''">All
            </v-btn>
            <v-btn v-for="category in extractedFilters" :key="category" plain v-on:click="filter(category)"
                   class="filter"
                   :class="currentTag === category ? 'currentTag' : ''">{{ category }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <NftCard :showPrice="false" style="margin-top: 50px !important;" :cardSize=200 v-for="nft in paginatedNFTs" :key="nft.id"
                   :nft="nft" class="ma-1"/>
        </v-row>
        
        <v-row justify="center" class="pb-15 pt-15">
          <h3 v-if="filteredGallery && filteredGallery.length === 0">No NFT available</h3>
          <v-btn medium dark @click="loadMore" v-if="filteredGallery && currentPage * maxPerPage < filteredGallery.length"> LOAD MORE
          </v-btn>
        </v-row>
      </v-row>
      <v-row v-if="nftToFetch" justify="center" class="my-3" >
        <v-progress-circular
            size="40"
            indeterminate
            color="black"
            style="margin-top: 80px"
        >
          <h3 style="padding-top: 150px;white-space: pre;">Loading Collection</h3>
        </v-progress-circular>
      </v-row>
      <div v-else-if="nftsToSelect.length === 0" class="text-body-2 my-5">
        No SNAFU NFTs found in this wallet.
      </div>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex"
import NftCard from "../components/Collection/NftCard.vue"
import ids from "../utils/ids.json"

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
      allNFTs: ids,
    }
  },
  methods: {
    chatWithOwner() {
      console.log('opening inew tab')
      let url = 'https://chat.blockscan.com/index?a=' + this.$route.params.address
      window.open(url, '_blank')
    },
    ...mapActions("nftContract", ["getNftsByAddress"]),
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
    toArray: function (my_object) {
      let my_array = Object.entries(my_object).map(function (entry) {
        let key = entry[0]
        let value = entry[1]

        let nested_object = value
        nested_object.key = key

        return nested_object
      })

      return my_array
    },
  },
  mounted(){
        this.getNftsByAddress(this.$route.params.address)
  },
  computed: {
    ...mapState("nftContract", {
      nfts(state) {
        return state[this.$route.params.address]
      },
      nftToFetch(state) {
        return state[this.$route.params.address] == undefined
      },
    }),
    userNfts() {
      return this.nfts
    },
    nftsToSelect() {
      return this.filteredGallery
    },
    paginatedNFTs() {
      if (!this.filteredGallery)
        return null

      return this.filteredGallery.slice(0, this.currentPage * this.maxPerPage)
    },
    filteredGallery: function () {
      let ids
      switch (this.currentTag) {
        case "all":
          return this.userNfts
        default:
          ids = this.allNFTs[this.currentTag]
          break
      }

      return this.userNfts.filter(function (itm) {
        return ids.indexOf(+itm.id) > -1
      })
    },
    extractedFilters: function () {
      let userNfts = this.userNfts
      let filters = []

      const nfts = this.toArray(this.allNFTs)

      nfts.forEach(function (val, index, theArray) {
        userNfts.forEach((nft) => {
          if (val.includes(parseInt(nft.id)) && !filters.includes(val.key))
            filters.push(val.key)
        })
      })

      return filters
    },
  },
}
</script>

<style>
.backHome:hover > .backIcon {
  color: rgb(219, 219, 219) !important;
}

.backIcon:before  {
  font-size: 18px;
  margin-right: 5px;
}

.addressLink:hover {
  text-decoration: underline !important;
}

.backBtnRow {
  padding-top: 60px;
}

@media screen and (max-width: 768px) {
  .addressLink{
    color: #303030 !important;
    font-size: 15px;
  }

  a.backIcon {
    color: #303030 !important;
    text-decoration: unset;
    font-weight: 600;
  }

  .backBtnRow {
    padding-top: 0px;
  }

}
</style>
