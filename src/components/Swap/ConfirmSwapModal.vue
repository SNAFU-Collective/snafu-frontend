<template>
    <v-dialog v-model="showModal" max-width="500px" persistent>
        <v-card color="#F5F5F5">
            <v-card-title>
            <v-row no-gutters><v-col cols="11" class="text-center"> Confirm Swap </v-col>
            <v-col cols="1"> <v-icon class="pl-3 pb-2" @click="closeModal"> mdi-close </v-icon> </v-col>
            </v-row>
            </v-card-title>
            <v-card-text class="pt-3">
                <v-row no-gutters class="text-caption font-weight-bold" justify="center"> You will send: </v-row>
                <v-row no-gutters justify="center" class="pt-3">
                <nft-input class="mx-3" :disableActions="true" :hideBalance="true" />
                </v-row>
                <v-row no-gutters class="text-caption font-weight-bold pt-8" justify="center"> You will receive: </v-row>
                <v-row no-gutters justify="center" class="pt-3">
                <snafu-input class="mx-3" :hideBalance="true" />
                </v-row>
                <fee-infos />
            </v-card-text>
            <v-card-actions>
                <v-row no-gutters justify="center" class="mb-2">
                <v-btn dark large>
                    Confirm
                </v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import FeeInfos from './FeeInfos.vue';
import NftInput from './NftInput.vue';
import SnafuInput from './SnafuInput.vue';
export default {
  components: { NftInput, SnafuInput, FeeInfos },
      props: {
    show: {
      type: Boolean,
      default: false,
    }},
    computed:{
            showModal: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateDialog", false);
      }
    }


},
methods:{
        closeModal(){
      this.$emit("updateDialog", false);
    },
}
}
</script>

<style>

</style>