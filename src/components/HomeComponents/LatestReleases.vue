<template>
  <div style="width: 100%">
    <v-row class="pt-15" justify="start">
      <v-col cols="3" style="display: flex">
        <h4 style="padding-top: 6px;padding-left: 10px;">Latest releases</h4>
      </v-col>
    </v-row>
    <v-row v-if="allNFTs.length !== 0" class="mt-5">
      <nft-card :showPrice="false" :key="allNFTs.find(x => x.id === '218').id" :nft="allNFTs.find(x => x.id === '218')" :cardSize=300
                class="ma-6"/>
      <nft-card :showPrice="false" :key="allNFTs.find(x => x.id === '228').id" :nft="allNFTs.find(x => x.id === '228')" :cardSize=300
                class="ma-6"/>
      <nft-card :showPrice="false" :key="allNFTs.find(x => x.id === '172').id" :nft="allNFTs.find(x => x.id === '172')" :cardSize=300
                class="ma-6"/>
    </v-row>
    <v-row v-else justify="center" class="pt-16">
      <v-progress-circular
          size="60"
          indeterminate
          color="black"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import NftCard from "../Collection/NftCard.vue"
import {mapFields} from "vuex-map-fields"

export default {
  components: {
    NftCard,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),

  },
  methods: {
  },
}
</script>

<style>
@media screen and (min-width: 768px) {

}

@media screen and (max-width: 768px) {

}


</style>