<template>
  <div style="width: 100%" class="mt-10">
    <v-row class="pt-15" justify="start">
      <v-col colls-md="3" colls-xs="12" style="display: flex; align-items: baseline;">
        <h4 style="padding-top: 6px;padding-left: 10px;">Top collectors</h4> <h5 class="ml-5"><router-link class="link" :to="{ name: 'Community'}">View all</router-link></h5>
      </v-col>
    </v-row>

    <!--        for each user from list-->
    <v-row>
      <v-col cols-md="2" colls-xs="6" v-for="collector in topCollectors" :key="collector.address" style="display: flex">
        <v-avatar style="margin: 5px !important;">
          <v-img src="/pfp/unknown.jpeg" @click="$router.push('/user/' + collector.address)" class="pointerOnHover"/>
        </v-avatar>
        <div style="display: grid" class="ml-5">
          <h5>{{ collector.address | abbreviateAddress }}</h5>
          <h6 style="color: rgba(0,0,0,0.62)">{{ collector.allNfts }} Unique NFTs</h6>
          <h6 style="color: rgba(0,0,0,0.62)">{{ collector.totalBalance }} Total NFTs</h6>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapFields} from "vuex-map-fields"
import {mapActions} from "vuex"

export default {
  name: "TopCollectors",
  components: {
  },
  computed: {
    ...mapFields("leaderboard", ["leaderboard"]),
    topCollectors() {
      if (window.innerWidth < 768)
        return this.leaderboard.slice(0, 6)

      //leave only 6 for now also on desktop
      return this.leaderboard.slice(0, 6)
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