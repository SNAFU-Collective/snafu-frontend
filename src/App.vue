<template>
  <v-app>
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