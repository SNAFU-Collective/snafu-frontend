<template>
  <v-row>
    <v-card class="mx-auto" :max-width="cardSize || 250">
      <v-card-text style="white-space: pre; background-color: #F5F5F5">
        <v-row justify="center">
          <v-dialog
              v-model="fullscreen"
              width="600px"
          >
            <v-card>
              <v-row>
                <v-col cols="10">
                  <v-card-title>
                    <span class="truncateLong">{{ metadata.name }}</span>
                  </v-card-title>
                  <v-card-subtitle>
                    <pre class="nftDescription">{{ metadata.description }}</pre>
                  </v-card-subtitle>
                  <v-card-subtitle style="margin-top: -20px">
                    <a :href="metadata.external_url" target="_blank"
                       style="color: rgba(0, 0, 0, 0.6) !important;">Unique Marketplace</a>
                  </v-card-subtitle>
                </v-col>
                <v-col cols="2" style="margin-top: 15px; text-align: right; padding-right: 25px;">
                  <v-btn
                      icon
                      @click="fullscreen = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-img v-if="!metadata.video" :src="'/nfts/'+nft.id+'/image'"/>
              <video controls v-else :src="'/nfts/'+nft.id+'/image'"/>
            </v-card>
          </v-dialog>
          <a @click="toggle" v-if="!metadata.video">
            <v-img  :src="'/nfts/'+nft.id+'/image'" :height="cardSize || 250" :width="cardSize || 250"/>
          </a>
          <video v-else controls :src="'/nfts/'+nft.id+'/image'" :height="cardSize || 250" :width="cardSize || 250"/>
        </v-row>

        <v-row style="display: flex; padding-top: 10px; padding-bottom: 5px" class="px-2">
          <span style="width: 60%; text-align: left" class="truncate"><strong>{{ metadata.name }}</strong></span>
          <span v-if="nft.editions" style="width: 40%; text-align: right"><strong>{{
              nft.editions
            }} of {{ metadata.editions }}</strong></span>
          <span v-else style="width: 40%; text-align: right"><strong>{{ metadata.editions }} Editions</strong></span>
        </v-row>
        <v-row class="px-2 subtext">ID: {{ nft.id }}</v-row>
        <v-row class="px-2 subtext">
          <v-col cols="9" style="text-align: left; padding: 0;">Value:
            {{ (+metadata.price + +metadata.fee) | truncatePrice }} SNAFU
          </v-col>
          <v-col cols="3" v-if="showBuyButton" style="position:absolute; left: 71%; bottom: -5px;">
            <v-btn small dark @click="prepareCheckout"> BUY</v-btn>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>

import axios from "axios"
import {mapFields} from "vuex-map-fields"

export default {
  props: {
    nft: {
      type: Object,
      required: true,
    },
    cardSize: {
      type: Number,
      required: false,
    },
    showBuyButton:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    ...mapFields("nftContract", [
      "selectedNft",
      "selectedQuantity",
      "selectedNftMetadata",
      "withdrawFromPool"
    ]),
  },
  methods: {
    toggle() {
      this.fullscreen = !this.fullscreen
    },
    async prepareCheckout() {
      //SCROLLA SU
      await setTimeout(() => {
        //scroll down only on desktop
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          })
      }, 500)

      //IMPOSTA SWAP SNAFU -> NFT
      this.withdrawFromPool = true;

      //NFT SElEZIONATO QUELLO CLICCATO
      this.selectedNft = this.nft;
      this.selectedNftMetadata = this.metadata;
      this.selectedQuantity = 1;
    }
  },
  data() {
    return {
      metadata: {},
      fullscreen: false,
    }
  },
  async beforeMount() {
    let res = await axios.get("./nfts/" + this.nft.id + "/metadata.json")
    this.metadata = res.data
  },
}
</script>

<style>
.subtext {
  color: #A7A7A7;
  font-weight: bold;
}

.truncate {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncateLong {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-dialog.v-dialog--active {
  overflow-y: hidden;
  overflow-x: hidden;
}

.nftDescription {
  font-size: 13px;
  line-height: 14px;
  font-family: 'Barlow', serif;
  margin-top: 10px;
  white-space: break-spaces;
}
</style>