<template>
  <div>
    <div id="desktopHeader">
      <div id="pinnedLeftHeader">
        <div id="transformedText">
          <router-link :to="{ name: 'Home'}" id="snafuText">SNAFU</router-link>
        </div>
        <img src="logo.png" alt="logo-SNAFU.png" id="logo">
      </div>

<!--      <p id="subtitle">{{ currentRouteName }}</p>-->
      <div id="subtitle">
        <router-link class="backHome" :to="{ name: 'Home'}">EXPLORE</router-link>
        <router-link class="backHome" :to="{ name: 'Marketplace'}">MARKETPLACE</router-link>
        <router-link class="backHome" :to="{ name: 'Wallet'}">MY PROFILE</router-link>
        <router-link class="backHome" :to="{ name: 'Claim'}">REDEEM</router-link>
        <router-link class="backHome" :to="{ name: 'Farm'}">FARM</router-link>
        <router-link class="backHome" :to="{ name: 'Leaderboard'}">LEADERBOARD</router-link>
        <router-link class="backHome" :to="{ name: 'Leaderboard'}">RESOURCES</router-link>
<!--        <a class="backHome" @click="openBuySnafuModal()">BUY SNAFU </a>-->
<!--        <a class="backHome" @click="openVoteModal()">VOTE </a>-->
<!--&lt;!&ndash;        <a class="backHome" href="https://www.nftsnafu.org/farms" target="_blank">FARM <v-icon class="arrowRedirect backHome"> mdi-arrow-top-right </v-icon></a>&ndash;&gt;-->
<!--        <a class="backHome" @click="openMarketModal()">MARKETS </a>-->
<!--        <a class="backHome" @click="openLearnMoreModal()">LEARN MORE </a>-->
      </div>

      <wallet-status class="mt-5 pb-2 walletHeader"/>
    </div>

<!--    <div id="mobileHeader">-->
<!--      <div id="mobileHeaderContainer">-->
<!--        <div id="mobileLogoContainer" style="margin-left: -5px">-->
<!--          <img src="logo.png" alt="logo-SNAFU.png" id="logoMobile">-->
<!--          <router-link :to="{ name: 'Home'}" id="snafuTextMobile">SNAFU</router-link>-->
<!--        </div>-->
<!--        <p id="subtitleMobile">{{ currentRouteName }}</p>-->
<!--      </div>-->

<!--      <div id="menuMobile">-->
<!--        <Slide right :closeOnNavigation="true" @openMenu="handleOpenMenu" @closeMenu="handleCloseMenu"-->
<!--               :width=windowWidth>-->
<!--          <router-link class="backHome" :to="{ name: 'Home'}">HOME</router-link>-->
<!--          <router-link class="backHome" :to="{ name: 'Marketplace'}">MARKETPLACE</router-link>-->
<!--          <router-link class="backHome" :to="{ name: 'Wallet'}">WALLET</router-link>-->
<!--          <router-link class="backHome" :to="{ name: 'Claim'}">CLAIM</router-link>-->
<!--          <router-link class="backHome" :to="{ name: 'Farm'}">FARM</router-link>-->
<!--          <router-link class="backHome" :to="{ name: 'Leaderboard'}">LEADERBOARD</router-link>-->
<!--          <a class="backHome" @click="openBuySnafuModal()">BUY SNAFU <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>-->
<!--          <a class="backHome" @click="openVoteModal()">VOTE <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>-->
<!--&lt;!&ndash;          <a class="backHome" href="https://www.nftsnafu.org/farms" target="_blank">FARM <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>&ndash;&gt;-->
<!--          <a class="backHome" @click="openMarketModal()">MARKETS <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>-->
<!--          <a class="backHome" @click="openLearnMoreModal()">LEARN MORE <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>-->
<!--        </Slide>-->
<!--      </div>-->

<!--      <v-dialog v-model="showBuySnafuModal" @input="v => v || closeModal()" max-width="400">-->
<!--        <v-card>-->
<!--          <v-card-title style="justify-content: center" no-gutters>Continue?</v-card-title>-->
<!--          <v-card-text style="text-align: center">-->
<!--            <span style="font-size: 15px;">You will be redirected to Honeyswap, a decentralized exchange where you can buy $SNAFU. <br> Do you want to continue?</span>-->
<!--          <div style="justify-content: center">-->
<!--            <v-col cols="6" offset="3"> <v-img src="/redirect/honeyswap.png" class="pa-15" width="150px"></v-img></v-col>-->
<!--          </div>-->
<!--          </v-card-text>-->
<!--          <v-card-actions class="pb-10">-->
<!--            <v-row justify="center">-->
<!--              <v-btn class="ma-2" @click="closeModal()">CLOSE</v-btn>-->
<!--              <v-btn class="ma-2" @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862')">CONTINUE</v-btn>-->
<!--            </v-row>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-dialog>-->

