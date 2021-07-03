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

          <v-col cols="8" class="nft-details">
            <v-row no-gutters>
              <v-col cols="12" class="text-subtitle-2 truncate" style="font-weight: bold;"> {{ metadata.name }}</v-col>
            </v-row>
            <v-row no-gutters justify="start" class="mr-2 mt-5" style="align-items: center">
              <v-col cols="9">
                <v-row>
                  <v-col cols="7" style="justify-content: start"><span>Select quantity </span></v-col>
                  <v-col cols="5" style="justify-content: end; text-align: right"><span>(Max: {{ownedEditions}})</span></v-col>
                </v-row>
                <v-numeric
                    hide-details="auto"
                    v-model="defaultQuantity"
                    :maxValue="nft.editions"
                ></v-numeric>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";
import VNumeric from "../Input/vNumeric"

export default {
  components: { VNumeric },
  props: {
    nft: {
      type: Object,
      required: true,
    },
    hideSelect:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    ...mapGetters("nftContract", ["getUserBalance"]),
    ownedEditions(){
      return this.getUserBalance(this.nft.id);
    }
  },
  data() {
    return {
      defaultQuantity: 0,
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