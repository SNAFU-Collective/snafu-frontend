<template>
  <v-container id="collectionInfoContainer" fluid class="pt-15">
    <v-card flat>
      <v-card-title class="pl-10">
        <v-avatar class="mr-2">
          <v-img src="logo.png" />
        </v-avatar>
        SNAFU Collection
      </v-card-title>
      <v-card-text class="pt-3 pl-15">
        <v-row>
          <v-col col="3" align-self="start" class="oneLineOnMobile">
            <v-row
            ><span>
                <strong>NFTs in pool: </strong> {{ poolNFTs.length }} of {{allNFTs.length}}</span
            ></v-row
            >
            <v-row
              ><span>
                <strong
                  >Pool stats:
                  <a
                    href="https://chainbeat.io/reports/snafu-collective-pool"
                    target="_blank"
                    style="color: rgba(0, 0, 0, 0.6)"
                    >Chainbeat</a
                  ></strong
                >
              </span></v-row
            >
          </v-col>
          <v-col col="3" align-self="center" class="oneLineOnMobile">
            <v-row
            ><span>
                <strong>$SNAFU Price: </strong>
                {{ pair ? pair.token1Price : "-" | truncatePrice | numberWithCommas }}$
              </span></v-row
            >
            <v-row
            ><span>
                <strong>Liquidity: </strong>
                {{ pair ? pair.reserveUSD : " - " | truncatePrice | numberWithCommas}}$</span
            ></v-row
            >
          </v-col>
          <v-col col="3" align-self="end" class="oneLineOnMobile">
            <v-row
            ><span
            ><strong
            >Trade $SNAFU:
                  <a
                      href="https://info.honeyswap.org/#/token/0x27b9c2bd4baea18abdf49169054c1c1c12af9862"
                      target="_blank"
                      style="color: rgba(0, 0, 0, 0.6)"
                  >Honeyswap</a
                  ></strong
            >
              </span></v-row
            >
            <v-row
            ><span>
                <strong>Total Supply: </strong>
                {{ snafuSupply | fromWei | truncatePrice | numberWithCommas }} SNAFU</span
            ></v-row
            >
          </v-col>
          <v-col col="3" align-self="end" class="oneLineOnMobile">
            <v-row
            ><span
            ><strong
            >Locked Supply:
                  </strong
                  >
               {{snafuLockedSupply | fromWei | truncatePrice | numberWithCommas }} SNAFU
              </span></v-row
            >
            <v-row
            ><span>
                <strong>Circulating Supply: </strong>
                {{snafuCirculatingSupply | fromWei | truncatePrice | numberWithCommas }} SNAFU</span
            ></v-row
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { snafu20Address } from "../../utils/constants";
import { mapState } from "vuex";
import gql from "graphql-tag";

export default {
  computed: {
    ...mapFields("connectweb3", ["snafuSupply", "snafuLockedSupply", "snafuCirculatingSupply"]),
    ...mapFields("nftContract", ["allNFTs"]),
    ...mapState("nftContract", {
      poolNFTs: (state) => state[snafu20Address] || [],
    }),
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
};
</script>

<style>
.logoBorder {
  border-color: black;
  border-style: solid;
  border-width: thin;
}

@media screen and (max-width: 768px) {
  .oneLineOnMobile {
    width: 100% !important;
    flex-basis: unset !important;
  }

  /*#collectionInfoContainer {*/
  /*  just*/
  /*}*/
}
</style>