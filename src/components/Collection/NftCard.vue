<template>
  <div>
    <v-card>
      <v-card-text class="ma-5 pa-10">
        <v-row> <strong>Token ID:</strong> {{ nft.id }} </v-row>
        <v-row> <strong>Editions:</strong> {{ nft.editions }} </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    props:{
        nft:{
            type: Object,
            required: true
        }
    }
};
</script>

<style>
</style>