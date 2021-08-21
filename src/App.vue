<template>
  <v-app>
    <div style="height:100px; width: 100%; background-color: #303030;" class="container">
      <p style="color: white; text-align: center"><strong>Warning:</strong> we are experiencing some rate-limit problems while fetching SNAFU NFTs information.
        <br>
        While we are looking into solving this the <strong>Leaderboard, Wallet, Catalog and Swap</strong> features will not be completely functional.
        <br>
        We are sorry for the inconvenience. <strong>This is only a frontend issue</strong> that we'll try to solve as soon as possible.
      </p>
    </div>
    <v-main>

      <Header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex"
import Header from "./components/Header/Header"

export default {
  name: "App",

  components: {
    Header
  },

  methods: {
    ...mapActions("connectweb3", ["startWeb3"]),
  },
  beforeMount(){
    this.startWeb3();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow:200,400,600,800');

html, body {
  font-family: 'Barlow', sans-serif;
}

#app {
  font-family: 'Barlow', sans-serif;
}
</style>