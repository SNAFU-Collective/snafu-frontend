<template>
  <div style="display: flex">
    <div v-if="!isConnected" cols="1" >
      <v-btn @click="connectWallet" style="margin-bottom: 10px">
        Sign in
      </v-btn>
    </div>
    <div cols="9" no-gutters v-else>

      <v-chip
          :color="isXdai ? '#3EBD6A' : '#bc423e'"
          :text-color="isXdai ? '#fff' : '#fff'"
          style="margin-bottom: 10px; padding-left: 0"
      >
        <router-link class="accountLinkHeader" :to="{ name: 'Wallet'}">
        <v-chip
            color="#e4e4e499"
            text-color="black"
            style="border: #A7A7A7; cursor: pointer;"
        >
          <v-avatar left style="width: 50px !important; height: 50px !important; margin-left: -15px; padding-right: 5px">
<!--            <v-icon color="#fff" size="20px">mdi-account</v-icon>-->
            <v-img src="/pfp/8.png"/>
          </v-avatar>
          <span style="color: #fff; font-weight: 500">{{ account | abbreviateAddress }}</span>
        </v-chip>
        </router-link>
        <span style="padding-left: 5px; font-weight: 500">{{ chainId | networkName }}</span>
      </v-chip>

    </div>

    <div cols="1" v-if="isConnected" style="margin-left: 10px;margin-top: 2.5px">
      <v-tooltip bottom color="rgb(0 0 0 / 89%)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="grey"
              dark
              v-bind="attrs"
              v-on="on"
              class="text-h6"
              icon
              style="background-color: whitesmoke;margin-bottom: 10px;"
              small
              @click="disconnectWallet"
          >
            <v-icon size="25px">mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import {mapFields} from 'vuex-map-fields'

export default {
  components: {},
  data() {
    return {
      dialog: false,
      showConfirmSwap: false,
    }
  },
  methods: {
    ...mapActions("connectweb3", ["connectWallet", "addSnafuToMetamask", "disconnectWallet"]),
  },
  computed: {
    ...mapFields("connectweb3", ["isConnected", "account", 'chainId']),
    ...mapGetters("connectweb3", ["isMetamask", "isXdai"]),
  },

}
</script>

<style>
.accountLinkHeader {
  text-decoration: none;
}

.headline {
  justify-content: center;
  font-weight: bold !important;
}

.modalSocials {
  font-weight: bold;
  font-size: 17px;
  text-decoration: unset;
}

a.modalSocials:hover {
  color: #000000a3 !important;
}

.modalBody {
  margin: 30px 30px;
  border: #00000045;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 40px;
}

.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none;
  border-bottom: #30303047;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.bodyLink {
  font-weight: bold
}

.bodyLink:hover {
  text-decoration: underline !important;
  text-underline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .modalBody {
    height: auto;
    margin: 5px 5px;
    border: #00000045;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    padding: 20px;
  }

  .bodyLink {
    color: #303030 !important;
    font-weight: bold
  }
}
</style>