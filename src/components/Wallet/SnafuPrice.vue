<template>
  <v-row>
        <v-chip
            color="'#303030' "
            style="background-color: #f3f3f3;cursor: pointer;"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <a href="https://info.honeyswap.org/#/pair/0xd6c8ad00302ca94952e7746d956e8b45b0ea90e3"
                   target="_blank" style="display: inline-flex;align-items: center;text-decoration: none !important; color: #303030">
                  <v-img src="/coins/snafu.jpeg" width="20px" style="border-radius: 5pc; margin: 5px;"/>
                  <span class="ml-1" >{{ pair ? pair.token1Price : '-' | truncatePrice | numberWithCommas }} $</span>
                </a>
              </div>
            </template>
            <span>Buy $SNAFU</span>
          </v-tooltip>
        </v-chip>
  </v-row>
</template>

<script>
import {mapFields} from 'vuex-map-fields'
import gql from "graphql-tag"

export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapFields("connectweb3", [ "snafuBalance",]),
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
}
</script>