<template>
  <v-container>
    <div class="allNFTsContainer pt-10">
      <v-row justify="center" class="pt-15">
        <h1>Leaderboard</h1>
      </v-row>
      <v-row justify="center" class="pt-8 filters-row">
        <v-btn
          small
          v-on:click="currentTag = 'all'"
          style="margin: 10px"
          :style="
            currentTag === 'all' ? 'background-color: black; color: white' : ''
          "
          >All
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
          hide-default-footer
          hide-default-header
          sort-by="totalBalance"
          class="leaderboardTable"
        >
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
      addressToFilter: ["0x27B9C2Bd4BaEa18ABdF49169054c1C1c12af9862"],
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
            totalBalance: item.collection1Balance,
          };
        });
      }

      return leaderboard;
    },
    tableHeaders() {
      return [
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Balance",
          value: "totalBalance",
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