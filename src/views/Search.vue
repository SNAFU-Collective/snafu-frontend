<template>
  <v-container>
    <v-row id="mainRow" justify="center" style="padding-top: 100px">
      <v-col cols="6">
        <v-text-field
          outlined
          v-model.trim="addressToSearch"
          dense
          placeholder="Address to search"
          background-color="white"
        />
      </v-col>
    </v-row>
    <v-row justify="center" >
        <nft-select-card
          :nft="nft"
          v-for="nft in nftsToSelect"
          :key="nft.id"
          class="ma-5"
          :withdrawFromPool="false"
          :hideSelect="true"
        />
    </v-row>
  </v-container>
</template>

<script>
import { ethers } from "ethers";
import { mapActions, mapState } from "vuex";
import NftSelectCard from '../components/Collection/NftSelectCard.vue';
export default {
  components: { NftSelectCard },
  data() {
    return {
      addressToSearch: null,
    };
  },
  methods: {
    ...mapActions("nftContract", ["getNftsByAddress"]),
  },
  computed: {
    isValidAddress() {
      return ethers.utils.isAddress(this.addressToSearch);
    },
    ...mapState("nftContract", {
      nfts(state) {
        if (!this.isValidAddress) {
          return [];
        }
        return state[this.addressToSearch];
      },
      nftToFetch(state) {
        if(!this.isValidAddress){
          return true;
        }

        return state[this.addressToSearch] == undefined;
      },
    }),
    nftsToSelect(){
      return this.nfts;
    }
  },
  watch: {
    addressToSearch: function (val) {
      if (!this.isValidAddress) {
        return;
      }
      this.getNftsByAddress(val);
    },
  },
};
</script>

<style>
</style>
