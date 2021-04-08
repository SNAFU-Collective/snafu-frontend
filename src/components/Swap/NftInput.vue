<template>
  <v-container fluid class="white rounded-lg">
    <v-row no-gutters class="text-caption">FROM</v-row>
    <v-row no-gutters align-content="center" class="pt-2">
      <v-col cols="3"  >
        <v-text-field outlined hide-details class="whiteBorder" v-model="selectedNft"></v-text-field>
      </v-col>
      <v-col >
        <v-row no-gutters justify="center" align-self="center">
          <v-avatar class="logoBorder mr-2" size="30">
            <v-img src="logo.png" />
          </v-avatar>
          <span class="text-body-2"> SNAFU Collection </span>
        </v-row>
        <v-row no-gutters justify="center" class="pl-3">
          <span class="text-caption"> ERC1155 NFTS </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedNft: 1,
    };
  },
};
</script>

<style>
.v-text-field--outlined.whiteBorder fieldset {
    color: white !important;
}
</style>