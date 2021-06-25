<template>
  <v-container>
    <div class="allNFTsContainer"  style="padding-top: 20px;">
      <v-row justify="center" class="pt-15">
        <h1>Leaderboard</h1>
      </v-row>
      <v-row v-if="leaderboard" justify="center"><strong>Total collectors: {{leaderboard.length - addressToFilter.length}}</strong></v-row>
      <v-row v-if="leaderboard" justify="center" style="font-size: 10px">Last updated at: {{lastUpdate}}</v-row>
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
            v-on:click="currentTag = 'collection2'"
            style="margin: 10px"
            :style="
            currentTag === 'collection2'
              ? 'background-color: black; color: white'
              : ''
          "
        >Collection #2
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
      <v-row justify="center" style="font-size: 13px; padding-top: 15px; text-align: center" v-if="leaderboard && currentTag === 'collection2'">
        <span>Top 5 will win the printed copy of <a target="_blank" href="https://www.nftsnafu.org/collection-2"> "SNAFU Collective's Artbook #1"</a>
        <br>
          Campaign ends on 01/07/2021
        </span>
      </v-row>
      <v-row justify="center" no-gutters class="py-6">
        <v-data-table
          :items="tableItems"
          :headers="tableHeaders"
          sort-desc
          sort-by="totalValue"
          class="leaderboardTable"
          mobile-breakpoint="0"
          :page.sync="pagination.page"
          :items-per-page.sync="pagination.itemsPerPage"
          @click:row="goToUserPage"
        >
          <template v-slot:item.address={item}>
            <span :style="item.address === account ? 'color:red' : ''">{{item.address}}</span>
          </template>

          <template slot="item.rank" slot-scope="props">
            {{(pagination.page -1 ) * pagination.itemsPerPage + props.index  + 1}}
          </template>

          <template v-slot:item.totalValue={item}>
           {{item.totalValue | truncatePrice }}
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
import {mapFields} from "vuex-map-fields"

export default {
  data() {
    return {
      pagination: {
        page: 1,
        itemsPerPage: 10
      },
      leaderboard: [],
      lastUpdate: "",
      loading: true,
      currentTag: "collection2",
      addressToFilter: [
          "0x27B9C2Bd4BaEa18ABdF49169054c1C1c12af9862", //SNAFU POOL
          "0xEA912373bEf07E06F04fdE1d8218eb6C77cFF67A", //DAO
          "0x652d53227d7013f3FbBeA542443Dc2eeF05719De", //OWNER SNAFU NFT
          "0x8dDc7167e9F838f2e32FaBA229A53d4a48D0aa8d", //$SNAFU FARM
          "0x88CfEea7BE8A7695A3012276e8C68bf303Afe49a", //LP FARM
          "0x670BF58c124A958Ec5715b21A57bb2F174Cc14cA", //CAVEAU SNAFU
          "0x191b8c73b4eFA062F548AB9C762c6FC8512493A8", //ALESSANDRO NALLI
          "0xEBd63929331A97F0fC62409Ce1Ee29A0908CB519", //ANIMA
          "0xeB1f193F347133bF27C81B23D4d2D6CD13167c66", //JASMINE
          "0x77beAf50CEc4206d3F09D41aE584222D53c74A2D", //EBBY
          "0xF3361Fd22655bff05C617EDe2E061BE8A90c47f4", //ELISA
          "0xCd6fcb4EcF97365fe159284B9Acc3C8519F5B6c4", //BUDA
          "0x86ee5eb5D97E9408223be407eA76C2323F7991E3", //METT
          "0x37a67ad8Faac22830c87011935B841f982ea50eB", //SEBA
      ],
    };
  },
  async beforeMount() {
    let res = await axios.get("https://raw.githubusercontent.com/SNAFU-Collective/leaderboard/main/latest.json");
    this.leaderboard = res.data.leaderboard;
    this.lastUpdate = new Date(res.data.lastUpdate).toLocaleString('en');
  },
  methods: {
    goToUserPage(row) {
      this.$router.push({path: `user/${row.address}`})
    },
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    tableItems() {
      let leaderboard = this.leaderboard.filter(
        (item) => !this.addressToFilter.includes(item.address)
      );

      if (this.currentTag === "all") {
        return leaderboard;
      }

      if (this.currentTag === "collection1") {
        leaderboard = leaderboard.map((item) => {
          return {
            address: item.address,
            allNfts: item.collection1Nfts || 0,
            totalBalance: item.collection1Balance || 0,
            totalValue: item.collection1Value || 0
          };
        });

        return leaderboard.filter(
            (item) => item.totalBalance > 0
        );
      }

      if (this.currentTag === "collection2") {
        leaderboard = leaderboard.map((item) => {
          return {
            address: item.address,
            allNfts: item.collection2Nfts || 0,
            totalBalance: item.collection2Balance || 0,
            totalValue: item.collection2Value || 0
          };
        });

        return leaderboard.filter(
            (item) => item.totalBalance > 0
        );
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
        {
          text: "$SNAFU Value",
          value: "totalValue",
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

tr:hover {
  cursor: pointer;
}

tr:hover > td {
  background-color: #e0e0e0;
}

@media screen and (max-width: 768px) {
  .allNFTsContainer {
    padding-top: 0px !important;
  }
}
</style>