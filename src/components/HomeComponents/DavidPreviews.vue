<template>
  <div style="width: 100%">
    <v-row className="mt-5">
      <v-card :ripple="false" class="mx-auto mt-5" max-width="300">
        <v-card-text style="">
          <v-hover>
            <v-img
                slot-scope="{ hover }"
                v-if="hover"
                src='david/preview/1.gif'
                width="300px"
                height="300px"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
                v-else
                src='david/preview/1.png'
                width="300px"
                height="300px"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-hover>
        </v-card-text>
      </v-card>
      <v-card :ripple="false" class="mx-auto mt-5" max-width="300">
        <v-card-text style="">
          <v-hover>
            <v-img
                slot-scope="{ hover }"
                v-if="hover"
                src='david/preview/2.gif'
                width="300px"
                height="300px"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
                v-else
                src='david/preview/2.png'
                width="300px"
                height="300px"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-hover>
        </v-card-text>
      </v-card>
      <v-card :ripple="false" class="mx-auto mt-5" max-width="300">
        <v-card-text style="">
          <v-hover>
            <v-img
                slot-scope="{ hover }"
                v-if="hover"
                src='david/preview/3.gif'
                width="300px"
                height="300px"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
                v-else
                src='david/preview/3.png'
                width="300px"
                height="300px"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="#303030"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-hover>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {},
}
</script>

<style>
@media screen and (min-width: 768px) {

}

@media screen and (max-width: 768px) {

}


</style>