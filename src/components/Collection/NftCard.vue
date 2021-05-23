<template>
  <v-row>
    <v-card class="mx-auto" max-width="250">
      <v-card-text style="white-space: pre; background-color: #F5F5F5">
        <v-row justify="center">
          <v-dialog
              v-model="fullscreen"
              width="600px"
          >
            <v-card>
              <v-row>
                <v-col cols="10">
                  <v-card-title>
                    <span class="headline truncateLong">{{ metadata.name }}</span>
                  </v-card-title>
                </v-col>
                <v-col cols="2" style="margin-top: 15px; text-align: right; padding-right: 25px;">
                  <v-btn
                      icon
                      @click="fullscreen = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-img :src="'/nfts/'+nft.id+'/image'" width="100%"/>
            </v-card>
          </v-dialog>
          <a @click="toggle">
            <v-img :src="'/nfts/'+nft.id+'/image'" height="250" width="250"/>
          </a>
        </v-row>

        <v-row style="display: flex; padding-top: 10px; padding-bottom: 5px" class="px-2">
          <span style="width: 60%; text-align: left" class="truncate"><strong>{{ metadata.name }}</strong></span>
          <span v-if="nft.editions" style="width: 40%; text-align: right"><strong>{{
              nft.editions
            }} of {{ metadata.editions }}</strong></span>
          <span v-else style="width: 40%; text-align: right"><strong>{{ metadata.editions }} Editions</strong></span>
        </v-row>
        <v-row class="px-2 subtext">ID: {{ nft.id }}</v-row>
        <v-row class="px-2 subtext">
          <v-col cols="10" style="text-align: left; padding: 0;">Value:
            {{ (+metadata.price + +metadata.fee) | truncatePrice }} SNAFU
          </v-col>
          <v-col cols="2" style="text-align: right; padding: 0;"><a :href="metadata.external_url" target="_blank"
                                                                    style="color: rgba(0, 0, 0, 0.6) !important;">More</a>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>

import axios from "axios"

export default {
  props: {
    nft: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.fullscreen = !this.fullscreen
    },
  },
  data() {
    return {
      metadata: {},
      fullscreen: false,
    }
  },
  async beforeMount() {
    let res = await axios.get("./nfts/" + this.nft.id + "/metadata.json")
    this.metadata = res.data
  },
}
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

.truncateLong {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-dialog.v-dialog--active {
  overflow-y: hidden;
  overflow-x: hidden;
}

@media screen and (max-width: 768px) {

}
</style>