<template>
  <v-container>
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