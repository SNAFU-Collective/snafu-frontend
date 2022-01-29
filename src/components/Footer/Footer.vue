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
            @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862')"
        >
          <v-icon size="24px">
            mdi-twitter
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862')"
        >
          <v-icon size="24px">
            mdi-discord
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862')"
        >
          <v-icon size="24px">
            mdi-send
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862')"
        >
          <v-icon size="24px">
            mdi-github
          </v-icon>
        </v-btn>

        <v-btn
            class="mx-4 black--text"
            icon
            @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862')"
        >
          <v-icon size="24px">
            mdi-web
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text pa-16" style="width: 100%">
        <span>SNAFU is an Italian collective of artists composed of cyberpunks, painters, graphic designers, programmers, photographers, musicians, art lovers</span>
        <br>
        <span>who try to create a unique point of view regarding what can be conceived like Art in an era where everything is digital and unsubstantial.</span>
        <br>
         <span>At the same time, we are driven by the desire of creating a new form of sustenance for emerging artists exploiting new paradigms that blockchain and cryptocurrencies had brought.</span>
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