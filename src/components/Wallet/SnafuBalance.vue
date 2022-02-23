<template>
  <v-container class="pa-15 mt-15">
    <div v-if="pair">
      <v-row justify="center">
        <h2 >Net Value</h2>
      </v-row>
      <v-row class="mt-5" justify="center">
        <h3 style="color: limegreen">$ {{netWorth | truncatePrice}}</h3>
      </v-row>

      <v-row class="mt-15" justify="center">
        <h2>Assets</h2>
      </v-row>

      <v-row class="mt-8">
        <v-data-table
            :headers="headers"
            :items="assets"
            hide-default-footer
            class="elevation-0"
            loading-text="Loading... Please wait"
            style="width: 100%"
        >
          <template v-slot:item.currency={item} >
            <div v-if="item.show_only_logo">
              <v-img :src="item.logo" width="60px" class="ml-2"></v-img>
            </div>
            <div v-else style="display: inline-flex;align-items: center;">
              <v-img :src="item.logo" width="30px"></v-img>
              <span class="ml-1"><b>{{item.currency}}</b></span>
            </div>
          </template>

          <template v-slot:item.balance={item}>
           {{item.balance | truncatePrice }}
          </template>

          <template v-slot:item.price={item}>
            $ {{item.price | truncatePrice }}
          </template>

          <template v-slot:item.total_value={item}>
            <b> $ {{item.total_value | truncatePrice }}</b>
          </template>
          <template v-slot:item.actions={item} style="align-items: center">
            <v-row justify="end" v-if="item.id === 'snafu'">
              <v-btn
                  x-small
                  @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862&outputCurrency=0xe91d153e0b41518a2ce8dd3d7944fa863463a97d&chainId=100')"
              >
                Buy <v-icon class="ml-1" style="font-size:1em; color:black"> mdi-open-in-new </v-icon>
              </v-btn>
              <v-btn
                  x-small
                  class="ml-2"
                  @click="goTo('https://app.honeyswap.org/#/swap?inputCurrency=0x27b9c2bd4baea18abdf49169054c1c1c12af9862&outputCurrency=0xe91d153e0b41518a2ce8dd3d7944fa863463a97d&chainId=100')"
              >
                Sell <v-icon class="ml-1" style="font-size: 1em; color:black"> mdi-open-in-new </v-icon></v-btn>
            </v-row>

            <v-row justify="end" v-else-if="item.id === 'xdai'">
              <v-btn
                  x-small
                  @click="goTo('https://ramp.network/buy/')"
              >
                Buy with card<v-icon class="ml-1" style="font-size:1em; color:black"> mdi-open-in-new </v-icon>
              </v-btn>
              <v-btn
                  x-small
                  class="ml-2"
                  @click="goTo('https://bridge.xdaichain.com/')"
              >
                Mainnet Bridge <v-icon class="ml-1" style="font-size:1em; color:black"> mdi-open-in-new </v-icon>
              </v-btn>
              <v-btn
                  x-small
                  class="ml-2"
                  @click="goTo('https://www.xpollinate.io/')"
              >
                Multichain Bridge <v-icon class="ml-1" style="font-size:1em; color:black"> mdi-open-in-new </v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-row>
    </div>
    <div v-else>
      <v-row justify="center" class="my-15">
        <v-progress-circular
            size="40"
            indeterminate
            color="black"
            tyle="margin-top: 80px"
        ><h3 style="padding-top: 150px;white-space: pre;">Loading Assets</h3></v-progress-circular>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import gql from "graphql-tag"
import {ethers} from "ethers"
import axios from "axios"
import {mapActions} from "vuex"

export default {
  beforeMount(){
    this.updatexDaiBalance();
  },
  computed: {
    ...mapFields("connectweb3", [ "snafuBalance", "xDaiBalance"]),
    snafuValue() {
      return parseFloat(this.pair.token1Price) * parseFloat(ethers.utils.formatEther(this.snafuBalance))
    },
    netWorth() {
      return parseFloat(this.snafuValue) + parseFloat(this.xDaiBalance)
    },
    assets() {
      console.log('xdai balance', this.xDaiBalance)
      return [
        {
          currency: 'xDAI',
          logo: './coins/xdai-light.png',
          show_only_logo: true,
          balance: this.xDaiBalance,
          price: 1,
          total_value: this.xDaiBalance,
          actions: [],
          id: 'xdai'
        },
        {
          currency: 'SNAFU',
          logo: './coins/snafu.jpeg',
          show_only_logo: false,
          balance: parseFloat(ethers.utils.formatEther(this.snafuBalance)),
          price: this.pair ? parseFloat(this.pair.token1Price) : '-',
          total_value: this.snafuValue,
          actions: [],
          id: 'snafu'
        },
     ]
    }
  },
  methods: {
    ...mapActions("connectweb3", ["updatexDaiBalance"]),
    goTo(url) {
      window.open(url, '_blank')
    },
  },
  apollo: {
    //WXDAI - SNAFU pair
    pair: gql`
      query {
        pair(id: "0xd6c8ad00302ca94952e7746d956e8b45b0ea90e3") {
          reserve0
          reserve1
          reserveUSD
          token0Price
          token1Price
          volumeUSD
        }
      }
    `,
  },
  data() {
    return {
      headers: [
        {
          text: 'Asset',
          align: 'start',
          sortable: false,
          value: 'currency',
        },
        {
          text: 'Balance',
          sortable: false,
          value: 'balance',
        },
        {
          text: 'Price',
          sortable: false,
          value: 'price',
        },
        {
          text: 'Value',
          sortable: true,
          value: 'total_value',
        },
        {
          text: '',
          sortable: false,
          value: 'actions',
        },
      ],
    }
  },
}
</script>

<style>

</style>