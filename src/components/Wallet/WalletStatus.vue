<template>
  <v-row>
    <v-col cols="10" v-if="!isConnected">
      <v-btn @click="connectWallet" style="margin-bottom: 10px">
        Connect wallet
      </v-btn>
    </v-col>
    <v-col cols="9" no-gutters v-else>
      <v-chip
          :color="isXdai ? '#3EBD6A' : '#bc423e'"
          :text-color="isXdai ? '#fff' : '#fff'"
          style="margin-bottom: 10px; padding-left: 0"
      >
        <v-chip
            color="#e4e4e499"
            text-color="black"
            style="border: #A7A7A7"
        >
          <v-avatar left>
            <v-icon color="#fff">mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          <span style="color: rgba(0, 0, 0, 0.6); font-weight: 500">{{ account | abbreviateAddress }}</span>
        </v-chip>
        <span style="padding-left: 5px; font-weight: 500">{{ chainId | networkName }}</span>
      </v-chip>
    </v-col>
    <v-col cols="1">
      <v-dialog
          v-model="dialog"
          width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              class="text-h6"
              icon
              style="background-color: whitesmoke;margin-bottom: 10px"
              :style="!isConnected ? 'margin-top:2px;' : 'margin-top: 0px; ' "
              small
              color="grey"
          >
            ?
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
              light
          >
            <v-row>
              <v-col cols="8" offset="2">
                <v-card-title class="headline">
                  About
                </v-card-title>
              </v-col>
              <v-col cols="2" style="margin-top: 10px; text-align: right;">
                <v-btn
                    icon
                    @click="dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-card-text class="mt-10">
            <v-row style="margin-bottom: 30px">
              <v-col cols="1.3" style="text-align: center">
                <a class="modalSocials" href="https://nftsnafu.org" target="_blank">
                  <v-tooltip bottom color="rgb(0 0 0 / 89%)">
                    <template v-slot:activator="{ on, attrs }">
                      <img src="../../assets/logo-snafu-black.png" width="42px" v-bind="attrs" v-on="on"
                           style="margin-top:2px">
                    </template>
                    <span>Website</span>
                  </v-tooltip>
                </a>
              </v-col>
              <v-col cols="1.3" style="text-align: center">
                <a class="modalSocials" href="https://twitter.com/nftsnafu" target="_blank">
                  <v-tooltip bottom color="rgb(0 0 0 / 89%)">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon size="45" color="#303030" v-bind="attrs" v-on="on">mdi-twitter</v-icon>
                    </template>
                    <span>Twitter</span>
                  </v-tooltip>
                </a>
              </v-col>
              <v-col cols="1.3" style="text-align: center">
                <a class="modalSocials" href="https://t.me/nftsnafu" target="_blank">
                  <v-tooltip bottom color="rgb(0 0 0 / 89%)">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon size="45" color="#303030" v-bind="attrs" v-on="on">mdi-telegram</v-icon>
                    </template>
                    <span>Telegram</span>
                  </v-tooltip>
                </a>
              </v-col>
              <v-col cols="1.3" style="text-align: center">
                <a class="modalSocials" href="https://discord.gg/kvbxMfUyQD" target="_blank">
                  <v-tooltip bottom color="rgb(0 0 0 / 89%)">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon size="45" color="#303030" v-bind="attrs" v-on="on">mdi-discord</v-icon>
                    </template>
                    <span>Discord</span>
                  </v-tooltip>
                </a>
              </v-col>
              <v-col cols="1.3" style="text-align: center">
                <a class="modalSocials" href="https://github.com/SNAFU-Collective" target="_blank">
                  <v-tooltip bottom color="rgb(0 0 0 / 89%)">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon size="45" color="#303030" v-bind="attrs" v-on="on">mdi-github</v-icon>
                    </template>
                    <span>Github</span>
                  </v-tooltip>
                </a>
              </v-col>
              <v-col cols="1.3" style="text-align: center">
                <a class="modalSocials"
                   href="https://blockscout.com/xdai/mainnet/address/0x27B9C2Bd4BaEa18ABdF49169054c1C1c12af9862/transactions"
                   target="_blank">
                  <v-tooltip bottom color="rgb(0 0 0 / 89%)">
                    <template v-slot:activator="{ on, attrs }">
                      <img src="../../assets/xdai-logo-black.png" width="42px" v-bind="attrs" v-on="on">
                    </template>
                    <span>xDai Explorer</span>
                  </v-tooltip>
                </a>
              </v-col>
            </v-row>
            <div class="modalBody">
              <v-row v-if="isConnected && isMetamask">
                <v-col cols="7">
                  <p>Add SNAFU to Metamask:</p>
                </v-col>
                <v-col cols="5" style="text-align: right">
                  <a @click="addSnafuToMetamask" class="bodyLink">ADD</a>
                </v-col>
              </v-row>
              <v-row v-if="isConnected">
                <v-col cols="7">
                  <p>Disconnect wallet:</p>
                </v-col>
                <v-col cols="5" style="text-align: right">
                  <a @click="disconnectWallet" class="bodyLink">DISCONNECT</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="7">
                  <p>FAQs:</p>
                </v-col>
                <v-col cols="5" style="text-align: right">
                  <a href="https://www.nftsnafu.org/faq" target="_blank" class="bodyLink"
                     style="text-decoration: unset">READ</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="7">
                  <p>Support:</p>
                </v-col>
                <v-col cols="5" style="text-align: right">
                  <a class="bodyLink" href="https://www.nftsnafu.org/contact-us" target="_blank"
                     style="text-decoration: unset">CONTACT US</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <p style="text-align: justify;"
                  >Swap NFTs of SNAFU ERC1155 Collection
                    for $SNAFU ERC20 tokens and vice versa.
                    <strong>NFT Value = 1000 $SNAFU / NFT rarity</strong>
                    Rarity is the number of editions of an NFT.
                    $SNAFU tokens are automatically <strong>minted</strong> when
                    someone sells NFTs and <strong>burned</strong> when someone
                    buys NFTs.
                  </p>
                  <a class="bodyLink" href="https://www.nftsnafu.org/swap-protocol" target="_blank"
                     style="text-decoration: unset">Read more</a>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="1" v-if="isConnected">
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
            <v-icon size="22px">mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Disconnect</span>
      </v-tooltip>
    </v-col>
  </v-row>
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