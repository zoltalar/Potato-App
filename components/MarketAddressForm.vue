<template>
  <form class="form-default" @submit.prevent="save">
    <b-form-group>
      <b-checkbox :value="1" :unchecked-value="0" v-model="market.publish_address">{{ $t('phrases.publish_on_website') }}</b-checkbox>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.country') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select v-model="country_id" :options="countryOptions()" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ stateLabel() }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select v-model="address.state_id" :options="stateOptions()" :disabled="$_.isNil(country_id)" />
      <div class="invalid-feedback d-block" v-if="error('address.state_id') !== null">
        {{ error('address.state_id') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ addressLabel() }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('address.address') !== null}" maxlength="100" :disabled="$_.isNil(country_id)" v-model="address.address" />
      <div class="invalid-feedback d-block" v-if="error('address.address') !== null">
        {{ error('address.address') }}
      </div>
    </b-form-group>
    <b-form-group v-if="$_.get(this.selectedCountry(), 'code') === 'us'">
      <b-form-input :class="{'is-invalid': error('address.address_2') !== null}" maxlength="100" :disabled="$_.isNil(country_id)" v-model="address.address_2" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.town') }}
        <span class="text-danger">*</span>
      </template>
      <autocomplete-city-input :error="error('address.city') !== null" :disabled="$_.isNil(country_id)" v-model="address.city" />
      <div class="invalid-feedback d-block" v-if="error('address.city') !== null">
        {{ error('address.city') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.postal_code') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('address.zip') !== null}" maxlength="15" :disabled="$_.isNil(country_id)" v-model="address.zip" />
      <div class="invalid-feedback d-block" v-if="error('address.zip') !== null">
        {{ error('address.zip') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.stand')">
      <b-form-input :class="{'is-invalid': error('address.stand') !== null}" maxlength="255" :disabled="$_.isNil(country_id)" v-model="address.stand" />
      <div class="invalid-feedback d-block" v-if="error('address.stand') !== null">
        {{ error('address.stand') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath('/account/farms')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
import formAddressable from '@/mixins/form-addressable'
export default {
  name: 'MarketAddressForm',
  mixins: [ formErrorsMixin, formAddressable ],
  props: {
    editedMarket: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    address: {
      state_id: null,
      address: '',
      address_2: '',
      city: '',
      zip: '',
      stand: ''
    },
    market: {
      id: null,
      publish_address: 0
    },
    country_id: null,
  }),
  computed: {
    editedAddress () {
      const editedMarket = this.editedMarket
      return this.marketAddress(editedMarket)
    }
  },
  watch: {
    'editedMarket': {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
    },
    'address.directions': {
      handler (directions) {
        this.$refs['address-directions'].update(directions)
      }
    },
    'address.state_id': {
      handler (id) {
        this.$root.$emit('input-state-id', { id })
      }
    },
    'country_id': {
      handler (id) {
        this.$root.$emit('input-country-id', { id })
      }
    }
  },
  methods: {
    listen () {
      this.$root.$off('autocomplete-city-input')

      this.$root.$on('autocomplete-city-input', ({ city }) => {
        const zip = this.$_.head(this.phrases(city.zips))
        this.address.city = city.name
        if ( ! this.$_.isNil(zip)) {
          this.address.zip = zip
        }
      })
    },
    populate () {
      const editedMarket = this.editedMarket
      const market = this.market
      const editedAddress = this.editedAddress
      const address = this.address
      if ( ! this.$_.isEmpty(editedMarket)) {
        this.$_.forOwn(editedMarket, (value, key) => {
          if (key in market) {
            market[key] = value
          }
        })
        this.market = market
      }
      if ( ! this.$_.isEmpty(editedAddress)) {
        this.$_.forOwn(editedAddress, (value, key) => {
          if (key in address) {
            address[key] = value
          }
        })
        this.country_id = editedAddress.state.country_id
        this.address = address
      }
    },
    save () {
      let address = this.address
      address.type = 1
      const market = this.market
      this
        .$axios
        .post(`/api/potato/addresses/save/market/${market.id}`, { address, addressable: market })
        .then((response) => {
          this.setErrors(response)
          address = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(address)) {
            this.$root.$emit('market-address-updated', { market })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  },
  mounted () {
    this.fetchCountries()
    this.listen()
  }
}
</script>
