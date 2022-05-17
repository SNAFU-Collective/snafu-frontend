<template>
  <div style="height: 1000px; text-align: center; width: 100%">
    <v-row style="">
      <v-col cols-md="12" colls-xs="12" class="topCatalogText px-15" style="text-align: center; color: #303030d4; margin-bottom: 0 !important;">
        <p  class="h2 mt-5">Transfer your NFTs across blockchains.</p>
        <p  class="h2">Unleash your <b>digital freedom</b> and use your NFTs <b>where and when you want it</b>.</p>
        <p  class="h2 powered">Powered by <a class="link" href="https://xp.network/" target="_blank">xp.network</a>.</p>
      </v-col>
    </v-row>
    <iframe src="https://widget-staging.xp.network/?widget=true&amp;background=ffffff&amp;color=0d0d0d&amp;fontSize=16&amp;btnColor=ffffff&amp;btnBackground=000000&amp;btnRadius=9&amp;fontFamily=Roboto&amp;chains=BSC-xDai&amp;cardBackground=1e222d&amp;cardRadius=25&amp;secondaryColor=242424&amp;accentColor=10193d&amp;borderColor=37405b&amp;iconColor=000000&amp;wallets=MetaMask-WalletConnect&amp;bridgeState=undefined&amp;showLink=true&amp;cardColor=ffffff&amp;cardBackgroundBot=3e4454" frameborder="0" class="XPNetworkFrame" height="100%"></iframe>
  </div>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {

    }
  },
  props: {

  },
  computed: {

  },
  methods: {}
}
</script>

<style>
.powered {
  font-size: 15px;
  font-weight: bold;
}

@media (max-width: 767px) {
.XPNetworkFrame{
  width: 100% !important;

}
}

@media (min-width: 768px) {
  .XPNetworkFrame{
    width: 80% !important;

  }
}
</style>