<template>
  <v-container>
    <v-row justify="center" class="pt-10">
      <TopBanner />
      <LatestReleases class="mt-10"/>
      <banner
          style="margin-top: 150px"
          src="/banners/DCOMINGSOON.png"
          mobile-src="/banners/DCOMINGSOON.png"
          :showActionBtn="false"
          width="100%"
          height="350px"
      >
      </banner>
      <Explore :shuffle="true" />
    </v-row>
  </v-container>
</template>

<script>
import Explore from '../components/Collection/Explore.vue'
import TopBanner from '../components/HomeComponents/TopBanner.vue'
import LatestReleases from "../components/HomeComponents/LatestReleases"
import Banner from "./../components/Common/Banner"
import {mapFields} from "vuex-map-fields"
import NftCard from "../components/Collection/NftCard"

export default {
  name: 'NFTs',
  components: {
    LatestReleases,
    Explore,
    TopBanner,
    Banner,
    // NftCard,
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    screenHeight() {
      return window.innerHeight
    },
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
</style>