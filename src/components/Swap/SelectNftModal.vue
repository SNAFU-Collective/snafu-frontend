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
            v-model.trim="filterById"
            dense
            placeholder="Filter by token ID"
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

import NftSelectCard from "../Collection/NftSelectCard.vue";
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
      filterById: ""
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
        return this.pool ? state[snafu20Address] : state[this.account];
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
      if(this.filterById){
        nft = nft.filter((n) => n.id === this.filterById)
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
</style>