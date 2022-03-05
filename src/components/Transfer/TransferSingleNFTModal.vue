<template>
  <v-dialog v-model="showModal" @input="v => v || resetModal()" scrollable max-width="500px" :persistent="loading">
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters style="width: 100%">
          <v-col offset="1" cols="10" style="word-break: break-word; text-align: center">
            Transfer
          </v-col>
          <v-col cols="1">
            <v-icon small class="pl-3" @click="closeModal"> mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text v-if="transferPhase === 1">
        <v-row no-gutters class="pt-5" style="width: 100%; display: block; font-size: 12px;">
          <span>TO</span>
          <v-text-field
              outlined
              v-model="destinationAddress"
              dense
              placeholder="0x854844...AF45"
              background-color="white"
          />
        </v-row>
        <div style="text-align: left;"><span v-if="destinationAddressError" style="color: red;">Please enter a valid destination address</span>
        </div>

        <v-row no-gutters class="pt-5" style="width: 100%; display: block; font-size: 12px;">
          <span>AMOUNT (Max: {{this.nftToTransfer.editions}})</span>
          <v-text-field
              outlined
              v-model="amount"
              dense
              type="number"
              placeholder="1"
              background-color="white"
          />
        </v-row>
        <div style="text-align: left;"><span v-if="amountError" style="color: red;">Please enter a valid amount</span>
        </div>
      </v-card-text>

      <v-card-text v-if="transferPhase === 2">
        <v-row justify="center" no-gutters class="pt-5" style="width: 100%; display: block; font-size: 15px;text-align: center; color: #303030">
          <v-img justify="center" max-height="150px" style="margin: 0 auto;" :src="metadata.image"></v-img>
          <p class="pt-15">Are you sure you want to send <b>{{amount}} editions</b> <br> of <b>{{metadata.name}}</b> to <b>{{destinationAddress}}</b>?</p>
        </v-row>
      </v-card-text>

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
              style="text-align: center"
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
          <v-btn large dark @click="goNext()" :disabled="!this.destinationAddress || !this.amount"
                 v-if="(transferPhase === 1)"> NEXT
          </v-btn>
          <v-btn large dark @click="goBack()" v-if="transferPhase === 2"> BACK</v-btn>
          <v-btn large dark @click="confirmTransfer()" v-if="transferPhase === 2" class="ml-5"> CONFIRM</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex"
import axios from "axios"

export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    nftToTransfer: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      metadata: null,
      destinationAddress: null,
      destinationAddressError: false,
      amount: 1,
      amountError: false,
      loading: false,
      confirmed: false,
      error: false,
      errorMessage: null,
      txHash: null,
      transferPhase: 1,
      formValidated: false,
    }
  },
  computed: {
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
  beforeMount(){
    this.getMetadata()
  },
  methods: {
    ...mapActions("transferNFTs", ["singleTransfer", 'isAddress', 'refreshUserNfts']),
    closeModal() {
      this.resetModal()
      this.$emit("updateDialog", false)
    },
    async getMetadata() {
      let res = await axios.get("./nfts/" + this.nftToTransfer.id + "/metadata.json")
      this.metadata = res.data
    },
    async validate() {
      let valid = true

      if(!await this.isAddress(this.destinationAddress)) {
        this.destinationAddressError = true
        valid = false
      } else {
        this.destinationAddressError = false
      }

      if(this.amount > this.nftToTransfer.editions || this.amount < 1) {
        this.amountError = true
        valid = false
      } else {
        this.amountError = false
      }

      this.formValidated = valid
    },
    async goNext() {
      await this.validate()
      if(!this.formValidated) {
        return false
      }

      this.transferPhase = 2
    },
    goBack() {
      this.resetModal()
    },
    async confirmTransfer() {
      try {
        this.transferPhase = 3
        this.loading = true

        let tx = await this.singleTransfer({
          id: this.nftToTransfer.id,
          destinationAddress: this.destinationAddress,
          amount: this.amount
        })
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
      this.destinationAddress = null
      this.amount = 1
    },
  },
}
</script>

<style>
</style>