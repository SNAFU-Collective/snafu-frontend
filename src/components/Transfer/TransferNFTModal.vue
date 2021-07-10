<template>
  <v-dialog v-model="showModal" @input="v => v || resetModal()" scrollable max-width="500px" :persistent="loading">
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters style="width: 100%">
          <v-col offset="1" cols="10" style="word-break: break-word; text-align: center">
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
          v-if="transferPhase !== 4"
          justify="center"
          align="center"
          class="mb-5 mt-5"
          no-gutters
          style="width: 100%"
      >
        <v-row class="mb-5 mt-5" style="width: 100%" justify="center" align="center" v-if="this.transferPhase === 3">
          Are you sure you want to send the following NFTs:
        </v-row>
        <v-row style="width: 100%" justify="center" align="center"
               v-if="this.transferPhase === 1 && nftsToTransfer.length === 0"><span style="font-size: 10px">Selected NFTs will be displayed here</span>
        </v-row>

        <v-chip label v-for="nft in nftsToTransfer" :key="nft.id" :nft="nft" class="ma-1"
                style="padding: 0px 10px 0px 0px">
          <v-tooltip bottom color="rgb(0 0 0 / 89%)">
            <template v-slot:activator="{ on, attrs }" style="display: contents">
              <v-img
                  :src="'/nfts/' + nft.id + '/image'"
                  height="30"
                  width="30"
                  v-bind="attrs" v-on="on"
              />
              <div><span class="pl-2">x</span>
                <span>{{ nft.quantity }}</span></div>
            </template>
            <span>{{ nft.name }} | ID: {{ nft.id }}</span>
          </v-tooltip>
        </v-chip>

      </v-row>
      <v-card-text v-if="transferPhase === 1">
        <SelectNftToTransfer
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
        <div v-else-if="nftsToSelect.length === 0" class="text-body-2 my-3" style="text-align: center;">
          No SNAFU NFTs found in your wallet.
        </div>
      </v-card-text>
      <v-card-text v-if="transferPhase === 2">
        <v-row no-gutters class="pt-5" style="width: 100%; display: block; font-size: 10px;">
          <span>TO</span>
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

      <v-row
          v-if="transferPhase === 3"
          justify="center"
          align="center"
          style="width: 100%"
      >
        To this address:
      </v-row>
      <v-row
          v-if="transferPhase === 3"
          justify="center"
          align="center"
          class="mb-5 mt-5"
          no-gutters
          style="width: 100%"
      >
        <span><strong>{{ transferDestinationAddress }}</strong></span> <span class="pl-1">?</span>
      </v-row>

      <div v-if="loading">
        <v-card-text class="pt-3">
          <v-row no-gutters justify="center" class="py-4">
            <v-progress-circular
                :size="80"
                color="black"
                indeterminate
            ></v-progress-circular>
          </v-row>
          <v-row no-gutters justify="center" class="py-4 text-body-1">
            Transaction in progress
          </v-row>
          <v-row no-gutters justify="center" class="mt-n3" v-if="txHash">
            <a :href="txUrl" target="_blank" style="color: black">
              View Details on Blockscout
            </a>
          </v-row>
        </v-card-text>
      </div>

      <div v-if="confirmed">
        <v-card-text class="pt-3">
          <v-row no-gutters justify="center" class="py-4">
            <v-icon size="100" color="success">mdi-check-circle</v-icon>
          </v-row>
          <v-row no-gutters justify="center" class="py-4 text-body-1">
            Transaction completed
          </v-row>
          <v-row no-gutters justify="center" class="mt-n3">
            <a :href="txUrl" target="_blank" style="color: black">
              View Details on Blockscout
            </a>
          </v-row>
        </v-card-text>
      </div>

      <div v-if="error">
        <v-card-text class="pt-3">
          <v-row no-gutters justify="center" class="py-4">
            <v-icon size="100" color="error">mdi-alert</v-icon>
          </v-row>
          <v-row no-gutters justify="center" class="py-4 text-body-1">
            Transaction failed
          </v-row>
          <v-row
              no-gutters
              justify="center"
              class="mt-n3 red--text"
              v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-row>
          <v-row no-gutters justify="center" class="mt-n3" v-if="txHash">
            <a :href="txUrl" target="_blank" style="color: black">
              View Details on Blockscout
            </a>
          </v-row>
        </v-card-text>
      </div>

      <v-card-actions style="justify-content: center; display: block" class="ma-2">
        <v-row
            justify="center"
            align="center"
            style="width: 100%"
            no-gutters
        >
          <v-btn x-large dark @click="goNext()" :disabled="nftsToTransfer.length === 0"
                 v-if="transferPhase === 1 || transferPhase === 2"> NEXT
          </v-btn>
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
import SelectNftToTransfer from "./SelectNftToTransfer.vue"
import axios from "axios"

export default {
  components: {SelectNftToTransfer},
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
      modalTitle: 'Select the NFTs',
      transferDestinationAddress: null,
      destinationAddressError: false,
      loading: false,
      confirmed: false,
      error: false,
      errorMessage: null,
      txHash: null,
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
    txUrl() {
      return "https://blockscout.com/xdai/mainnet/tx/" + this.txHash
    },
    showModal: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit("updateDialog", false)
      },
    },
  },
  methods: {
    ...mapActions("transferNFTs", ["transfer", 'isAddress', 'refreshUserNfts']),
    closeModal() {
      this.resetModal()
      this.$emit("updateDialog", false)
    },
    async goNext() {
      switch (this.transferPhase) {
        case 1:
          this.transferPhase = 2
          this.modalTitle = 'Insert the destination address'
          break
        case 2:
          if (await this.isAddress(this.transferDestinationAddress)) {
            this.transferPhase = 3
            this.modalTitle = 'Confirm Transfer'
            break
          } else {
            this.destinationAddressError = true
            break
          }
      }
    },
    async confirmTransfer() {
      try {
        this.transferPhase = 4
        this.loading = true

        let tx = await this.transfer({nfts: this.nftsToTransfer, destinationAddress: this.transferDestinationAddress})
        this.txHash = tx.hash
        tx.wait()
            .then((res) => {
              //console.log(res);
              this.confirmed = true
              this.txHash = res.transactionHash
            })
            .catch((err) => {
              //console.log(err);
              this.error = true
              if (err.transactionHash) {
                this.txHash = err.transactionHash
              }
              if (err.message) {
                this.errorMessage = err.message
              }
            })
            .finally(() => {
              this.refreshUserNfts()
              this.loading = false
            })
      } catch (err) {
        //console.log(err);
        this.error = true
        if (err.transactionHash) {
          this.txHash = err.transactionHash
        }
        if (err.message) {
          this.errorMessage = err.message
        }

        this.loading = false
      }
    },
    resetModal() {
      this.transferPhase = 1
      this.modalTitle = 'Select the NFTs to transfer'
      this.transferDestinationAddress = null
      this.destinationAddressError = false
      this.loading = false
      this.confirmed = false
      this.error = false
      this.errorMessage = null
      this.txHash = null
      this.nftsToTransfer = []
    },
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