<template>
  <v-container>
    <v-row>
      <v-col cols-md="12" colls-xs="12" class="topTextPool px-15" style="text-align: center; color: #303030d4">
        <p  class="h2 mt-5">SNAFU NFTs are powered by <b>Gnosis Chain</b>, available on <b>all blockchains</b> and tradable on all decentralized NFT marketplaces.</p>
        <p  class="h2">The selection and minting of the NFTs is managed by the <b>SNAFU DAO</b>.</p>
        <v-btn text class="font-weight-thin" style="color: black"  @click="goTo('https://info.nftsnafu.org/nft')">
         Collections overview
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" >
      <Explore :shuffle="false" />
    </v-row>
  </v-container>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import Explore from '../components/Collection/Explore.vue'

export default {
  name: 'NFTs',
  components: {
    Explore
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    screenHeight() {
      return window.innerHeight
    },
  },
  methods: {
    goTo(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style>
.topText h1 {
  color: #303030;
  font-weight: bold;
  font: 48px barlow-bold,sans-serif;
}

.topText h2 {
  color: #303030;
  font:normal normal normal 30px/1.4em barlow-medium,barlow,sans-serif;
}

@media screen and (max-width: 768px) {
  .topTextPool {
    margin: 0;
  }
  .topTextPool.h2 {
    color: rgba(48, 48, 48, 0.91);
    font:normal normal normal 20px/1em barlow-medium,barlow,sans-serif;
  }

}
@media screen and (min-width: 768px) {
  .topTextPool .h2 {
    color: #303030;
    font:normal normal normal 25px/1.4em barlow-medium,barlow,sans-serif;
  }
  .topTextPool {
    margin: 40px;
  }
}

</style>