<template>
  <v-chip
  pill
>
{{balance | fromWei}}
<strong class="pl-1"> SNAFU</strong>
</v-chip>
</template>

<script>
import {mapFields} from "vuex-map-fields";
export default {
 computed:{
     ...mapFields("connectweb3", {balance: "snafuBalance"})
 }
}
</script>

<style>

</style>