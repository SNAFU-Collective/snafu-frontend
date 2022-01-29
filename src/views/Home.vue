<template>
  <v-container>
    <v-row justify="center" class="pt-10">
      <TopBanner class="mt-10"/>
      <LatestReleases class="mt-10"/>
      <banner
          style="margin-top: 150px"
          src="/banners/david-background.jpg"
          mobile-src="/banners/david-background.jpg"
          :showActionBtn="false"
          width="100%"
          height="200px"
      >
      </banner>
      <Explore />
    </v-row>
  </v-container>
</template>

<script>
import Explore from '../components/Collection/Explore.vue'
import TopBanner from '../components/HomeComponents/TopBanner.vue'
import LatestReleases from "../components/HomeComponents/LatestReleases"
import Banner from "./../components/Common/Banner"

export default {
  name: 'NFTs',
  components: {
    LatestReleases,
    Explore,
    TopBanner,
    Banner
  }
}
</script>

<style>
</style>