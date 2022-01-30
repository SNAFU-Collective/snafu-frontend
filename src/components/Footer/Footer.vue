<template>
  <v-footer
      dark
      padless
  >
    <v-card
        flat
        tile
        class="text-center"
        style="background-color: #F2F2F2; width: 100%"
    >
      <v-card-text class="mt-5">
        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://twitter.com/nftsnafu')"
        >
          <v-icon size="24px">
            mdi-twitter
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://discord.gg/kvbxMfUyQD')"
        >
          <v-icon size="24px">
            mdi-discord
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://t.me/joinchat/8BfTPOsJZ8o3YjJk')"
        >
          <v-icon size="24px">
            mdi-send
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://github.com/SNAFU-Collective')"
        >
          <v-icon size="24px">
            mdi-github
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://www.nftsnafu.org/')"
        >
          <v-icon size="24px">
            mdi-web
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text footerText" style="width: 100%">
        <p>SNAFU is an Italian collective of artists composed of cyberpunks, painters, graphic designers, programmers, photographers, musicians, art lovers</p>
        <p>who try to create a unique point of view regarding what can be conceived like Art in an era where everything is digital and unsubstantial.</p>
         <p>At the same time, we are driven by the desire of creating a new form of sustenance for emerging artists exploiting new paradigms that blockchain and cryptocurrencies had brought.</p>
        <br>
        <p>We navigate in the digital ocean in a stubborn and contrary direction, because we are pirates and we want to take everything we deserve.</p>
        <v-btn text class="font-weight-thin" style="color: black" @click="$router.push('/manifest')">
          Read the manifest
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="black--text">
        <span>© 2022 by Collettivo SNAFU, Italia</span>
        <br>
        <a>hello@nftsnafu.org</a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    goTo(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style>
@media screen and (min-width: 768px) {
  .footerText {
    padding: 40px;
  }
}

@media screen and (max-width: 768px) {
  .footerText {
    margin: 0;
    line-height: 1.4;
  }
}
</style>