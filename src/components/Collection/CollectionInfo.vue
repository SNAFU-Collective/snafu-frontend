<template>
    <v-container id="collectionInfoContainer" fluid class="pt-15" >
      <v-card flat>
              <v-card-title class="pl-10">
                <v-avatar class="mr-2">
                  <v-img src="logo.png" />
                </v-avatar>
                SNAFU Collection
              </v-card-title>
              <v-card-text class="pt-3 pl-15">
                  <v-row>
                      <v-col col="4" align-self="start" class="oneLineOnMobile">
                       <v-row><span> <strong>$SNAFU Price: </strong> - </span></v-row>
                      </v-col>
                      <v-col col="4" align-self="center" class="oneLineOnMobile">
                        <v-row><span> <strong>NFTs in pool: </strong> {{poolNFTs.length}}</span></v-row>
                        <v-row><span> <strong>$SNAFU Supply: </strong> {{snafuSupply | fromWei | truncatePrice}}</span></v-row>
                      </v-col>
                     <v-col col="4" align-self="end" class="oneLineOnMobile">
                       <v-row><strong>Liquidity:</strong> -</v-row>
                       <v-row><strong>Trade $SNAFU:</strong> -</v-row>
                      </v-col>
                  </v-row>
              </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
import {mapFields} from "vuex-map-fields"
export default {
    computed:{
        ...mapFields("connectweb3", ["snafuSupply"]),
        ...mapFields("nftContract", ["poolNFTs", "poolSync"]),
        nftEditionsInPool(){
            let poolNFTs = this.poolNFTs;
            if(poolNFTs && poolNFTs.length > 0){
               return poolNFTs.reduce((a, b) => +a + +b.editions, 0);
            }else{
                return 0;
            }
        }
    }

}
</script>

<style>
.logoBorder{
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