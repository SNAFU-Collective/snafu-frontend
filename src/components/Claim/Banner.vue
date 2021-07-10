<template>
  <v-card
      class="mx-auto"
      style="background-image: url('https://pooltogether.com/pooltogether-facebook-share-image-1200-630@2x.png'); height: 300px;background-position: center; background-size: cover;"
  >

    <div class="bannerBox">
      <span class="bannerSubtitle">
        Participate in the SNAFU no-loss prize games on PoolTogether to win exclusive NFTs and physical items!
      </span>
      <v-btn
          class="bannerBtn"
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

<style>
@media screen and (max-width: 768px) {
  .bannerSubtitle {
    font-size: 15px;
  }

  .bannerBox {
    max-width: 85%;
  }
}

@media screen and (min-width: 769px) {
  .bannerSubtitle {
    font-size: 17px;
  }

  .bannerBox {
    max-width: 490px;
  }
}
.bannerBox {
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: grid;
}
.bannerSubtitle {
  border-radius: 3px;
  color: white;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.54); padding: 5px;
}

.bannerBtn {
  max-width: 122px;
  margin-top: 30px;
}
</style>