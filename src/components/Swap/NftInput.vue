<template>
  <v-container fluid class="white rounded-lg">
    <v-row no-gutters class="text-caption">
      <v-col cols="8"> Quantity </v-col>
      <v-col cols="4">
        Balance: {{ selectedNft ? selectedNft.balance : "-" }}
      </v-col>
    </v-row>
    <v-row no-gutters align-content="center" class="pt-1 ml-n3">
      <v-col cols="4">
        <v-text-field
          hide-details="auto"
          :rules="quantityRules"
          outlined
          class="whiteBorder"
          v-model.number="quantity"
          type="number"
          :editable="false"
          :min="1"
          :max="selectedNft.balance"
          validate-on-blur
        ></v-text-field>
      </v-col>
      <v-col cols="4" />
      <v-col cols="4" @click="openSelectNftModal">
        <div v-if="selectedNft">
          <v-row no-gutters>
            <v-img
              :src="'/nfts/' + selectedNft.id + '/image'"
              height="50"
              width="50"
            />
            <v-icon medium> mdi-menu-down </v-icon>
          </v-row>
        </div>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedNft: {
        id: 1,
        balance: 3,
      },
      quantity: 1,
    };
  },
  methods:{
      openSelectNftModal(){
          console.log("test")
      }
  },
  computed: {
    quantityRules() {
      return [
        (value) => !!value || "Required",
        (value) =>
          (value && value > 0 && value <= this.selectedNft.balance) ||
          "Invalid Value",
      ];
    },
  },
};
</script>

<style>
.v-text-field--outlined.whiteBorder fieldset {
  color: white !important;
}

.v-text-field.whiteBorder input {
  font-size: 1.6em !important;
}
</style>