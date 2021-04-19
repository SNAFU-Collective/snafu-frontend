<template>
  <div>
    <v-card class>
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <v-img
              :src="'/nfts/' + nft.id + '/image'"
              height="120"
              width="120"
            />
          </v-col>
          <v-col cols="4">
            <v-row no-gutters class="text-subtitle-2 truncate">
              {{ metadata.name }}
            </v-row>
            <div class="text-caption">
              <v-row no-gutters> Token ID: {{ nft.id }} </v-row>
              <v-row no-gutters> Editions: {{ metadata.editions }} </v-row>
              <v-row no-gutters>
                Value: {{ nftValue }} SNAFU</v-row
              >
              <v-row no-gutters>
                <a
                  :href="metadata.external_url"
                  target="_blank"
                  style="color: black"
                >
                  View Details
                </a>
              </v-row>
            </div>
          </v-col>
          <v-col cols="4" class="d-flex flex-column mb-5">
            <v-row
              no-gutters
              class="text-caption font-weight-bold"
              justify="center"
            >
              {{ nft.editions }} Available
            </v-row>
            <v-row no-gutters align="end" justify="center">
              <v-btn small dark @click="selectNft"> SELECT </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    nft: {
      type: Object,
      required: true,
    },
    withdrawFromPool:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    nftValue(){
      if(this.withdrawFromPool){
        return +this.metadata.price + +this.metadata.fee;
      }else{
        return +this.metadata.price
      }
    }
  },
  methods:{
    selectNft(){
      this.$emit("selectNft", {nft: this.nft, metadata: this.metadata});
    }
  },
  data() {
    return {
      metadata: {},
    };
  },
  async beforeMount() {
    let res = await axios.get("./nfts/" + this.nft.id + "/metadata.json");
    this.metadata = res.data;
  },
};
</script>

<style>
.truncate {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>