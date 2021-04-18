<template>
    <v-container fluid>
      <v-card flat>
          <v-card-title>
              <v-avatar class="logoBorder mr-2">
                <v-img src="logo.png" />
              </v-avatar> 
              SNAFU Collection
              </v-card-title>
              <v-card-text class="pt-3 pl-8">
                  <v-row>
                       <v-col>
                     <span> <strong>SNAFU Price: </strong> - </span>
                      </v-col>
                      <v-col>
                     <span> <strong>SNAFU Supply: </strong> {{snafuSupply | fromWei}}</span>
                      </v-col>
                      <v-col>
                     <span> <strong>NFTs in pool: </strong> {{poolNFTs.length}}</span>
                      </v-col>
                     <v-col>
                     <span> <strong>NFTs editions in pool: </strong> {{nftEditionsInPool}}</span>
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

</style>