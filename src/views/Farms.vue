<template>
  <div style="margin-bottom: 50px">
    <v-container>
      <v-row id="mainRow" justify="center" style="display: grid; padding-top: 100px">
        <wallet-status class="mt-5 pb-2"/>
      </v-row>
    </v-container>
    <v-container>
      <banner
          src="/banners/farming.png"
          mobile-src="'/banners/farming-mobile.png'"
          :showActionBtn="false"
          :show-secondary-action-btn="true"
          secondary-action-label="LEARN MORE"
          secondaryActionUrl="https://www.nftsnafu.org/farms"
      ></banner>
    </v-container>
    <v-container>
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
                    <v-col cols="12" style="font-size: 28px">
                  COMMON
                </v-col>
                </v-row>
               <v-row>
                 <v-col cols="12" style="font-size: 15px">
                  STAKE $SNAFU TOKEN
               <br>
                  MIN/MAX: 100/2000
                </v-col>
               </v-row>
              </div>
              <v-row style="padding: 0 0; margin: 0 0">
                <v-btn
                    class="farmingBannerBtn"
                    light
                    @click="goTo('https://rarity.garden/xdai/farm-view.html?address=0x8dDc7167e9F838f2e32FaBA229A53d4a48D0aa8d')"
                >
                  OPEN <v-icon style="font-size: 1em; padding-top: 1px; padding-left: 4px; color:black"> mdi-open-in-new </v-icon>
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
                  OPEN <v-icon style="font-size: 1em; padding-top: 1px; padding-left: 4px; color:black"> mdi-open-in-new </v-icon>
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
                  OPEN  <v-icon style="font-size: 1em; padding-top: 1px; padding-left: 4px; color:black"> mdi-open-in-new </v-icon>
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
import { commonFarmAddress } from "../utils/constants"

export default {
  components: {
    WalletStatus,
    Banner,
  },
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
    }
  },
  mounted(){
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

}

@media screen and (min-width: 169px) {

}
</style>
