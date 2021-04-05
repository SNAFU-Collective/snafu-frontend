<template>
  <div>
    <v-card width="300" height="400" :href="metadata.external_url" target="_blank">
      <v-card-text style="white-space: pre;">
          <v-row justify="center">
              <v-img :src="'/nfts/'+nft.id+'/image'"  height="300" width="300"/>
          </v-row>
          <v-row justify="center" class="pt-2 px-2" style="white-space: pre;"> <strong>{{metadata.name}}</strong></v-row>
        <v-row justify="center"> <strong>Token ID: </strong> {{ nft.id }} </v-row>
        <v-row justify="center"> <strong>Editions: </strong> {{ nft.editions }} / {{metadata.editions}} </v-row>
        <v-row justify="center"> <strong>Value:</strong> {{+metadata.price + +metadata.fee}} <strong>SNAFU</strong></v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import axios from "axios";
export default {
    props:{
        nft:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
            metadata: {}
        }
    },
    async beforeMount(){
        let res = await axios.get("./nfts/" + this.nft.id + "/metadata.json")
        this.metadata = res.data;
    }
};
</script>

<style>
</style>