<template>
  <div>
    <v-card class>
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <v-img
                :src="'/nfts/' + nft.id + '/image'"
                height="120"
                width="120"
            />
          </v-col>

          <v-col cols="8" class="nft-details">
            <v-row no-gutters>
              <v-col cols="12" class="text-subtitle-2 truncate" style="font-weight: bold;"> {{ metadata.name }}</v-col>
            </v-row>
            <v-row no-gutters justify="start" class="mr-2 mt-5" style="align-items: center">
              <v-col cols="8">
                <v-row>
                  <v-col cols="12" style="justify-content: start; padding-bottom: 0;padding-top: 0"> <span>Select quantity </span></v-col>
                  <v-col cols="12" style="justify-content: start; padding-top: 1px">  <span>(Max: {{ ownedEditions }})</span> </v-col>
                </v-row>
                    <v-numeric
                        hide-details="auto"
                        v-model="defaultQuantity"
                        :maxValue="nft.editions"
                        @change="updateNftToTransfer"
                        ref="quantityToTransferInput"
                    ></v-numeric>
              </v-col>
              <v-col cols="3" offset="1" v-if="transferSingleNft">
               <v-btn small dark style="position: absolute; bottom: 15px">SEND</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios"
import {mapGetters} from "vuex"
import VNumeric from "../Input/vNumeric"
import {mapFields} from "vuex-map-fields"

export default {
  components: {VNumeric},
  props: {
    nft: {
      type: Object,
      required: true,
    },
    hideSelect: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: true,
    },
    transferSingleNft: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters("nftContract", ["getUserBalance"]),
    ...mapFields("transferNFTs", ["nftsToTransfer"]),
    ownedEditions() {
      return this.getUserBalance(this.nft.id)
    },
  },
  methods: {
    updateNftToTransfer() {
      if (this.defaultQuantity === 0) {
        this.nftsToTransfer = this.nftsToTransfer.filter((nft) => {
          return nft.id !== this.nft.id
        })
      } else {
        let nft = this.nftsToTransfer.find(element => element.id === this.nft.id)
        if (nft) {
          nft.quantity = this.defaultQuantity
        } else {
          this.nftsToTransfer.push({
            id: this.nft.id,
            quantity: this.defaultQuantity,
            name: this.metadata.name,
          })
        }
      }
    }
  },
  data() {
    return {
      defaultQuantity: 0,
      metadata: {},
    }
  },
  async beforeMount() {
    let res = await axios.get("./nfts/" + this.nft.id + "/metadata.json")
    this.metadata = res.data
  },
  watch: {
    reset: function(val) {
      if (val === true) {
        this.defaultQuantity = 0
      }
    }
  }
}
</script>

<style>
.truncate {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>