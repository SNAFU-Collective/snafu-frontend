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
          <v-col
            cols="4"
            class="nft-details"
            :style="!withdrawFromPool ? '' : 'margin-top: 0px;'"
          >
            <v-row
              no-gutters
              class="text-subtitle-2 truncate"
              style="font-weight: bold"
            >
              {{ metadata.name }}
            </v-row>
            <div
              class="text-caption"
              :style="!withdrawFromPool ? '' : 'line-height: 21px;'"
            >
              <v-row no-gutters> Token ID: {{ nft.id }} </v-row>
              <v-row no-gutters> Editions: {{ metadata.editions }} </v-row>
              <v-row no-gutters style="white-space: nowrap">
                Value: {{ nftValue | truncatePrice }} SNAFU</v-row
              >
              <v-row no-gutters v-if="withdrawFromPool" class="text-caption">
                Owned: {{ ownedEditions }}
              </v-row>
              <v-row no-gutters v-if="!isSwap">
                <a
                  :href="metadata.external_url"
                  target="_blank"
                  style="color: black"
                  :style="!hideSelect || claim || burn ? '' : ' margin-top:20px'"
                >
                  View Details
                  <v-icon style="font-size: 1em; padding-bottom: 2px; color:black"> mdi-open-in-new </v-icon>
                </a>
              </v-row>
            </div>
          </v-col>
          <v-col
            cols="4"
            class="d-flex flex-column"
            :style="withdrawFromPool ? '' : 'margin-bottom: 20px;'"
          >
            <v-row
              no-gutters
              class="text-caption font-weight-bold mr-2"
              justify="end"
              v-if="withdrawFromPool"
            >
              {{ nft.editions }} Available
            </v-row>
            <v-row
              no-gutters
              class="text-caption font-weight-bold mr-2"
              justify="end"
              v-if="!withdrawFromPool"
            >
              Owned: {{ nft.editions }}
            </v-row>
            <v-row
              no-gutters
              align="end"
              justify="end"
              v-if="!hideSelect"
              class="mr-2"
            >
              <v-btn small dark @click="selectNft"> SELECT </v-btn>
            </v-row>
            <v-row
              no-gutters
              align="end"
              justify="end"
              v-if="claim"
              class="mr-2"
            >
              <v-btn small dark @click="claimNft"> CLAIM </v-btn>
            </v-row>
            <v-row
              no-gutters
              align="end"
              justify="end"
              v-if="burn"
              class="mr-2"
            >
              <v-btn small dark @click="burnNft"> REDEEM </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: {
    nft: {
      type: Object,
      required: true,
    },
    withdrawFromPool: {
      type: Boolean,
      default: false,
    },
    hideSelect: {
      type: Boolean,
      default: false,
    },
    isSwap: {
      type: Boolean,
      default: false,
    },
    claim: {
      type: Boolean,
      default: false,
    },
    burn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("nftContract", ["getUserBalance"]),
    nftValue() {
      if (this.withdrawFromPool || !this.isSwap) {
        return +this.metadata.price + +this.metadata.fee;
      } else {
        return +this.metadata.price;
      }
    },
    ownedEditions() {
      if (this.withdrawFromPool) {
        return this.getUserBalance(this.nft.id);
      } else {
        return 0;
      }
    },
  },
  methods: {
    selectNft() {
      this.$emit("selectNft", { nft: this.nft, metadata: this.metadata });
    },
    claimNft() {
      this.$emit("claimNft", { nft: this.nft, metadata: this.metadata });
    },
    burnNft() {
      this.$emit("burnNft", { nft: this.nft, metadata: this.metadata });
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