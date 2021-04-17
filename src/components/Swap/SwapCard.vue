<template>
  <div>
    <v-container fluid>
      <v-card
        height="450"
        width="400"
        color="#F5F5F5"
        class="d-flex flex-column rounded-lg"
      >
        <v-row no-gutters class="text-caption pa-3">
          <v-col cols="11" class="text-caption"> FROM </v-col>
          <v-col cols="1" align-self="start">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="grey"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="text-h6"
                >
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>Tooltip</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <nft-input class="mx-3" />
        </v-row>
        <v-row no-gutter />
        <v-row no-gutters justify="center">
          <v-btn large icon>
            <v-icon>mdi-swap-vertical</v-icon>
          </v-btn>
        </v-row>

        <v-row no-gutters class="text-caption px-3 mt-n3">
          <span> TO </span>
        </v-row>
        <v-row no-gutters justify="center">
          <snafu-input class="mx-3" />
        </v-row>
        <v-row no-gutters class="mt-3 ml-1">
            <v-col cols="10" class="text-caption px-3">
                Fee: 
            </v-col>
            <v-col cols="2" class="text-caption pl-7">
                {{snafuFee}}%
            </v-col>
        </v-row>
        <v-spacer />
        <v-row no-gutters justify="center" align="end" class="rounded-0">
          <v-btn
            width="400"
            color="black"
            class="white--text rounded-0 rounded-b-lg"
          >
            Swap
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import NftInput from "./NftInput.vue";
import SnafuInput from "./SnafuInput.vue";
import {mapFields} from "vuex-map-fields";

export default {
  components: { NftInput, SnafuInput },
  computed:{
      ...mapFields("connectweb3", ["snafuFee"])
  }
};
</script>

<style>
</style>