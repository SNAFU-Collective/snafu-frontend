<template>
  <v-app>
    <Header/>
    <router-view />
<!--    <v-main />-->
    <ScrollToTop/>
    <Footer
      style="margin-top: 100px"
    />
  </v-app>
</template>

<script>
import {mapActions} from "vuex"
import Header from "./components/Header/Header"
import ScrollToTop from "./components/ScrollToTop/Button"
import Footer from "./components/Footer/Footer"

export default {
  name: "App",

  components: {
    Footer,
    Header,
    ScrollToTop
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

@media screen and (max-width: 768px) {
  .h2 {
    color: rgba(48, 48, 48, 0.91);
    font: normal normal normal 20px/1em barlow-medium, barlow, sans-serif;
  }

}

@media screen and (min-width: 768px) {
  .h2 {
    color: #303030;
    font: normal normal normal 25px/1.4em barlow-medium, barlow, sans-serif;
  }
}

.container {
  max-width: 1185px !important;
}

html, body {
  font-family: 'Barlow', sans-serif;
}

#app {
  font-family: 'Barlow', sans-serif;
}

.filter {
  margin: 0;
  font-size: 12px !important;
  color:  rgb(143, 143, 143);
}

.currentTag > span {
  color: #000;
  opacity: 1 !important;
  font-weight: 600;
}

.currentTag {
  left: 0;
  bottom: 1px;
  border-radius: 0 !important;
  border-width: 0 0 1px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-style: solid;
  opacity: 1 !important;
}

@media screen and (max-width: 768px) {
  .filters-row {
    margin: 0 10%;
  }
}

</style>