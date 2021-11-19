<template>
  <div>Test</div>
</template>

<script>
import {
  ChainFactoryConfigs,
  ChainFactory,
} from "xp.network/dist";
// EVM chains compatible wallet:
// Chanin name to chain nonce mapper:
import { Chain, Config } from "xp.network/dist/consts";
// Elrond provider:
import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

export default {
  async mounted() {
    // Fetch the config for required networks i.e. Mainnet/Testnet
    // Networks from the ChainFactoryConfigs namespace. You can also mix
    // and match the configs to your heart's desire.
    const mainnetConfig = ChainFactoryConfigs.MainNet; // You can also call the ChainFactoryConfigs.MainNet

    // Instantiate the factory by populating the function call with the above objects.
    const factory = ChainFactory(Config, mainnetConfig());
    const xdai = await factory.inner(Chain.XDAI);
    const avax = await factory.inner(Chain.AVALANCHE);
    const nfts = await factory.nftList(
      xdai, // The chain of interest
      this.account // The public key of the NFT owner
    );
    console.log("NFTS: ", nfts);

    const theChosenOne = nfts[0];
    // Checking the selected NFT object
    console.log("My NFT #1", theChosenOne);

    let signer = this.getUserSigner;
     const isApproved = await xdai.approveForMinter(theChosenOne, signer);
    console.log("Is Approved:", isApproved);

    const result = await factory.transferNft(
      xdai, // The Source Chain.
      avax, // The Destination Chain.
      theChosenOne, // Or the NFT you have chosen.
      signer, // Or tronlink or maiar.
      this.account // The address who you are transferring the NFT to.
    );
    console.log(result);
  },
  computed: {
    ...mapFields("connectweb3", ["isConnected", "account", "chainId"]),
    ...mapGetters("connectweb3", ["getUserSigner"]),
  },
};
</script>

<style>
</style>