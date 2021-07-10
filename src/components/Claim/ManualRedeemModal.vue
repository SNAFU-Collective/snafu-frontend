<template>
  <div>
    <v-dialog v-model="showModal" max-width="550px" scrollable persistent >
      <v-card color="#F5F5F5">
        <v-card-title>
          <v-row no-gutters
          ><v-col offset="1" cols="10" class="text-center">
            Confirm Redeem
          </v-col>
            <v-col cols="1">
              <v-icon class="pl-3 pb-2" @click="closeModal"> mdi-close </v-icon>
            </v-col>
          </v-row>
        </v-card-title>

        <div style="overflow-y: auto">
          <v-card-text class="pt-3">
            <v-row
                no-gutters
                class="ont-weight-bold pt-2 pb-0"
                justify="center"
                style="text-align: center"
            >
              If you already burned the NFT fill the form with the hash of the transaction used to burn the NFT and sign
              it with your wallet.
            </v-row>
          </v-card-text>
          <claim-form :disableInput="false" :showSignBtn="true" class="pa-15"/>

        </div>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

import ClaimForm from './ClaimForm.vue';

export default {
  components: { ClaimForm},
  data() {
    return {
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateDialog", false);
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit("updateDialog", false);
    },
  }
};
</script>

<style>


</style>