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
        <v-col cols="6">
          <v-card
              class="mx-auto"
              style="background-image: url('/banners/farm1.png'); height: 300px;background-position: center; background-size: cover;"
          >
            <div>
              <div class="cardText" style="display: grid">
                 <span style="font-size: 28px">
                  COMMON FARM
                </span>
                <span>
                  STAKE $SNAFU TOKEN
                </span>
                <span>
                  MIN/MAX: 1/100
                </span>
                <span>
                  PARTICIPANTS: 11
                </span>
                 <span>
                  NFTs: 15
                </span>
              </div>
              <v-row style="padding: 0 0; margin: 0 0">
                <v-btn
                    class="farmingBannerBtn"
                    light
                >
                  OPEN
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
              class="mx-auto"
              style="background-image: url('/banners/farm2.png'); height: 300px;background-position: center; background-size: cover;"
          >
            <div>

              <div class="cardText" style="display: grid">
                 <span style="font-size: 28px">
                  RARE FARM
                </span>
                <span>
                  STAKE LP TOKEN
                </span>
                <span>
                  MIN/MAX: 1/100
                </span>
                <span>
                  PARTICIPANTS: 11
                </span>
                <span>
                  NFTs: 15
                </span>
              </div>

              <v-row style="padding: 0 0; margin: 0 0">
                <v-btn
                    class="farmingBannerBtn"
                    light
                >
                  OPEN
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
import WalletStatus from "../components/Wallet/WalletStatus"
import Banner from "../components/Banner/Banner"

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
  },
  methods: {},
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
