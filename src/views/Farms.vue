<template>
  <div style="margin-bottom: 50px">
    <v-container>
      <v-row>
        <v-col cols-md="12" colls-xs="12" class="topTextPool px-15" style="text-align: center; color: #303030d4">
          <b class="h2 mt-5">Add Liquidity to <b>$SNAFU</b> token, <b>accumulate points</b> and <b>redeem</b> unique
            artworks from our artists.</b>
        </v-col>
      </v-row>

      <v-row justify="center" style="padding-top: 100px; padding-bottom: 10px">
        <h1>Active Farms</h1>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card
              class="mx-auto"
              style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/farming/common.png'); height: 300px;background-position: center; background-size: cover;"
          >
            <div>
              <div class="cardText" style="display: grid">
                <v-row>
                  <div cols="12" style="font-size: 28px">
                    <p>COMMON</p>
                  </div>
                </v-row>
                <v-row>
                  <p>Less than 15 Editions</p>
                </v-row>
                <v-row>
                  <p>STAKE $SNAFU TOKEN</p>
                  <br>
                  <p>MIN/MAX: 100/2000</p>
                </v-row>
              </div>
              <v-row style="padding: 0 0; margin: 0 0">
                <v-btn
                    class="farmingBannerBtn"
                    light
                    @click="goTo('https://rarity.garden/xdai/farm-view.html?address=0x8dDc7167e9F838f2e32FaBA229A53d4a48D0aa8d')"
                >
                  OPEN
                  <v-icon style="font-size: 1em; padding-top: 1px; padding-left: 4px; color:black"> mdi-open-in-new
                  </v-icon>
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
              class="mx-auto"
              style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/farming/rare.png'); height: 300px;background-position: center; background-size: cover;"
          >
            <div>

              <div class="cardText" style="display: grid">
                <v-row>
                  <v-col cols="12" style="font-size: 28px">
                    RARE
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" style="font-size: 15px">
                    STAKE SNAFU/WXDAI LP TOKEN
                    <br>
                    MIN/MAX: 220/500
                  </v-col>
                </v-row>
              </div>

              <v-row style="padding: 0 0; margin: 0 0">
                <v-btn
                    class="farmingBannerBtn"
                    light
                    @click="goTo('https://rarity.garden/xdai/farm-view.html?address=0x88CfEea7BE8A7695A3012276e8C68bf303Afe49a')"
                >
                  OPEN
                  <v-icon style="font-size: 1em; padding-top: 1px; padding-left: 4px; color:black"> mdi-open-in-new
                  </v-icon>
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
              class="mx-auto"
              style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/farming/ultra.png'); height: 300px;background-position: center; background-size: cover;"
          >
            <div>

              <div class="cardText" style="display: grid">
                <v-row>
                  <v-col cols="12" style="font-size: 28px">
                    ULTRA RARE
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" style="font-size: 15px">
                    STAKE SNAFU/WXDAI LP TOKEN
                    <br>
                    MIN/MAX: 400/800
                  </v-col>
                </v-row>
              </div>

              <v-row style="padding: 0 0; margin: 0 0">
                <v-btn
                    class="farmingBannerBtn"
                    light
                    @click="goTo('https://rarity.garden/xdai/farm-view.html?address=0x662D6C48818abD8bBCb7cb589D24E2Fe11Cdba52')"
                >
                  OPEN
                  <v-icon style="font-size: 1em; padding-top: 1px; padding-left: 4px; color:black"> mdi-open-in-new
                  </v-icon>
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import {mapActions} from "vuex"
import WalletStatus from "../components/Wallet/WalletStatus"
import Banner from "../components/Common/Banner"
import {commonFarmAddress} from "../utils/constants"

export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("transferNFTs", ['userBalance']),
  },
  methods: {
    ...mapActions("farming", ["balanceOf"]),
    goTo(url) {
      window.open(url, '_blank')
    },
  },
  mounted() {
    // this.balanceOf();
  },
}
</script>

<style>
.farmingBannerBtn {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.cardText {
  color: white;
  font-size: 18px;
  font-weight: 800;
  bottom: 80px;
  position: absolute;
  left: 20px;
}

@media screen and (max-width: 768px) {
  .topTextPool {
    margin: 0;
  }

  .topTextPool.h2 {
    color: rgba(48, 48, 48, 0.91);
    font: normal normal normal 20px/1em barlow-medium, barlow, sans-serif;
  }

}

@media screen and (min-width: 768px) {
  .topTextPool .h2 {
    color: #303030;
    font: normal normal normal 25px/1.4em barlow-medium, barlow, sans-serif;
  }

  .topTextPool {
    margin: 40px;
  }
}
</style>
