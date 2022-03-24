<template>
  <v-row>
    <v-card :ripple="true" class="mx-auto nftCard" :max-width="cardSize || 250">
      <v-card-text style="white-space: pre; background-color: #F5F5F5">
        <v-row justify="center">
          <v-dialog
              v-model="fullscreen"
              width="600px"
              @input="v => v || pauseAllVideos()"
          >
            <v-card style="text-align: center">
              <v-row style="text-align: left" class="pa-2">
                <v-col cols="10">
                  <v-card-title>
                    <span class="truncateLong">{{ metadata.name }}</span>
                  </v-card-title>
                  <v-card-subtitle>
                    <pre class="nftDescription">{{ metadata.description }}</pre>
                    <pre class="nftDescription"><b>Artist</b>:  <a
                        @click="goToArtistPage()">{{ artistName() }} {{ artistNickname() }}</a></pre>
                  </v-card-subtitle>
                  <v-card-subtitle style="margin-top: -20px">
                    <a href="" style="color: rgba(0, 0, 0, 0.6) !important;">View details</a>
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
              <img v-if="!metadata.animation_url" :src="'/nfts/'+nft.id+'/image'" class="fullscreenImage"/>
              <video controls loop v-else :src="metadata.animation_url" style="width: 100%"/>
            </v-card>
          </v-dialog>
          <a @click="toggle">
            <v-img :src="'/nfts/'+nft.id+'/image'" :height="cardSize || 250" :width="cardSize || 250">
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </a>
        </v-row>

        <v-row style="display: flex; padding-top: 10px; padding-bottom: 5px" class="px-2">
          <span style="width: 60%; text-align: left" class="truncate"><strong>{{ metadata.name }}</strong></span>
          <span v-if="nft.editions" style="width: 40%; text-align: right"><strong>{{ nft.editions }} of {{
              metadata.editions
            }}</strong></span>
          <span v-else style="width: 40%; text-align: right"><strong>{{ metadata.editions }} Editions</strong></span>
        </v-row>

        <v-row class="px-2 subtext">
          <v-col cols="9" style="justify-content: left; padding-left: 0 !important;    padding-bottom: 2px;">
            ID: {{ nft.id }}
          </v-col>
          <v-col cols="3" style="position: absolute; right: 0px; bottom: 0px" v-if="showArtist">
            <v-tooltip bottom color="#000">
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mr-0 pointerOnHover" size="22" v-bind="attrs" v-on="on">
                  <v-img :src="artist.profile_image"></v-img>
                </v-avatar>
              </template>
              <span>
                <v-avatar class="mr-0" size="30">
                  <v-img :src="artist.profile_image"/>
                </v-avatar>
                @{{ artistNickname() }}
              </span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row class="px-2 subtext">
          <v-col cols="9" style="text-align: left; padding: 0;" v-if="showPrice">Price:
            {{ (+metadata.price + +metadata.fee) | truncatePrice }} SNAFU
          </v-col>

          <v-col cols="3" v-if="showBuyButton" style="position:absolute; left: 68%; bottom: -5px;">
            <v-btn small outlined color="black" style="font-weight: 600;" @click="prepareCheckout"> MINT</v-btn>
          </v-col>

          <v-col cols="3" v-if="showTransferBtn" style="position:absolute; left: 75%; bottom: -5px;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small text color="black" v-bind="attrs" v-on="on" style="font-weight: 600;"
                       @click="openTransferNftModal">
                  <v-icon size="20px">mdi-swap-horizontal</v-icon>
                </v-btn>
              </template>
              <span>Transfer NFT</span>
            </v-tooltip>
            <TransferSingleNFTModal :nftToTransfer="nft" :show="showTransferModal"
                                    @updateDialog="() => showTransferModal = false"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>

import axios from "axios"
import {mapFields} from "vuex-map-fields"
import TransferSingleNFTModal from "../Transfer/TransferSingleNFTModal"
import {find, orderBy} from "lodash"
import {leaderboardAddressToFilter} from "../../utils/constants"

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
    showBuyButton: {
      type: Boolean,
      default: false,
    },
    showTransferBtn: {
      type: Boolean,
      default: false,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    showArtist: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TransferSingleNFTModal,
  },
  computed: {
    ...mapFields("nftContract", [
      "selectedNft",
      "selectedQuantity",
      "selectedNftMetadata",
      "withdrawFromPool",
    ]),
  },
  beforeUpdate () {
    axios.get("http://localhost:80/api/v1/user/username/" + this.artistNickname())
        .then(response => (this.artist = response.data.data))
        .catch(error => console.log(error))
  },
  watch: {
    'fullscreen': {
      async handler(newVal, oldVal) {
        await setTimeout(() => {
          this.pauseAllVideos()
        }, 700)
      },
      deep: true,
    },
  },
  methods: {
    goToArtistPage() {
      this.$router.push({path: `artist/` + this.artistNickname()})
    },
    attributes() {
      let arr = {}

      arr = this.metadata.attributes.map((event) => ({...arr, [event.key]: event.value}))
      return arr
    },
    artistNickname() {
      let artist = find(this.metadata.attributes, {'key': 'artist-nick'})
      return artist ? artist.value : ""
    },
    artistName() {
      let artist = find(this.metadata.attributes, {'key': 'Artist'})
      return artist ? artist.value : ""
    },
    pauseAllVideos() {
      let videoList = document.getElementsByTagName("video")
      for (let i = 0; i < videoList.length; i++) {
        videoList[i].pause()
      }
    },
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
      this.withdrawFromPool = true

      //NFT SElEZIONATO QUELLO CLICCATO
      this.selectedNft = this.nft
      this.selectedNftMetadata = this.metadata
      this.selectedQuantity = 1
    },
    openTransferNftModal() {
      if (!this.disableActions) {
        this.showTransferModal = true
      }
    },
  },
  data() {
    return {
      metadata: {},
      fullscreen: false,
      showTransferModal: false,
      artist: {
        profile_image: '/pfp/unknown.jpeg'
      },
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
  text-align: justify;
  font-size: 13px;
  line-height: 14px;
  font-family: 'Barlow', serif;
  margin-top: 10px;
  white-space: break-spaces;
}

@media screen and (min-width: 768px) {
  .fullscreenImage {
    max-width: 500px;
    max-height: 500px;
  }
}

@media screen and (max-width: 768px) {
  .fullscreenImage {
    max-width: 350px;
    max-height: 350px;
  }
}


</style>