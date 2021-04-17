<template>
  <v-container fluid class="white rounded-lg">
    <v-row no-gutters class="text-caption">
      <v-col cols="4"> Value </v-col>
      <v-col cols="8" > 
          <v-row no-gutters justify="end">
          Balance: {{ balance | fromWei }} 
          </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters align-content="center" class="pt-1 ml-n3">
      <v-col cols="9" >
        <v-text-field
          outlined
          dense
          hide-details
          readonly
          class="whiteBorder"
          v-model="snafuValue"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-row no-gutters class="pt-2">
          <v-avatar class="logoBorder mr-2" size="30">
            <v-img src="logo.png" />
          </v-avatar>
          <span class="text-body-1"> SNAFU </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      snafuValue: 100.00001,
    };
  },
  computed: {
    ...mapFields("connectweb3", { balance: "snafuBalance" }),
  },
};
</script>

<style scoped>
.v-text-field--outlined.whiteBorder fieldset {
  color: white !important;
}

.v-text-field.whiteBorder input {
  font-size: 1.2em;
  font-weight: bold;
}
</style>