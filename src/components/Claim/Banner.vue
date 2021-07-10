<template>
  <v-card
      class="mx-auto"
      style="background-image: url('https://pooltogether.com/pooltogether-facebook-share-image-1200-630@2x.png'); height: 300px;background-position: center; background-size: cover;"
  >

    <div style="position: absolute;
    bottom: 30px;
    left: 30px;
display: grid">
      <span style="    color: white;
    font-size: 17px;
    font-weight: 500;
    background-color: #0000003d; padding: 5px">
        Participate in the SNAFU no-loss prize games on PoolTogether <br> to win exclusive NFTs and physical prizes!
      </span>
      <v-btn
          style="    max-width: 122px;
    margin-top: 30px;"
          light
      >
        PARTICIPATE
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),
}
</script>