<template>
  <div style="display: flex">
    <div class="divCornice">
      <v-img
          class="inside"
          :width="screenWidth > 768 ? '360px' : '250px'"
          :height="screenWidth > 768 ? '360px' : '250px'"
          src="david/preview/1.gif"
      />
      <v-img
          class="inside"
          :width="screenWidth > 768 ? '360px' : '250px'"
          :height="screenWidth > 768 ? '360px' : '250px'"
          src="david/preview/frameShade.png"
      />
    </div>
    <div class="divCornice">
      <v-img
          class="inside"
          :width="screenWidth > 768 ? '360px' : '250px'"
          :height="screenWidth > 768 ? '360px' : '250px'"
          src="david/preview/2.gif"
      />
      <v-img
          class="inside"
          :width="screenWidth > 768 ? '360px' : '250px'"
          :height="screenWidth > 768 ? '360px' : '250px'"
          src="david/preview/frameShade.png"
      />
    </div>
    <div class="divCornice">
      <v-img
          class="inside"
          :width="screenWidth > 768 ? '360px' : '250px'"
          :height="screenWidth > 768 ? '360px' : '250px'"
          src="david/preview/3.gif"
      />
      <v-img
          class="inside"
          :width="screenWidth > 768 ? '360px' : '250px'"
          :height="screenWidth > 768 ? '360px' : '250px'"
          src="david/preview/frameShade.png"
      />
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  methods: {
    getRandomInt(max) {
      let number = Math.floor(Math.random() * max)
      if (number === 0) number = 1
      return number
    },
  },
  data() {
    return {}
  },
  computed: {
    screenHeight() {
      return window.innerHeight
    },
    screenWidth() {
      return window.innerWidth
    },
    selectedGif() {
      return this.getRandomInt(4)
    },
  },
  mounted() {
  },
}
</script>

<style>
.divCornice {
  position: relative;
  width: 380px;
  height: 380px;
}

.inside {
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>