<template>
  <v-footer
      style="background-color: rgb(242, 242, 242)"
      padless
  >
    <v-container>
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
              @click="goTo('https://www.info.nftsnafu.org/')"
          >
            <v-icon size="24px">
              mdi-web
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="black--text footerText" style="width: 100%; text-align: justify">
          <p>
            SNAFU is an <b class="blueColor">Italian underground art collective</b> that established a platform
            that leverages the new power NFTs have brought to the art world to <b class="blueColor">provide a steadier revenue stream to the global and local art community.</b>
            The collective created a colorful and engaging platform (also called SNAFU) where artists can mint their work as NFTs and interact directly with patrons
            and collectors.
            <br>
            We navigate in the digital ocean in a stubborn and contrary direction, because we are pirates and we want to take everything we deserve.
          </p>
        </v-card-text>
        <v-row justify="center">
          <v-btn text class="font-weight-thin" style="color: black" @click="$router.push('/manifest')">
            Read the manifest
          </v-btn>
        </v-row>

        <v-divider class="mt-10"></v-divider>

        <v-card-text class="black--text">
          <span>© 2022 by Collettivo SNAFU, Italia</span>
          <br>
          <a>hello@nftsnafu.org</a>
        </v-card-text>
      </v-card>
    </v-container>
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
    line-height: 1.2;
  }
}

@media screen and (max-width: 768px) {
  .footerText {
    margin: 0;
    line-height: 1.4;
  }
}
</style>