<!--      <v-dialog v-model="showVoteModal" @input="v => v || closeModal()" max-width="400">-->
<!--        <v-card>-->
<!--          <v-card-title style="justify-content: center" no-gutters>Continue?</v-card-title>-->
<!--          <v-card-text style="text-align: center">-->
<!--            <span style="font-size: 15px;">You will be redirected to Snapshot, a decentralized voting system used by the SNAFU Collective for its governance. <br> Do you want to continue?</span>-->
<!--            <div style="justify-content: center">-->
<!--              <v-col cols="6" offset="3"> <v-img src="/redirect/snapshot.jpg" class="pa-15" width="150px"></v-img></v-col>-->
<!--            </div>-->
<!--          </v-card-text>-->
<!--          <v-card-actions class="pb-10">-->
<!--            <v-row justify="center">-->
<!--              <v-btn class="ma-2" @click="closeModal()">CLOSE</v-btn>-->
<!--              <v-btn class="ma-2" @click="goTo('https://vote.nftsnafu.org/#/')">CONTINUE</v-btn>-->
<!--            </v-row>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-dialog>-->

<!--      <v-dialog v-model="showMarketModal" @input="v => v || closeModal()" max-width="400">-->
<!--        <v-card>-->
<!--          <v-card-title style="justify-content: center" no-gutters>Secondary Markets</v-card-title>-->
<!--          <v-card-text style="text-align: center">-->
<!--            <span style="font-size: 15px;">SNAFU NFTs can be traded on all NFT Marketplaces on xDai Chain. <br> Please choose the Marketplace where you want to be redirected.</span>-->
<!--            <v-row style="justify-content: center" class="mt-5">-->
<!--              <v-col cols="6" style="text-align: -webkit-center" class="highlightOnHover">-->
<!--                <a href="https://xdai.unique.one/collections/0xED1eFC6EFCEAAB9F6d609feC89c9E675Bf1efB0a" target="_blank"><v-img src="/redirect/unique.png" class="pa-15" width="150px"></v-img> <span>Unique.One</span></a>-->
<!--              </v-col>-->
<!--              <v-col cols="6" style="text-align: -webkit-center" class="highlightOnHover">-->
<!--                <a href="https://epor.io/browse?token_address=0xed1efc6efceaab9f6d609fec89c9e675bf1efb0a" target="_blank"><v-img src="/redirect/eporio.png" class="pa-15" width="150px"></v-img> <span>Eporio</span></a>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--            <v-row style="justify-content: center">-->
<!--              <v-col cols="6" style="text-align: -webkit-center" class="highlightOnHover">-->
<!--                <a href="https://rarity.garden/xdai/market.html" target="_blank"><v-img src="/redirect/unifty.png" class="pa-15" width="150px"></v-img><span>Unifty</span></a>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-card-text>-->
<!--          <v-card-actions class="pb-10">-->
<!--            <v-row justify="center">-->
<!--              <v-btn class="ma-2" @click="closeModal()">CLOSE</v-btn>-->
<!--            </v-row>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-dialog>-->

<!--      <v-dialog v-model="showLearnMoreModal" @input="v => v || closeModal()" max-width="400">-->
<!--        <v-card>-->
<!--          <v-card-title style="justify-content: center" no-gutters>Continue?</v-card-title>-->
<!--          <v-card-text style="text-align: center">-->
<!--            <span style="font-size: 15px;">You will be redirected to the SNAFU Collective's landing website. <br> Continue?</span>-->
<!--          </v-card-text>-->
<!--          <v-card-actions class="pb-10">-->
<!--            <v-row justify="center">-->
<!--              <v-btn class="ma-2" @click="closeModal()">CLOSE</v-btn>-->
<!--              <v-btn class="ma-2" @click="goTo('https://nftsnafu.org')">CONTINUE</v-btn>-->
<!--            </v-row>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-dialog>-->

<!--    </div>-->
  </div>
</template>

<script>
import {Slide} from 'vue-burger-menu'
import WalletStatus from '../Wallet/WalletStatus.vue'

export default {
  components: {WalletStatus},
  methods: {
    handleOpenMenu() {
      document.querySelector(".bm-burger-button").style.display = 'none'
    },
    handleCloseMenu() {
      document.querySelector(".bm-burger-button").style.display = 'block'
    },
    openBuySnafuModal() {
      this.showBuySnafuModal = true
    },
    openVoteModal() {
      this.showVoteModal = true
    },
    openMarketModal() {
      this.showMarketModal = true
    },
    openLearnMoreModal() {
      this.showLearnMoreModal = true
    },
    closeModal() {
      this.showBuySnafuModal = false
      this.showVoteModal = false
      this.showMarketModal = false
      this.showLearnMoreModal = false
      this.$emit("updateDialog", false)
    },
    goTo(url) {
      window.open(url, '_blank')
    }
  },
  data() {
    return {
      showBuySnafuModal: false,
      showVoteModal: false,
      showMarketModal: false,
      showLearnMoreModal: false,
      windowWidth: window.innerWidth.toString(),
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.meta.headerSubtitle
    },
  },
}
</script>

