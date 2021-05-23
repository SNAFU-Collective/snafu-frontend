<template>
  <v-container>
    <v-row justify="center" class="pt-10">
      <nfts-list />
    </v-row>
  </v-container>
</template>

<script>
import NftsList from '../components/Collection/NftsList.vue'

export default {
  name: 'NFTs',
  components: {
    NftsList
  }
}
</script>

<style>
</style>