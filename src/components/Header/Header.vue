<template>
  <div>
    <div id="desktopHeader">
      <div id="pinnedLeftHeader">
        <div id="transformedText">
          <router-link :to="{ name: 'Home'}" id="snafuText">SNAFU</router-link>
        </div>
        <img src="logo.png" alt="logo-SNAFU.png" id="logo">
      </div>

      <p id="subtitle"><router-link :to="{ name: 'Home'}">Community Pool</router-link></p>
      <div id="menuDesktop">
        <router-link class="backHome" :to="{ name: 'Home'}">HOME</router-link>
        <router-link class="backHome" :to="{ name: 'Pool'}">POOL</router-link>
        <router-link class="backHome" :to="{ name: 'Wallet'}">WALLET</router-link>
        <router-link class="backHome" :to="{ name: 'Claim'}">PRIZES</router-link>
        <router-link class="backHome" :to="{ name: 'Leaderboard'}">LEADERBOARD</router-link>

<!--        <a class="backHome" href="https://unifty.io/xdai/market-view.html?location=0x76E277F441610907477245F09b1cEd6C937c332E" target="_blank">MARKET <v-icon class="arrowRedirect backHome"> mdi-arrow-top-right </v-icon></a>-->
        <a class="backHome" href="https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862" target="_blank">BUY SNAFU <v-icon class="arrowRedirect backHome"> mdi-arrow-top-right </v-icon></a>
        <a class="backHome" href="https://vote.nftsnafu.org" target="_blank">VOTE <v-icon class="arrowRedirect backHome"> mdi-arrow-top-right </v-icon></a>
        <a class="backHome" href="https://www.nftsnafu.org/farms" target="_blank">FARM <v-icon class="arrowRedirect backHome"> mdi-arrow-top-right </v-icon></a>
        <a class="backHome" href="https://nftsnafu.org" target="_blank">LEARN MORE <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>
      </div>

    </div>

    <div id="mobileHeader">
      <div id="mobileHeaderContainer">
        <div id="mobileLogoContainer" style="margin-left: -5px">
          <img src="logo.png" alt="logo-SNAFU.png" id="logoMobile">
          <router-link :to="{ name: 'Home'}" id="snafuTextMobile">SNAFU</router-link>
        </div>
        <p id="subtitleMobile">Community Poo></p>
      </div>

      <div id="menuMobile">
        <Slide right :closeOnNavigation="true"  @openMenu="handleOpenMenu" @closeMenu="handleCloseMenu" :width=windowWidth>
          <router-link class="backHome" :to="{ name: 'Home'}">HOME</router-link>
          <router-link class="backHome" :to="{ name: 'Pool'}">POOL</router-link>
          <router-link class="backHome" :to="{ name: 'Wallet'}">WALLET</router-link>
          <router-link class="backHome" :to="{ name: 'Claim'}">PRIZES</router-link>
          <router-link class="backHome" :to="{ name: 'Leaderboard'}">LEADERBOARD</router-link>
<!--          <a class="backHome" href="https://unifty.io/xdai/market-view.html?location=0x76E277F441610907477245F09b1cEd6C937c332E" target="_blank">MARKET <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>-->
          <a class="backHome" href="https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862" target="_blank">BUY SNAFU <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>
          <a class="backHome" href="https://vote.nftsnafu.org" target="_blank">VOTE <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>
          <a class="backHome" href="https://www.nftsnafu.org/farms" target="_blank">FARM <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>
          <a class="backHome" href="https://nftsnafu.org" target="_blank">LEARN MORE <v-icon class="backHome arrowRedirect"> mdi-arrow-top-right </v-icon></a>
        </Slide>
      </div>

    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
  components: {Slide},
  methods: {
    handleOpenMenu() {
      document.querySelector(".bm-burger-button").style.display = 'none'
    },
    handleCloseMenu() {
      document.querySelector(".bm-burger-button").style.display = 'block'
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth.toString(),
    }
  },
  created() {
    console.log('route',  this.$route.params);
  },
}
</script>

<style>
@media screen and (min-width: 769px) {
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
    position: fixed;
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

  #desktopHeader > #subtitle > a{
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
    color: #303030;
    font-size: 17px;
    font-weight: 500;
  }

  .backHome:hover {
    color: rgb(219, 219, 219) !important;
  }
  .backHome:hover > .arrowRedirect {
    color: rgb(219, 219, 219) !important;
  }

  .v-application a {
    color: #303030 !important;
  }

  a.backHome.router-link-exact-active.router-link-active {
    color: rgb(219, 219, 219) !important;
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

  #subtitleMobile > a{
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

  .bm-item-list>* {
    display: flex;
    padding: .7em 1.5em !important;
    text-decoration: none;
    font-size: 27px;
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