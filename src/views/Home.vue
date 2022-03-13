<template>
  <v-container>
    <v-row justify="center" class="pt-10">
      <TopBanner />

      <LatestReleases class="mt-10"/>

      <TopCollectors />

      <v-img src="/banners/banner-coll-3.png" class="bannerColl3"></v-img>
      <Explore :shuffle="true" :showPrice="false" :scrollToHeightEnabled="false" class="mt-10"/>

      <v-card
          class="mx-auto davidBanner"
          :ripple="true"
          style=" cursor: pointer;"
          @click="openInNewPage"
      >
        <v-img src="/banners/preview.jpeg"></v-img>
      </v-card>
      <DavidPreviews class="mt-10 mb-10"/>
    </v-row>
  </v-container>
</template>

<script>
import Explore from '../components/Collection/Explore.vue'
import TopBanner from '../components/HomeComponents/TopBanner.vue'
import LatestReleases from "../components/HomeComponents/LatestReleases"
import DavidPreviews from "../components/HomeComponents/DavidPreviews"
import TopCollectors from "../components/HomeComponents/TopCollectors"
import Banner from "./../components/Common/Banner"
import {mapFields} from "vuex-map-fields"
import NftCard from "../components/Collection/NftCard"
import {mapActions} from "vuex"

export default {
  name: 'NFTs',
  components: {
    LatestReleases,
    Explore,
    TopBanner,
    DavidPreviews,
    TopCollectors
    // Banner,
    // NftCard,
  },
  computed: {
    ...mapFields("leaderboard", ["leaderboard"]),
    ...mapFields("nftContract", ["allNFTs"]),
    screenHeight() {
      return window.innerHeight
    },
    topCollectors() {
      let top10 = this.leaderboard.slice(0, 8)
      return top10
    }
  },
  methods: {
    ...mapActions("leaderboard", ["getLeaderboard", "getUserRank", "getUserTotalPoints"]),
    openInNewPage() {
      window.open('https://boreddavid.com', '_blank')
    },
  },
  async beforeMount() {
    await this.getLeaderboard()
  },
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

@media screen and (min-width: 768px) {
  .bannerColl3 {
    margin-top: 200px
  }
  .davidBanner {
    margin-top: 150px;
  }
}
@media screen and (max-width: 768px) {
  .bannerColl3 {
    margin-top: 100px
  }

  .davidBanner {
    margin-top: 75px;
  }
}
</style>