<template>
      <v-card
        height="400"
        width="300"
        color="#F5F5F5"
        class="d-flex flex-column rounded-lg"
      >
        <v-spacer />
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

        <v-row no-gutters justify="center">
          <v-btn large icon>
            <v-icon>mdi-swap-vertical</v-icon>
          </v-btn>
        </v-row>

        <v-row no-gutters class="text-caption px-3">
          <span> TO </span>
        </v-row>
        <v-row no-gutters justify="center">
          <snafu-input class="mx-3" />
        </v-row>
        <v-spacer />
        <v-row no-gutters justify="center" align="end" class="rounded-0">
          <v-btn
            width="300"
            color="black"
            class="white--text rounded-0 rounded-b-lg"
          >
            Swap
          </v-btn>
        </v-row>
      </v-card>
</template>

<script>
import NftInput from "./NftInput.vue";
import SnafuInput from "./SnafuInput.vue";
export default {
  components: { NftInput, SnafuInput },
};
</script>

<style>
</style>