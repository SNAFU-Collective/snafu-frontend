<template>
  <v-container class="pa-15 mt-15">
    <div v-if="pair">
      <v-row>
        <h2>Assets</h2>
      </v-row>

      <v-row class="mt-8">
        <v-data-table
            :headers="headers"
            :items="assets"
            hide-default-footer
            class="elevation-1"
            loading-text="Loading... Please wait"
        ></v-data-table>
      </v-row>

      <v-row>
        <v-col col="3" align-self="start" class="oneLineOnMobile">
          <v-row>
            <!--              <span>-->
            <!--                <strong>SNAFU: </strong> {{ balance | fromWei | truncatePrice }}-->
            <!--                <span>≅ {{ pair && balance ? snafuValue : '-' | truncatePrice | numberWithCommas }}$</span>-->
            <!--              </span>-->
          </v-row>
        </v-col>
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
    assets() {
      console.log('xdai balance', this.xDaiBalance)
      return [
        {
          name: 'SNAFU',
          balance: parseFloat(ethers.utils.formatEther(this.snafuBalance)),
          price: '$ ' + this.pair ? parseFloat(this.pair.token1Price) : '-',
          total_value: '$ ' + this.snafuValue,
        },
        {
          name: 'xDAI',
          balance: this.xDaiBalance,
          price: '$ ' + 1,
          total_value: '$ ' + this.xDaiBalance,
        }]
    }
  },
  methods: {
    ...mapActions("connectweb3", ["updatexDaiBalance"]),
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
          value: 'name',
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
      ],
    }
  },
}
</script>

<style>

</style>