<style>
.highlightOnHover:hover {
  background-color: #a7a7a752;
}
@media screen and (min-width: 769px) {
  .walletHeader {
    width: 355px;
    position: absolute;
    right: 0px;
    top: 20px;
  }

  #desktopHeader {
    display: block;
  }

  #menuMobile {
    display: none;
  }

  #mobileHeader {
    display: none;
  }

  #pinnedLeftHeader {
    position: absolute;
    top: 110px;
    display: inline-table;
    z-index: 11111;
    left: -15px
  }

  #snafuText {
    text-decoration: unset;
    font-size: 52px;
    font-weight: bold;
    color: #303030;
    letter-spacing: 0.05em;
    line-height: 1.2em;
  }

  #pinnedLeftHeader > #logo {
    width: 65px;
    height: 65px;
    position: absolute;
    top: 125px;
    left: 60px;
    cursor: pointer;
  }

  #transformedText {
    transform: rotate(
        270deg
    );
  }

  #desktopHeader > #subtitle {
    position: absolute;
    top: 50px;
    left: 148px;
    font-weight: bold;
    letter-spacing: 0.23em;
    font-size: 17px;
  }

  #desktopHeader > #subtitle > a {
    text-decoration: unset;
    color: #303030;
  }

  #menuDesktop {
    position: fixed;
    right: 3vw;
    top: 50px;
    display: grid;
  }

  .backHome {
    text-decoration: unset;
    color: rgb(143, 143, 143);
    font-size: 15px;
    font-weight: 600;
    padding: 0 5px;
    margin: 0 10px;
  }

  .backHome:hover {
    color: rgb(143, 143, 143) !important;
    /* position: absolute; */
    left: 0;
    bottom: 1px;
    border-width: 0 0 1px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    border-style: solid;
  }

  .v-application a {
    color: #303030 !important;
  }

  a.backHome.router-link-exact-active.router-link-active {
    color: rgb(143, 143, 143) !important;
    /* position: absolute; */
    left: 0;
    bottom: 1px;
    border-width: 0 0 1px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    border-style: solid;
  }

  .arrowRedirect:before {
    font-size: 13px;
    padding-bottom: 7px;
  }
}

@media screen and (max-width: 768px) {
  #desktopHeader {
    display: none;
  }

  #mobileHeader {
    display: block;
  }

  #logoMobile {
    width: 33px;
    height: 33px;
    /*height: 25px;*/
    cursor: pointer;
    margin-top: 2px;
  }

  #snafuTextMobile {
    text-decoration: unset;
    font-size: 30px;
    font-weight: bold;
    color: #303030;
    letter-spacing: 0.05em;
    line-height: 1.2em;
  }

  #subtitleMobile {
    margin-top: 5px;
    font-weight: bold;
    letter-spacing: 0.2em;
    font-size: 16px;
  }

  #subtitleMobile > a {
    text-decoration: unset;
    color: #303030;
  }

  #mobileLogoContainer {
    display: flex;
  }

  #mobileHeader {
    margin-left: 30px;
    margin-top: 20px;
    display: flex;
  }

  .bm-burger-button {
    cursor: pointer;
    height: 30px;
    left: 36px;
    position: absolute;
    top: 30px;
    width: 30px;
  }

  .line-style {
    height: 8% !important;
    left: 0;
    position: absolute;
    right: 0;
  }

  .bm-cross-button {
    height: 40px;
    width: 40px;
  }

  span.bm-cross-button.cross-style {
    right: 30px !important;
    margin-top: 15px;
  }

  span.bm-cross {
    height: 30px !important;
  }

  .bm-menu {
    background-color: #303030;
    height: 100%;
    left: 0;
    overflow-x: hidden;
    padding-top: 60px;
    position: fixed;
    top: 0;
    transition: .5s;
    z-index: 1000;
    opacity: 0.9;
  }

  .bm-item-list > * {
    display: flex;
    padding: .7em 1.5em !important;
    text-decoration: none;
    font-size: 27px;
    padding-top: 6px !important;
    justify-content: flex-end;
    font-weight: 500;
    letter-spacing: 2px;
  }

  .bm-item-list {
    margin-top: 25px;
  }

  #menuMobile > div > div > div.bm-menu > nav > a.backHome.router-link-exact-active.router-link-active {
    color: rgb(143, 143, 143) !important;
  }

  #menuMobile > div > div > div.bm-menu > nav > a {
    color: white;
  }

  .arrowRedirect:before {
    font-size: 18px;
    padding-bottom: 5px;
    color: white;
  }

}
</style>