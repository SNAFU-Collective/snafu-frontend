<template>
  <v-app>
    <v-main>
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
/* On screens that are 992px or less, set the background color to blue */
@media screen and (max-width: 992px) {

}

/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 600px) {
  .walletconnect-modal__base{
    transform: translateY(0%) !important;
    top: 50px !important;
  }
}
</style>
