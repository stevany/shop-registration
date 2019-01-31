<template>
  <div>
    <v-container fluid>
      <v-layout column>
        <v-stepper v-model="stepRegistration">
          <v-stepper-header>
            <v-stepper-step :complete="stepRegistration > 1" step="1">Shop name</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="stepRegistration > 2" step="2">Shop Address</v-stepper-step>

            <v-divider></v-divider>
            <v-stepper-step step="3">Opening Times</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-5"
                height="350px"
                color="grey lighten-3"
              >
              <v-form
                v-model="validName"
                ref="formName"
              >
              <v-card-title primary-title>
                <h3 class="headline mx-4">
                  Shop Name
                </h3>
              </v-card-title>
              <v-flex xs12 sm3 md2 d-flex class="mx-5 mt-5">
              <v-text-field
                v-model="shop.name"
                label="name"
                :rules="nameRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm3 md2 class="mx-5">
                <v-select
                  :items="items"
                  :rules="typeRules"
                  v-model="shop.type"
                  label="type"></v-select>
              </v-flex>
              </v-form>
              </v-card>

              <v-btn
                color="primary"
                @click="stepAddress"
              >
                Continue
              </v-btn>
              <v-btn @click = "resetName" color="red">Reset</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-5"
                color="grey lighten-3"
                height="350px"
              >
              <v-card-title primary-title>
                <h3 class="headline mx-4 pl-2">
                  Shop Address
                </h3>
              </v-card-title>
              <v-form
                v-model="validAddress"
                ref="formAddress"
              >
              <v-flex xs12 d-flex class="ma-5">
              <v-textarea
                solo
                v-model="shop.address"
                name="address"
                :rules="addressRules"
                label="address"
              ></v-textarea>
              </v-flex>
              </v-form>
              </v-card>

              <v-btn
                color="primary"
                @click="stepOpeningTimes"
              >
                Continue
              </v-btn>
              <v-btn @click = "resetAddress" color="red">Reset</v-btn>
              <v-btn @click = "cancelAddress" color="orange" flat style="float:right">Back to Step 1 Name</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                color="grey lighten-3"
                height="600px"
              >
              <v-card-title primary-title>
                <h3 class="headline mx-5">
                  Opening Times
                </h3>
              </v-card-title>
              <v-form
                v-model="validOpeningTimes"
                ref="formOpeningTimes"
              >
                <v-container fluid grid-list-md>
                  <v-data-iterator
                    :items="shop.openingTimes"
                    content-tag="v-layout"
                    row
                    wrap
                    hide-actions
                  >
                    <v-flex slot="item" slot-scope="props" xs12 sm6 md3 lg3>
                      <v-card height="150px" class="ma-5">
                        <v-card-title><h4>{{ props.item.day}}</h4></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-tile>
                            <v-list-tile-content class="my-5">
                              <v-text-field
                                v-model="props.item.time"
                                type="time"
                                label="opening time"
                                :rules="timeRules"
                              ></v-text-field>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                            <v-switch
                              :label="props.item.close? 'Close' : 'Open' "
                              v-model="props.item.close"
                              class="my-5"
                            ></v-switch>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-flex>
                  </v-data-iterator>
                </v-container>
              </v-form>
              </v-card>

              <v-btn
                color="primary"
                @click="save"
              >
                Save
              </v-btn>
              <v-btn @click = "resetOpeningTimes" color="red">Reset</v-btn>
              <v-btn @click="cancelOpeningTimes" flat style="float:right" color="orange">Back to Step 2 Address</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    items: ['book shop', 'food shop'],
    stepRegistration: 0,
    validName: false,
    validAddress: false,
    validOpeningTimes: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    typeRules: [
      v => !!v || 'Type is required'
    ],
    addressRules: [
      v => !!v || 'Address is required'
    ],
    timeRules: [
      v => !!v || 'Time is required'
    ]
  }),
  computed: { ...mapGetters({
    shop: 'shop/getShop'
  })
  },
  methods: {
    stepAddress () {
      if (this.$refs.formName.validate()) {
        this.cancelOpeningTimes()
      }
    },
    stepOpeningTimes () {
      if (this.$refs.formAddress.validate()) {
        this.stepRegistration = 3
      }
    },
    save () {
      if (this.$refs.formOpeningTimes.validate()) {
        this.$store.dispatch('shop/save', this.shop)
        this.$router.push('/thankyou')
      }
    },
    cancelAddress () {
      this.stepRegistration = 1
    },
    cancelOpeningTimes () {
      this.stepRegistration = 2
    },
    resetName () {
      this.$refs.formName.reset()
      this.$refs.formName.resetValidation()
    },
    resetAddress () {
      this.$refs.formAddress.reset()
      this.$refs.formAddress.resetValidation()
    },
    resetOpeningTimes () {
      this.$refs.formOpeningTimes.reset()
      this.$refs.formOpeningTimes.resetValidation()
    }
  }
}
</script>
