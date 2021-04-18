<template>
  <v-row>
    <v-card class="mx-auto" max-width="250" >
      <v-card-text style="white-space: pre; background-color: #F5F5F5">
        <v-row justify="center">
          <a :href="metadata.external_url" target="_blank">
            <v-img :src="'/nfts/'+nft.id+'/image'"  height="250" width="250"/>
          </a>
        </v-row>

        <v-row style="display: flex; padding-top: 10px; padding-bottom: 5px" class="px-2">
          <span  style="width: 60%; text-align: left" class="truncate"><strong>{{metadata.name}}</strong></span>
          <span  style="width: 40%; text-align: right"><strong>{{ nft.editions }} of {{metadata.editions}}</strong></span>
        </v-row>
        <v-row class="px-2 subtext">ID: {{ nft.id }} </v-row>
        <v-row class="px-2 subtext">Price: {{ (+metadata.price + +metadata.fee) | truncatePrice}} SNAFU</v-row>
      </v-card-text>
    </v-card>
  </v-row>
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
.subtext {
  color: #A7A7A7;
  font-weight: bold;
}

.truncate {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 768px) {

}
</style>