<template>
  <v-row justify="center" style="text-align: left; display: flex" class="topText">
    <v-col cols-md="5" colls-xs="12" class="ma-6 leftText">
      <p class="h1"><b>SNAFU - Artists Collective</b></p>
      <br>
      <p class="h2 mt-5">Welcome to the home of the <b>Italian underground artists</b>.</p>
      <p class="h2 mt-5">Here you can find exclusive <b>NFTs</b> and <b>Original Artworks</b>. Join the other collectors in <b>farming NFTs</b> or try to win one of them at the <b>lottery</b>!</p>
    </v-col>

    <v-col v-if="allNFTs.length !== 0" cols-md="5" style="justify-content: end" class="onlyDesktop">
      <nft-card
          :key="allNFTs.find(x => x.id === currentId+'').id"
          :nft="allNFTs.find(x => x.id === currentId+'')"
          :cardSize=400
          class="ma-6"
      />
    </v-col>
  </v-row>
</template>


<script>
import Banner from "../Common/Banner"
import {mapFields} from "vuex-map-fields"
import NftCard from "../Collection/NftCard"

export default {
  components: {
    // Banner,
    NftCard
  },
  data() {
    return {
      currentIndex: 1,
      currentId: 29,
      topNFTs: [3, 5, 12, 26, 101, 85, 108, 105, 161, 29, 159]
    }
  },
  computed: {
    ...mapFields("nftContract", ["allNFTs"]),
    screenHeight() {
      return window.innerHeight
    },
  },
  methods: {
    getRandomInt() {
      let number
      do {
        number = Math.floor(Math.random() * this.topNFTs.length - 1)
      } while (this.topNFTs[number] === undefined)

      return number
    },
  },
  mounted() {
    setInterval(() => {
      this.currentIndex =  this.getRandomInt()
      this.currentId = this.topNFTs[this.currentIndex]
    }, 15000)
  },
}
</script>

<style>



@media screen and (min-width: 768px) {
  .topText .h1 {
    color: #303030;
    font-weight: bold;
    font: 48px barlow-bold,sans-serif;
  }

  .topText .h2 {
    color: #303030;
    font:normal normal normal 30px/1.4em barlow-medium,barlow,sans-serif;
  }

  .topText {
    margin: 40px;
  }
}

@media screen and (max-width: 768px) {
  .topText {
    margin: 0;
  }
  /*.onlyDesktop {*/
  /*  display: none;*/
  /*}*/
  .topText .h1 {
    color: #303030;
    font-weight: bold;
    font:25px barlow-bold,sans-serif;
  }

  .topText .h2 {
    color: #303030;
    font:normal normal normal 20px/1.3em barlow-medium,barlow,sans-serif;
  }

  .leftText{
    width: 100%;
  }
}

</style>
