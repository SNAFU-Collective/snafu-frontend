<template>
  <div style="min-width: 100%">
    <v-container>

      <v-row justify="center" style="margin: 80px; display: grid">
        <v-avatar left style="width: 200px !important; height: 200px !important;">
          <v-img src="/pfp/unknown.jpeg"/>
        </v-avatar>
        <v-chip
            color="#e4e4e4"
            text-color="black"
            style="border: #A7A7A7;justify-content: center;"
            class="mt-5"
            v-if="isConnected"
        >
          {{ account | abbreviateAddress }}
        </v-chip>
      </v-row>

      <div v-if="!isConnected">
        <Login/>
      </div>

      <div v-if="isConnected">

        <v-tabs v-model="tab" color="black" centered>
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card flat>

              <div class="collectionSection" v-if="item.id === 1" style="min-height: 200px">
                <v-row justify="center" v-if="!nftToFetch && item.id === 1">
                  <v-row class="pt-15 filters-row" style="min-width: 98%;max-width: 98%">
                    <v-col cols="3" style="display: flex">
                      <h4 style="padding-top: 6px;padding-left: 10px;">Amount:
                        {{ filteredGallery ? filteredGallery.length : '0' }} NFTs</h4>
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
                    <NftCard style="margin-top: 50px !important;" :cardSize=200 v-for="nft in paginatedNFTs"
                             :key="nft.id"
                             :nft="nft" class="ma-1" :show-transfer-btn="true"/>
                  </v-row>
                  <v-row justify="center" class="pb-15 pt-15">
                    <h3 v-if="filteredGallery.length === 0">No NFT available</h3>
                    <v-btn medium dark @click="loadMore" v-if="currentPage * maxPerPage < filteredGallery.length"> LOAD
                      MORE
                    </v-btn>
                  </v-row>
                </v-row>
                <v-row v-if="nftToFetch" justify="center" class="my-15">
                  <v-progress-circular
                      size="40"
                      indeterminate
                      color="black"
                      tyle="margin-top: 80px"
                  ><h3 style="padding-top: 150px;white-space: pre;">Loading Collection</h3></v-progress-circular>
                </v-row>
                <v-row justify="center" v-else-if="userNfts.length === 0" class="text-body-2 my-5">
                  No SNAFU NFTs found in your wallet.
                </v-row>
              </div>

              <Claim class="claimSection" v-if="item.id === 2"/>

              <v-row class="walletSection" v-if="item.id === 3">
                <Assets/>
                <!--                  <CollectionInfo />-->
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

      </div>
    </v-container>
  </div>
</template>

<script>
import CollectionInfo from '../components/Collection/CollectionInfo.vue'
import Login from '../components/Common/Login.vue'
import {mapState} from "vuex"
import WalletStatus from "../components/Wallet/WalletStatus"
import Assets from '../components/Wallet/Assets.vue'
import {mapFields} from "vuex-map-fields"
import NftCard from "../components/Collection/NftCard.vue"
import Claim from "./Claim.vue"
import ids from "../utils/ids"

export default {
  components: {
    Assets,
    NftCard,
    Claim,
    Login
    // CollectionInfo
  },
  data() {
    return {
      showModal: false,
      currentPage: 1,
      maxPerPage: 10,
      showReadMore: true,
      currentTag: 'all',
      allNFTs: ids,
      tab: null,
      items: [
        {tab: 'My Collection', id: 1},
        {tab: 'Claim', id: 2},
        {tab: 'Wallet', id: 3},
      ],
    }
  },
  methods: {
    openTransferNftModal() {
      if (!this.disableActions) {
        this.showModal = true
      }
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
  computed: {
    ...mapFields("connectweb3", ["account", "isConnected"]),
    ...mapState("nftContract", {
      nfts(state) {
        return state[this.account]
      },
      nftToFetch(state) {
        return state[this.account] == undefined
      },
    }),
    userNfts() {
      return this.nfts
    },
    paginatedNFTs() {
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
        if (userNfts !== undefined) {
          userNfts.forEach((nft) => {
            if (val.includes(parseInt(nft.id)) && !filters.includes(val.key))
              filters.push(val.key)
          })
        }
      })

      return filters
    },
  },
}
</script>

<style>
@media screen and (max-width: 768px) {
  #mainRowStatus {
    padding-top: 0px !important;
  }
}

@media screen and (max-width: 768px) {
  #mainRowStatus {
    padding-top: 0px !important;
  }

  .claimBox {
    width: 100% !important;
    box-shadow: none !important;
  }

  .redeemBox {
    margin-top: 100px;
    width: 100% !important;
  }

  .boxRow {
    display: block !important;
  }
}

.claimBox {
  width: 50%;
  box-shadow: #0202023d 2px 0px
}

.redeemBox {
  width: 50%;
}

.boxRow {
  display: flex;
}
</style>
