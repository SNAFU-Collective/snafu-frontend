<template>
  <v-dialog v-model="showModal" scrollable max-width="500px">
    <v-card color="#F5F5F5">
      <v-card-title>
        <v-row no-gutters> Select the SNAFU Collective’s NFT </v-row>
        <v-row no-gutters class="pt-5">
          <v-text-field
            outlined
            dense
            placeholder="Filter by token ID"
            background-color="white"
          />
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n4 ">
        <nft-select-card
          :nft="nft"
          v-for="nft in nftsToSelect"
          :key="nft.id"
          class="my-5"
          @selectNft="handleSelect"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import NftSelectCard from '../Collection/NftSelectCard.vue';
export default {
  components: { NftSelectCard },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    pool: {
      type: Boolean,
      default: false,
    },
    
  },
  computed: {
    ...mapFields("nftContract", ["poolNFTs", "userNFTs", "poolSync", "selectedNft", "selectedQuantity", "selectedNftMetadata"]),
        nftsToSelect(){
            if(this.pool){
                return this.poolNFTs;
            }else{
                return this.userNFTs;
            }
        },
    showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateDialog", false);
      },
    },
  },
  methods:{
      handleSelect(payload){
          let {nft, metadata} = payload;
          this.selectedNft = nft;
          this.selectedNftMetadata = metadata;
          this.selectedQuantity = 1;

          this.$emit("updateDialog", false);
      }
  }
};
</script>

<style>
</style>