<template>
  <v-container>
    <div class="allNFTsContainer pt-10">
      <v-row justify="center" class="pt-15">
        <h1>Leaderboard</h1>
      </v-row>
      <v-row v-if="leaderboard" justify="center"><strong>Total collectors: {{leaderboard.length - addressToFilter.length}}</strong></v-row>
      <v-row justify="center" class="pt-8 filters-row">
        <v-btn
          small
          v-on:click="currentTag = 'all'"
          style="margin: 10px"
          :style="
            currentTag === 'all' ? 'background-color: black; color: white' : ''
          "
          >All NFTs
        </v-btn>
        <v-btn
          small
          v-on:click="currentTag = 'collection1'"
          style="margin: 10px"
          :style="
            currentTag === 'collection1'
              ? 'background-color: black; color: white'
              : ''
          "
          >Collection #1
        </v-btn>
      </v-row>

      <v-row justify="center" no-gutters class="py-6">
        <v-data-table
          :items="tableItems"
          :headers="tableHeaders"
          sort-desc
          sort-by="totalBalance"
          class="leaderboardTable"
          hide-default-footer
          :items-per-page="25"
        >
          <template slot="item.rank" slot-scope="data">
            {{ data.index + 1}}
          </template>

          <template v-slot:item.blockie={item}>
            <vth-blockie :string=item.address />
          </template>
        </v-data-table>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      leaderboard: [],
      loading: true,
      currentTag: "all",
      addressToFilter: [
          "0x27B9C2Bd4BaEa18ABdF49169054c1C1c12af9862", //SNAFU POOL
          "0xEA912373bEf07E06F04fdE1d8218eb6C77cFF67A", //DAO
          "0x652d53227d7013f3FbBeA542443Dc2eeF05719De", //OWNER SNAFU NFT
          "0x8dDc7167e9F838f2e32FaBA229A53d4a48D0aa8d", //$SNAFU FARM
          "0x88CfEea7BE8A7695A3012276e8C68bf303Afe49a", //LP FARM
      ],
    };
  },
  async beforeMount() {
    let res = await axios.get("./latest.json");
    this.leaderboard = res.data;
    console.log(this.leaderboard);
  },
  computed: {
    tableItems() {
      let leaderboard = this.leaderboard.filter(
        (item) => !this.addressToFilter.includes(item.address)
      );

      if (this.currentTag === "all") {
        return leaderboard;
      }

      if (this.currentTag === "collection1") {
        return leaderboard.map((item) => {
          return {
            address: item.address,
            allNfts: item.collection1Nfts,
            totalBalance: item.collection1Balance,
          };
        });
      }

      return leaderboard;
    },
    tableHeaders() {
      return [
        {
          text: "Rank",
          value: "rank",
          sortable: false
        },
        {
          text: "",
          value: "blockie",
          sortable: false
        },
        {
          text: "Address",
          value: "address",
          sortable: false
        },
        {
          text: "Unique NFTs",
          value: "allNfts",
          sortable: false
        },
        {
          text: "Total Balance",
          value: "totalBalance",
          sortable: false
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.leaderboardTable tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>