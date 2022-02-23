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
        <v-row class="mt-15">
          <v-col cols-md="12" colls-xs="12" class="topTextPool px-15" style="text-align: center; color: #303030d4">
            <b class="h2 mt-15">Welcome! <br> Login to access your NFTs.</b>
            <wallet-status class="mt-15 pb-2 walletHeader" style="justify-content: center"/>
          </v-col>
        </v-row>
      </div>

      <div v-if="isConnected">
        <!--      TODO: Refactor Transfer-->
        <!--      <v-row v-if="nfts">-->
        <!--        <v-col no-gutters align="center" justify="center">-->
        <!--          <v-tooltip bottom color="rgb(0 0 0 / 89%)">-->
        <!--            <template v-slot:activator="{ on, attrs }">-->
        <!--              <v-btn v-bind="attrs" v-on="on" small dark @click="openTransferNftModal">-->
        <!--                Transfer-->
        <!--                <v-icon size="15px" style="width: 20px">mdi-send</v-icon>-->
        <!--              </v-btn>-->
        <!--            </template>-->
        <!--            <span>Transfer one or multiple NFTs</span>-->
        <!--          </v-tooltip>-->
        <!--        </v-col>-->
        <!--      </v-row>-->


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
                      <NftCard style="margin-top: 50px !important;" :cardSize=200 v-for="nft in paginatedNFTs" :key="nft.id"
                               :nft="nft" class="ma-1"/>
                    </v-row>
                    <v-row justify="center" class="pb-15 pt-15">
                      <h3 v-if="filteredGallery.length === 0">No NFT available</h3>
                      <v-btn medium dark @click="loadMore" v-if="currentPage * maxPerPage < filteredGallery.length"> LOAD MORE
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
    <TransferNFTModal :show="showModal" @updateDialog="() => showModal = false"/>
  </div>
</template>

<script>
import CollectionInfo from '../components/Collection/CollectionInfo.vue'
import {mapState} from "vuex"
import NftSelectCard from '../components/Collection/NftSelectCard.vue'
import WalletStatus from "../components/Wallet/WalletStatus"
import Assets from '../components/Wallet/Assets.vue'
import {mapFields} from "vuex-map-fields"
import TransferNFTModal from "../components/Transfer/TransferNFTModal"
import NftCard from "../components/Collection/NftCard.vue"
import Claim from "./Claim.vue"
import ids from "../utils/ids"

export default {
  components: {
    // NftSelectCard,
    Assets,
    TransferNFTModal,
    NftCard,
    Claim,
    WalletStatus,
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
        { tab: 'My Collection', id: 1 },
        { tab: 'Claim', id: 2 },
        { tab: 'Wallet', id: 3 },
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
</style>
