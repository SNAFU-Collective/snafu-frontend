<!--<template>-->
<!--  <row style="display: flex; justify-content: center" justify="center">-->
<!--    <v-col colls="12" v-if="!isConnected" cols="1" >-->
<!--      <v-btn @click="connectWallet" style="margin-bottom: 10px">-->
<!--        Connect wallet-->
<!--      </v-btn>-->
<!--    </v-col>-->
<!--    <v-col cols="9" no-gutters v-else>-->
<!--      <v-chip-->
<!--          :color="isXdai ? '#303030' : '#bc423e'"-->
<!--          :text-color="isXdai ? '#fff' : '#fff'"-->
<!--          style="margin-bottom: 10px; padding-left: 0"-->
<!--      >-->
<!--        <router-link class="accountLinkHeader" :to="{ name: 'Wallet'}">-->
<!--          <v-chip-->
<!--              style="border: #A7A7A7; cursor: pointer; background-color: #f3f3f3;"-->
<!--          >-->
<!--            <v-avatar left style="width: 50px !important; height: 50px !important; margin-left: -15px; padding-right: 5px">-->
<!--              <v-img src="/pfp/unknown.jpeg"/>-->
<!--            </v-avatar>-->
<!--            <v-tooltip bottom>-->
<!--              <template v-slot:activator="{ on, attrs }">-->
<!--                <span style="color: #303030; font-weight: 500" v-bind="attrs" v-on="on">{{ account | abbreviateAddress }}</span>-->
<!--              </template>-->
<!--              <span>Go to your profile</span>-->
<!--            </v-tooltip>-->
<!--          </v-chip>-->
<!--        </router-link>-->
<!--        <v-tooltip bottom style="text-align: center">-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <span style="padding-left: 5px; font-weight: 500; cursor: pointer"-->
<!--                  v-bind="attrs" v-on="on" @click="addGnosisChainNetwork"-->
<!--            >{{ chainId | networkName }}</span>-->
<!--          </template>-->
<!--          <span>Click here to switch to the correct network!</span>-->
<!--        </v-tooltip>-->
<!--      </v-chip>-->
<!--    </v-col>-->

<!--    <v-col cols="3" v-if="isConnected" style="margin-left: 10px;margin-top: 2.5px">-->
<!--      <v-tooltip bottom color="rgb(0 0 0 / 89%)">-->
<!--        <template v-slot:activator="{ on, attrs }">-->
<!--          <v-btn-->
<!--              color="#303030"-->
<!--              dark-->
<!--              v-bind="attrs"-->
<!--              v-on="on"-->
<!--              class="text-h6"-->
<!--              icon-->
<!--              style="background-color: whitesmoke;margin-bottom: 10px;"-->
<!--              small-->
<!--              @click="disconnectWallet"-->
<!--          >-->
<!--            <v-icon size="25px">mdi-exit-to-app</v-icon>-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <span>Disconnect</span>-->
<!--      </v-tooltip>-->
<!--    </v-col>-->
<!--  </row>-->
<!--</template>-->

<template>
    <v-app-bar
        color="#303030 accent-4"
        dark
        height="70"
        class="elevation-0 "
        style="border-top-right-radius: 10px;border-top-left-radius: 10px;"
    >
      <v-col cols="2" class="status-bar status-bar">
        <router-link :to="{ name: 'Home'}" style="color: transparent;">
          <v-btn icon class="ma-1">
            <v-icon size="28" class="">mdi-home</v-icon>
            <!--          <p class="menuTitle">Home</p>-->
          </v-btn>
        </router-link>

      </v-col>
      <v-col cols="2" class="ma-1 status-bar">
        <router-link :to="{ name: 'Wallet'}" style="color: transparent;">
          <v-btn icon >
            <v-icon size="28"  class="">mdi-account</v-icon>
            <!--          <p class="menuTitle">Profile</p>-->
          </v-btn>
        </router-link>

      </v-col>
      <v-col cols="2"  class="ma-1 status-bar">
        <router-link :to="{ name: 'Community'}"  style="color: transparent;">
          <v-btn icon>
            <v-icon size="28" class="">mdi-account-group</v-icon>
            <!--          <p class="menuTitle">Community</p>-->
          </v-btn>
        </router-link>
      </v-col>
      <v-col cols="2"  class="ma-1 status-bar">
        <router-link :to="{ name: 'Pool'}" style="color: transparent;">
          <v-btn icon >
            <v-icon size="28" class="">mdi-swap-vertical</v-icon>
            <!--          <p class="menuTitle">Mint</p>-->
          </v-btn>
        </router-link>

      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2" >
        <v-btn icon>
          <v-icon size="28" class="">mdi-menu</v-icon>
          <p></p>
        </v-btn>
      </v-col>

    </v-app-bar>
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
    ...mapActions("connectweb3", ["connectWallet", "disconnectWallet", "addGnosisChainNetwork"]),
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

  .status-bar .v-btn span {
    display: grid;
    justify-content: center;
    justify-items: center;
  }

  .mobileTitle {
    font-size: 5px;
    font-weight: 400;
  }
}
</style>