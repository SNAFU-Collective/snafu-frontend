<template>
  <v-container>
    <v-row
      id="mainRow"
      justify="center"
      style="display: grid; padding-top: 100px"
    >
      <div>NFT List</div>
      {{ nfts }}
    </v-row>

  <v-row>
    <v-col>
    Nft To Bridge
    </v-col>
    <v-col>
            <v-numeric
          hide-details="auto"
          outlined
          v-model="nftIdToBridge"
          :maxValue="nfts.length + 1"
        ></v-numeric>
    </v-col>
  </v-row>
  <v-row>
      <v-btn large :disabled="nftIdToBridge == null" @click="transfer()"> Confirm </v-btn>
  </v-row>
  </v-container>
</template>

<script>
import { ChainFactoryConfigs, ChainFactory } from "xp.network/dist";
// EVM chains compatible wallet:
// Chanin name to chain nonce mapper:
import { Chain, Config } from "xp.network/dist/consts";
import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";
import vNumeric from '../components/Input/vNumeric.vue';

export default {
  components: { vNumeric },
  data() {
    return {
      nfts: [],
      source: null,
      dest: null,
      nftIdToBridge: null,
      factory: null,
    };
  },
  async mounted() {
    // Fetch the config for required networks i.e. Mainnet/Testnet
    // Networks from the ChainFactoryConfigs namespace. You can also mix
    // and match the configs to your heart's desire.
    const mainnetConfig = ChainFactoryConfigs.MainNet; // You can also call the ChainFactoryConfigs.MainNet

    // Instantiate the factory by populating the function call with the above objects.
    this.factory = ChainFactory(Config, mainnetConfig());
    const xdai = await this.factory.inner(Chain.XDAI);
    const avax = await this.factory.inner(Chain.AVALANCHE);

    this.source = xdai;
    this.dest = avax;

    this.nfts = await this.factory.nftList(
      this.source, // The chain of interest
      this.account // The public key of the NFT owner
    );
    console.log("NFTS: ", this.nfts);
    console.log("Signer: ", this.getUserSigner)
  },
  methods: {
    async transfer() {
      const theChosenOne = this.nfts[this.nftIdToBridge];
      // Checking the selected NFT object
      console.log("My NFT #1", theChosenOne);

      let signer = this.getUserSigner;
      const isApproved = await this.source.approveForMinter(
        theChosenOne,
        signer
      );
      console.log("Is Approved:", isApproved);

      const result = await this.factory.transferNft(
        this.source, // The Source Chain.
        this.dest, // The Destination Chain.
        theChosenOne, // Or the NFT you have chosen.
        signer, // Or tronlink or maiar.
        this.account // The address who you are transferring the NFT to.
      );
      console.log(result);
    },
  },
  computed: {
    ...mapFields("connectweb3", ["isConnected", "account", "chainId"]),
    ...mapGetters("connectweb3", ["getUserSigner"]),
  },
};
</script>

<style>
</style>