<template>
      <v-card
        height="400"
        width="300"
        color="#F5F5F5"
        class="d-flex flex-column rounded-lg"
      >
        <v-spacer />
        <v-row no-gutters justify="center"> <nft-input class="ma-3" /> </v-row>
                <v-spacer />

        <v-row no-gutters justify="center">
          <v-btn large icon>
            <v-icon>mdi-swap-vertical</v-icon>
          </v-btn>
        </v-row>
                <v-spacer />

        <v-row no-gutters justify="center">
          <snafu-input class="ma-3" />
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