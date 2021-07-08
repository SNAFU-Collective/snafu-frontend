<template>
  <v-card min-width="50%">
      <v-card-title  primary-title class="justify-center">
          Submit Shipping Informations
      </v-card-title>
    <v-card-text class="mt-5">
      <v-form v-model="validForm">
        <v-row>
          <v-text-field
            v-model="formData.burnTxHash"
            outlined
            label="Token Burn Transaction Hash"
            class="mx-10"
            required
            :rules="rules.txHash"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="formData.fullName"
            outlined
            label="Full Name"
            class="ml-10 mr-5"
            :rules="rules.required"
            required
          ></v-text-field>
          <v-text-field
            v-model="formData.email"
            outlined
            label="Email"
            class="mr-10 mr-5"
            required
            :rules="rules.email"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="formData.address"
            outlined
            label="Full Address"
            class="mx-10"
            required
            :rules="rules.required"
          ></v-text-field>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
        <v-btn color="black" class="white--text" :disabled="!validForm" :loading="loading" large @click="submitInformation"> Submit </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { ethers } from 'ethers';
export default {
  data() {
    return {
      formData: {},
      validForm: false,
      loading: false, 
      rules:{
          txHash: [
              v => !!v || 'Transaction hash is required',
              v => /^0x([A-Fa-f0-9]{64})$/.test(v) || "Invalid Transaction Format"
          ],
          email: [
            v => !!v || 'Email is required',
            v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || "Invalid Email"
          ],
          required:[
            v => !!v || 'Required field',
          ]
      }
    };
  },
  computed:{
      ...mapGetters("connectweb3", ["getUserSigner"])
  },
  methods: {
      submitInformation(){
          this.loading = true;
          let payload = JSON.stringify(this.formData);
          console.log(payload)
          this.getUserSigner.signMessage(payload).then((res) => {
              console.log(res);
              this.loading = false;
              let signAddress = ethers.utils.verifyMessage(payload, res);
              console.log(signAddress);
          })
          
      }
  }
};
</script>

<style>
</style>