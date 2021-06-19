<template>
  <v-dialog v-model="showModal" scrollable max-width="500px">
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters
          ><v-col cols="11" style="word-break: break-word"> Select the SNAFU Collective’s NFT </v-col>
          <v-col cols="1"> <v-icon small class="pl-3" @click="closeModal"> mdi-close </v-icon> </v-col>
        </v-row>
        <v-row no-gutters class="pt-5">
          <v-text-field
            outlined
            v-model.trim="filterByTitle"
            dense
            placeholder="Filter by Title"
            background-color="white"
          />
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n4">
        <nft-select-card
          :nft="nft"
          v-for="nft in nftsToSelect"
          :key="nft.id"
          class="my-5"
          :withdrawFromPool="pool"
          :isSwap="true"
          @selectNft="handleSelect"
        />
        <v-row v-if="nftToFetch" justify="center" class="my-3">
          <v-progress-circular
            size="40"
            indeterminate
            color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="nftsToSelect.length === 0" class="text-body-2 my-3">
          No SNAFU NFTs found in your wallet.
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex";
import { snafu20Address } from "../../utils/constants";
import {toLower} from "lodash"

import NftSelectCard from "../Collection/NftSelectCard.vue";
import axios from "axios"
export default {
  components: { NftSelectCard },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    pool: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      filterById: "",
      filterByTitle: "",
      metadata: []
    }
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("nftContract", [
      //"poolNFTs",
      //"userNFTs",
      //"poolSync",
      //"userSync",
      "selectedNft",
      "selectedQuantity",
      "selectedNftMetadata",
    ]),
    ...mapState("nftContract", {
      nfts(state){
        let nfts = this.pool ? state[snafu20Address] : state[this.account];

        if (nfts) {
          nfts.forEach(async (nft) => {
            let res = await axios.get("./nfts/" + nft.id + "/metadata.json")
            this.metadata.push(res.data)
          })
        }

        return nfts
      },
      nftToFetch(state){
        return this.pool ? state[snafu20Address] == undefined : state[this.account] == undefined;
      }
    }),
    nftsToSelect() {
      if(!this.nfts){
        return [];
      }
      let nft = this.nfts;

      if (this.filterByTitle && this.metadata) {
        nft = nft.filter((n) => {
          let nftMetadata = this.metadata.find(element => element.id === n.id)
          if (nftMetadata) {
            return toLower(nftMetadata.name).includes(toLower(this.filterByTitle))
          }
        })
      }

      return nft;
    },
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateDialog", false);
      },
    },
  },
  methods: {
    closeModal(){
      this.$emit("updateDialog", false);
    },
    handleSelect(payload) {
      let { nft, metadata } = payload;
      //Fix bug in selected editions
      this.selectedNft = null;
      this.selectedNftMetadata = null;

      this.$nextTick(() => {
        this.selectedNft = nft;
        this.selectedNftMetadata = metadata;
        this.selectedQuantity = 1;

        this.$emit("updateDialog", false);
      });
    },
  },
};
</script>

<style>
.row.text-subtitle-2.truncate.no-gutters {
  font-weight: 600;
  font-size: .75rem!important;
}
</style>