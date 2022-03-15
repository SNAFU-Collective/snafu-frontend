<template>
<div></div>
</template>

<script>
import CollectionInfo from '../components/Collection/CollectionInfo.vue'
import Login from '../components/Common/Login.vue'
import {mapActions, mapState} from "vuex"
import WalletStatus from "../components/Wallet/WalletStatus"
import Assets from '../components/Wallet/Assets.vue'
import {mapFields} from "vuex-map-fields"
import NftCard from "../components/Collection/NftCard.vue"
import Claim from "./Claim.vue"
import ids from "../utils/ids"

export default {
  components: {
    // Assets,
    // NftCard,
    // Claim,
    // Login
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
    onCopy: function (e) {
      alert('You just copied the following text to the clipboard: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy the text to the clipboard')
      console.log(e);
    },
    openTransferNftModal() {
      if (!this.disableActions) {
        this.showModal = true
      }
    },
    openChat() {
      window.open('https://chat.blockscan.com/index', '_blank')
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
