<template>
  <v-container>
    <v-row id="mainRow" justify="center" style="display: grid; padding-top: 80px">
      <swap-card />
    </v-row>
    <v-row justify="center" class="pt-10">
      <nfts-pool-list />
    </v-row>
  </v-container>
</template>

<script>
import NftsPoolList from '../components/Collection/NftsPoolList.vue'
import SwapCard from '../components/Swap/SwapCard.vue'

export default {
  name: 'Pool',
  components: {
    SwapCard,
    NftsPoolList
  }
}
</script>

<style>
@media screen and (max-width: 768px) {

}

.warningText {
  font-size: 14px;
  text-align: center;
}

.warningDiv {
  background-color: #3030300d;
  border-radius: 5px;
}
</style>