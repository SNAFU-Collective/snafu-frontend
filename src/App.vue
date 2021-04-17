<template>
  <v-app>
    <v-main>
<!--      TODO: add here header-->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "App",

  components: {
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
@import url('https://fonts.googleapis.com/css?family=Barlow+medium');

html, body {
  font-family: 'Barlow', sans-serif;
}

#app {
  font-family: 'Barlow', sans-serif;
}
</style>