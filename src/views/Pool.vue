<template>
  <v-container>
    <v-row>
      <v-col cols-md="12" colls-xs="12" class="ma-10 px-15" style="text-align: center; color: #303030d4">
        <p class="h2 mt-5">This is the Community Pool: here is where collectors <b>discard the NFTs</b> they are not able to sell, and receive <b>$SNAFU</b> for them.</p>
        <p class="h2">Here you will find very good trade opportunities, by buying SNAFU NFTs at their <b>base price</b>.</p>
      </v-col>
    </v-row>
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

  .h2 {
    color: #303030;
    font:normal normal normal 20px/2em barlow-medium,barlow,sans-serif;
  }
}
@media screen and (min-width: 768px) {
  .h2 {
    color: #303030;
    font:normal normal normal 25px/1.4em barlow-medium,barlow,sans-serif;
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