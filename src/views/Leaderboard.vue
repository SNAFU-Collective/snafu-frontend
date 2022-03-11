<template>
  <v-container>
    <div class="allNFTsContainer"  style="padding-top: 20px;">
      <v-row justify="center" class="pt-15">
        <h1>Leaderboard</h1>
      </v-row>
      <v-row v-if="localLeaderboard" justify="center"><strong>Total collectors: {{leaderboard.length}}</strong></v-row>
      <v-row v-if="localLeaderboard" justify="center" style="font-size: 10px">Last updated at: {{lastUpdate}}</v-row>
      <v-row justify="center" class="pt-8 filters-row">
        <v-btn
          small
          plain
          v-on:click="currentTag = 'all'"
          style="margin: 10px"
          :class="currentTag === 'all' ? 'currentTag' : ''"
          >Total
        </v-btn>
        <v-btn
            small
            plain
            v-on:click="currentTag = 'collection3'"
            style="margin: 10px"
            :class="currentTag === 'collection3' ? 'currentTag' : ''"
        >Collection #3
        </v-btn>
        <v-btn
            small
            plain
            v-on:click="currentTag = 'collection2'"
            style="margin: 10px"
            :class="currentTag === 'collection2' ? 'currentTag' : ''"
        >Collection #2
        </v-btn>
        <v-btn
          small
          plain
          v-on:click="currentTag = 'collection1'"
          style="margin: 10px"
          :class="currentTag === 'collection1' ? 'currentTag' : ''"
          >Collection #1
        </v-btn>
      </v-row>
      <v-row justify="center" no-gutters class="py-6 leaderboardRow">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search an address"
              single-line
              hide-details
              class="mb-5 px-1"
          ></v-text-field>
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
            :search="search"
          >
            <template v-slot:item.address={item}>
              <span :style="item.address === account ? 'color:red' : ''">{{item.address}}</span>
            </template>

            <template slot="item.rank" slot-scope="props">
              <b v-if="search === ''">{{(pagination.page -1 ) * pagination.itemsPerPage + props.index  + 1}}</b>
            </template>

            <template v-slot:item.totalValue={item}>
            <b> {{item.totalValue | truncatePrice }}</b>
            </template>

            <template v-slot:item.blockie>
              <v-avatar style="margin: 5px !important;">
                <v-img src="/pfp/unknown.jpeg"/>
              </v-avatar>
            </template>
          </v-data-table>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapFields} from "vuex-map-fields"
import {mapActions} from "vuex"

export default {
  data() {
    return {
      search: '',
      pagination: {
        page: 1,
        itemsPerPage: 10
      },
      localLeaderboard: [],
      loading: true,
      currentTag: "all",
      addressToFilter: []
    };
  },
  async beforeMount() {
    await this.getLeaderboard()
  },
  methods: {
    ...mapActions("leaderboard", ["getLeaderboard"]),
    goToUserPage(row) {
      this.$router.push({path: `user/${row.address}`})
    },
  },
  computed: {
    ...mapFields("connectweb3", ["account"]),
    ...mapFields("leaderboard", ["leaderboard", "lastUpdate"]),
    tableItems() {
      let localLeaderboard = this.leaderboard

      if (this.currentTag === "all") {
        return localLeaderboard;
      }

      if (this.currentTag === "collection1") {
        localLeaderboard = localLeaderboard.map((item) => {
          return {
            address: item.address,
            allNfts: item.collection1Nfts || 0,
            totalBalance: item.collection1Balance || 0,
            totalValue: item.collection1Value || 0
          };
        });

        return localLeaderboard.filter(
            (item) => item.totalBalance > 0
        );
      }

      if (this.currentTag === "collection2") {
        localLeaderboard = localLeaderboard.map((item) => {
          return {
            address: item.address,
            allNfts: item.collection2Nfts || 0,
            totalBalance: item.collection2Balance || 0,
            totalValue: item.collection2Value || 0
          };
        });

        return localLeaderboard.filter(
            (item) => item.totalBalance > 0
        );
      }

      if (this.currentTag === "collection3") {
        localLeaderboard = localLeaderboard.map((item) => {
          return {
            address: item.address,
            allNfts: item.collection3Nfts || 0,
            totalBalance: item.collection3Balance || 0,
            totalValue: item.collection3Value || 0
          };
        });

        return localLeaderboard.filter(
            (item) => item.totalBalance > 0
        );
      }

      return localLeaderboard;
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
          text: "User",
          value: "address",
          sortable: false,
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
          text: "Points",
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

@media screen and (min-width: 768px) {
  .leaderboardRow {
    display: grid;
  }
}
</style>