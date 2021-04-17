<template>
  <v-container>
    <v-row justify="center" style="display: grid">
      <wallet-status class="mt-5"/>
      <swap-card />
    </v-row>
    <v-row justify="center" class="pt-10">
      <collection-info />
    </v-row>
    <v-row justify="center" class="pt-10">
      <nfts-pool-list />
    </v-row>
  </v-container>
</template>

<script>
import CollectionInfo from '../components/Collection/CollectionInfo.vue'
import NftsPoolList from '../components/Collection/NftsPoolList.vue'
import SwapCard from '../components/Swap/SwapCard.vue'
import WalletStatus from '../components/Wallet/WalletStatus.vue'

export default {
  name: 'Home',
  components: {
    WalletStatus,
    SwapCard,
    CollectionInfo,
    NftsPoolList
  }
}
</script>
