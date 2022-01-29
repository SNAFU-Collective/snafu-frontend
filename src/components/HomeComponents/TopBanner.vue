<template>
  <v-row style="width: 100%">
    <v-col>
      <banner
          src="/banners/coll3-twitter-head.png"
          mobile-src="https://pooltogether.com/pooltogether-facebook-share-image-1200-630@2x.png"
          :showActionBtn="false"
          secondaryActionUrl="https://www.nftsnafu.org/pooltogether-learnmore"
          width="675px"
          height="400px"
      >
      </banner>
    </v-col>
    <v-col>
      <banner
          src='/banners/joinDiscord425.png'
          mobile-src='/banners/discord-banner-mobile.png'
          :showActionBtn="false"
          secondaryActionUrl="https://www.nftsnafu.org/pooltogether-learnmore"
          width="425px"
          height="150px"
      ></banner>
      <banner
          style="margin-top:5px"
          src='/banners/farming425.png'
          mobile-src='/banners/farming-mobile.png'
          :showActionBtn="false"
          actionUrl="https://community.pooltogether.com/pools/xdai/0x1221fe13f8aa51856538b41e85a737d843edd825/home"
          width="425px"
          height="245px"
      ></banner>
    </v-col>
  </v-row>
</template>


<script>
import Banner from "../Common/Banner"

export default {
  components: {
    Banner
  },
  data() {
    return {
    }
  },
  computed: {

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
