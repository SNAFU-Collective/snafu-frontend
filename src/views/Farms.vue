<template>
  <div>
    <v-container>
      <v-row id="mainRow" justify="center" style="display: grid; padding-top: 100px">
        <wallet-status class="mt-5 pb-2"/>
      </v-row>
    </v-container>
    <v-container>
      <banner
          src="/banners/farming.png"
          mobile-src="https://pooltogether.com/pooltogether-facebook-share-image-1200-630@2x.png"
          text="Participate in the SNAFU no-loss prize games on PoolTogether to win exclusive NFTs and physical items!"
          showActionBtn
          actionUrl="https://community.pooltogether.com/pools/xdai/0x1221fe13f8aa51856538b41e85a737d843edd825/home"
          action-label="PARTICIPATE"
          show-secondary-action-btn="true"
          secondary-action-label="LEARN MORE"
          secondaryActionUrl="https://www.nftsnafu.org/pooltogether-learnmore"
      ></banner>
    </v-container>
  </div>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import WalletStatus from "../components/Wallet/WalletStatus"
import Banner from "../components/Banner/Banner"

export default {
  components: {
    WalletStatus,
    Banner,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
  },
  methods: {
  },
}
</script>

<style>
@media screen and (max-width: 768px) {

}
</style>
