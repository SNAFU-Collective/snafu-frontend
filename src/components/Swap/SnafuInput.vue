<template>
  <v-container fluid class="white rounded-lg">
    <v-row no-gutters class="text-caption">TO</v-row>
    <v-row no-gutters align-content="center" class="pt-2">
      <v-col cols="3"  >
        <v-text-field outlined hide-details readonly class="whiteBorder" v-model="snafuValue"></v-text-field>
      </v-col>
      <v-col >
        <v-row no-gutters justify="center" align-self="center">
          <v-avatar class="logoBorder mr-2" size="30">
            <v-img src="logo.png" />
          </v-avatar>
          <span class="text-body-2"> SNAFU </span>
        </v-row>
        <v-row no-gutters justify="center" class="pl-8">
          <span class="text-caption"> ERC20 </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      snafuValue: 100,
    };
  },
};
</script>

<style>
.v-text-field--outlined.whiteBorder fieldset {
    color: white !important;
}

.v-text-field.whiteBorder input {
    font-size: 1.2em;
    font-weight: bold;
}
</style>