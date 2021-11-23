<template>
  <v-container>
    <v-row id="mainRow" justify="center" style="display: grid; padding-top: 100px">
      <swap-card />
    </v-row>
<!--    <v-row justify="center" class="pt-10">-->
<!--      <collection-info />-->
<!--    </v-row>-->
    <v-row justify="center" class="pt-10">
      <nfts-pool-list />
    </v-row>
  </v-container>
</template>

<script>
import CollectionInfo from '../components/Collection/CollectionInfo.vue'
import NftsPoolList from '../components/Collection/NftsPoolList.vue'
import SwapCard from '../components/Swap/SwapCard.vue'

export default {
  name: 'Home',
  components: {
    SwapCard,
    // CollectionInfo,
    NftsPoolList
  }
}
</script>

<style>
@media screen and (max-width: 768px) {
  #mainRow {
    padding-top: 20px !important;
  }
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