<template>
  <v-app>
    <v-main>
      <SnafuHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex"
import SnafuHeader from "./components/Header/SnafuHeader"

export default {
  name: "App",

  components: {
    SnafuHeader
  },

  methods: {
    ...mapActions("connectweb3", ["startWeb3"]),
  },
  beforeMount(){
    this.startWeb3()
  },
  data: () => ({
    //
  }),
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