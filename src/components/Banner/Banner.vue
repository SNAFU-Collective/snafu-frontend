<template>
  <v-card
      class="mx-auto"
      :style="cardBackgroundStyle"
  >
    <div class="bannerBox">
      <span v-if="text" class="bannerSubtitle">
       {{ text }}
      </span>

      <v-row style="padding: 0 0; margin: 0 0">
        <v-btn
            class="bannerBtn"
            light
            v-if="showActionBtn"
            @click="handleActionClick('primary')"
        >
          {{ actionLabel }}
        </v-btn>
        <v-btn
            class="bannerBtn"
            text
            light
            color="white"
            v-if="showSecondaryActionBtn"
            @click="handleActionClick('secondary')"
        >
          {{ secondaryActionLabel }}
        </v-btn>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),
  props: {
    src: {
      type: String,
      default: '',
    },
    mobileSrc: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    showActionBtn: {
      type: Boolean,
      default: true,
    },
    actionUrl: {
      type: String,
      default: '',
    },
    actionLabel: {
      type: String,
      default: '',
    },
    showSecondaryActionBtn: {
      type: Boolean,
      default: false,
    },
    secondaryActionLabel: {
      type: String,
      default: 'Learn More',
    },
    secondaryActionUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    cardBackgroundStyle() {
      console.log(window.innerWidth)
      let source = window.innerWidth > 726 ? this.src : this.mobileSrc
      return 'background-image: url(' + source + '); height: 300px;background-position: center; background-size: cover;'
    },
  },
  methods: {
    handleActionClick(buttonType) {
      switch (buttonType) {
        case 'primary':
          window.open(this.actionUrl, '_blank')
          break
        case 'secondary':
          window.open(this.secondaryActionUrl, '_blank')
          break
      }
    },
  },
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
  background-color: rgba(0, 0, 0, 0.54);
  padding: 5px;
}

.bannerBtn {
  max-width: 122px;
  margin-top: 30px;
}
</style>