<template>
  <v-dialog v-model="showModal" scrollable max-width="500px">
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters style="width: 100%">
          <v-col cols="11" style="word-break: break-word;">
            {{ modalTitle }}
          </v-col>
          <v-col cols="1">
            <v-icon small class="pl-3" @click="closeModal"> mdi-close</v-icon>
          </v-col>
        </v-row>
        <v-row v-if="transferPhase === 1" no-gutters class="pt-5" style="width: 100%">
          <v-text-field
              outlined
              v-model.trim="filterByTitle"
              dense
              placeholder="Filter by Title"
              background-color="white"
          />
        </v-row>
      </v-card-title>
      <v-row
          v-if="transferPhase === 1 || transferPhase === 2"
          justify="center"
          align="center"
          class="mb-5 mt-5"
          no-gutters
          style="width: 100%"
      >
        <v-chip label v-for="nft in nftsToTransfer" :key="nft.id" :nft="nft" class="ma-1"
                style="padding: 0px 10px 0px 0px">
          <v-img
              :src="'/nfts/' + nft.id + '/image'"
              height="30"
              width="30"
          />
          <span class="pl-2">x</span> {{ nft.quantity }}
        </v-chip>
      </v-row>
      <v-card-text v-if="transferPhase === 1">
        <nft-select-card
            :nft="nft"
            v-for="nft in nftsToSelect"
            :key="nft.id"
            class="my-5"
            :reset="!showModal"
        />
        <v-row v-if="nftToFetch" justify="center" class="my-3">
          <v-progress-circular
              size="40"
              indeterminate
              color="black"
          ></v-progress-circular>
        </v-row>
        <div v-else-if="nftsToSelect.length === 0" class="text-body-2 my-3">
          No SNAFU NFTs found in your wallet.
        </div>
      </v-card-text>
      <v-card-text v-if="transferPhase === 2">
        <v-row no-gutters class="pt-5" style="width: 100%">
          <v-text-field
              outlined
              v-model="transferDestinationAddress"
              dense
              placeholder="0x854844...AF45"
              background-color="white"
          />
        </v-row>
        <div style="text-align: center;"><span v-if="destinationAddressError" style="color: red;">Please enter a valid destination address</span>
        </div>
      </v-card-text>
      <v-card-text v-if="transferPhase === 3">
        <v-row
            justify="center"
            align="center"
            class="mb-5 mt-5"
            no-gutters
            style="width: 100%"
        >
          Are you sure you want to send the following NFTs:
        </v-row>
        <v-row
            justify="center"
            align="center"
            class="mb-5 mt-5"
            no-gutters
            style="width: 100%"
        >
          <v-chip label v-for="nft in nftsToTransfer" :key="nft.id" :nft="nft" class="ma-1"
                  style="padding: 0px 10px 0px 0px">
            <v-img
                :src="'/nfts/' + nft.id + '/image'"
                height="30"
                width="30"
            />
            <span class="pl-2">x</span> {{ nft.quantity }}
          </v-chip>
        </v-row>
        <v-row
            justify="center"
            align="center"
            class="mb-5 mt-5"
            no-gutters
            style="width: 100%"
        >
          To this address:
        </v-row>
        <v-row
            justify="center"
            align="center"
            class="mb-5 mt-5"
            no-gutters
            style="width: 100%"
        >
          <span>{{transferDestinationAddress}}</span> <span class="pl-2">?</span>
        </v-row>
      </v-card-text>
      <v-card-actions style="justify-content: center; display: block" class="ma-2">
        <v-row
            justify="center"
            align="center"
            style="width: 100%"
            no-gutters
        >
          <v-btn x-large dark @click="goNext()" :disabled="nftsToTransfer.length === 0"  v-if="transferPhase === 1 || transferPhase === 2"> NEXT</v-btn>
          <v-btn x-large dark @click="confirmTransfer()" v-if="transferPhase === 3"> CONFIRM</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import {mapActions, mapGetters, mapState} from "vuex"
import {snafu20Address} from "../../utils/constants"
import NftSelectCard from "./NftSelectCard.vue"
import axios from "axios"

export default {
  components: {NftSelectCard},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterById: "",
      filterByTitle: "",
      metadata: [],
      transferPhase: 1,
      modalTitle: 'Select the NFTs to transfer',
      transferDestinationAddress: null,
      destinationAddressError: false,
    }
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("transferNFTs", ["nftsToTransfer"]),
    ...mapFields("nftContract", [
      "selectedNft",
      "selectedQuantity",
      "selectedNftMetadata",
    ]),
    ...mapState("nftContract", {
      nfts(state) {
        let nfts = this.pool ? state[snafu20Address] : state[this.account]

        if (nfts) {
          nfts.forEach(async (nft) => {
            let res = await axios.get("./nfts/" + nft.id + "/metadata.json")
            this.metadata.push(res.data)
          })
        }

        return nfts
      },
      nftToFetch(state) {
        return this.pool ? state[snafu20Address] == undefined : state[this.account] == undefined
      },
    }),
    nftsToSelect() {
      if (!this.nfts) {
        return []
      }
      let nft = this.nfts

      if (this.filterByTitle && this.metadata) {
        nft = nft.filter((n) => {
          let nftMetadata = this.metadata.find(element => element.id === n.id)
          if (nftMetadata) {
            return (nftMetadata.name.toLowerCase()).includes(this.filterByTitle.toLowerCase())
          }
        })
      }

      return nft
    },
    showModal: {
      get() {
        return this.show
      },
      set(val) {
        this.nftsToTransfer = []
        this.$emit("updateDialog", false)
      },
    },
  },
  methods: {
    ...mapActions("transferNFTs", ["transfer", 'isAddress']),
    closeModal() {
      this.nftsToTransfer = []
      this.transferPhase = 1
      this.destinationAddressError = false
      this.modalTitle = 'Select the NFTs to transfer'
      this.$emit("updateDialog", false)
    },
    async goNext() {
      switch (this.transferPhase) {
        case 1:
          console.log(this.nftsToTransfer)
          this.transferPhase = 2
          this.modalTitle = 'Insert the destination address'
          break
        case 2:
          if (await this.isAddress(this.transferDestinationAddress)) {
            this.transferPhase = 3
            this.modalTitle = 'Confirm transfer'
            break
          } else {
            this.destinationAddressError = true
            break
          }
      }
    },
    async confirmTransfer() {
      console.log(this.transferDestinationAddress)
      await this.transfer({nfts: this.nftsToTransfer, destinationAddress: this.transferDestinationAddress})
    }
  },
}
</script>

<style>
.row.text-subtitle-2.truncate.no-gutters {
  font-weight: 600;
  font-size: .75rem !important;
}

.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #0000001f !important;
}
</style>