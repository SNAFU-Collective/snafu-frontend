<template>
  <v-card min-width="50%" style="border-shadow: none">
    <v-card-title primary-title class="justify-center">
      Shipping Information
    </v-card-title>
    <v-card-text class="mt-5">
      <v-form v-model="validForm">
        <v-row>
          <v-text-field
              v-model="formData.burnTxHash"
              outlined
              label="Token Burn Transaction Hash"
              class=""
              required
              :disabled="disableInput"
              :rules="rules.txHash"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              v-model="formData.fullName"
              outlined
              label="Full Name"
              class="mr-1"
              :rules="rules.required"
              required
          ></v-text-field>
          <v-text-field
              v-model="formData.email"
              outlined
              label="Email"
              class="ml-1"
              required
              :rules="rules.email"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              v-model="formData.address"
              outlined
              label="Full Address"
              class=""
              required
              :rules="rules.required"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
              v-model="formData.additionalInformation"
              outlined
              label="Additional information"
              class=""
          ></v-text-field>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center" style="display: grid">
      <v-row justify="center">
        <vue-recaptcha :sitekey="recaptchaSiteKey" :loadRecaptchaScript="true" @verify="handleCaptcha"></vue-recaptcha>
      </v-row>

      <v-row justify="center" class="mt-10">
        <v-btn v-if="showSignBtn" color="black" class="white--text" :disabled="!validForm" :loading="loading" large
               @click="submitInformation"> Submit
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import {ethers} from 'ethers'
import {mapFields} from 'vuex-map-fields'
import VueRecaptcha from 'vue-recaptcha'
import {recaptchaSiteKey} from "@/utils/constants"

export default {
  components: {
    VueRecaptcha,
  },
  props: {
    disableInput: {
      type: Boolean,
      default: true,
    },
    showSignBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      recaptchaSiteKey,
      loading: false,
      rules: {
        txHash: [
          v => !!v || 'Transaction hash is required',
          v => /^0x([A-Fa-f0-9]{64})$/.test(v) || "Invalid Transaction Format",
        ],
        email: [
          v => !!v || 'Email is required',
          v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || "Invalid Email",
        ],
        required: [
          v => !!v || 'Required field',
        ],
      },
    }
  },
  computed: {
    ...mapGetters("connectweb3", ["getUserSigner"]),
    ...mapFields("prizeContract", ["formData", "validForm", "recaptchaResponse"]),
  },
  methods: {
    handleCaptcha(res) {
      this.recaptchaResponse = res
    },
    submitInformation() {
      this.loading = true
      let payload = JSON.stringify(this.formData)
      console.log(payload)
      this.getUserSigner.signMessage(payload).then((res) => {
        console.log(res)
        this.loading = false
        let signAddress = ethers.utils.verifyMessage(payload, res)
        console.log(signAddress)
        //TODO: svuotare form ... feedback successo!
      }).catch(() => {
        this.loading = false
        this.error = true
      })

    },
  },
}
</script>

<style>
</style>