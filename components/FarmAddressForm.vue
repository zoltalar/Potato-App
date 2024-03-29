<template>
  <form class="form-default" @submit.prevent="save">
    <b-form-group>
      <b-checkbox :value="1" :unchecked-value="0" v-model="farm.publish_address">{{ $t('phrases.publish_on_website') }}</b-checkbox>
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
      <b-form-select :class="{'is-invalid': error('address.state_id') !== null}" :options="stateOptions()" v-model="address.state_id" :disabled="$_.isNil(country_id)" />
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
    <h5 class="mt-4 mb-4">{{ $t('phrases.driving_directions_parking') }}</h5>
    <b-form-group>
      <b-form-textarea id="input-address-directions" size="lg" rows="7" maxlength="1000" :disabled="$_.isNil(country_id)" no-resize v-model="address.directions"></b-form-textarea>
      <small class="form-text text-muted">
        <chars-remaining for="input-address-directions" ref="address-directions" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath({ name: 'account-farms' })" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
import formAddressable from '@/mixins/form-addressable'
export default {
  name: 'FarmAddressForm',
  mixins: [ formErrorsMixin, formAddressable ],
  props: {
    editedFarm: {
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
      city_id: null,
      zip: '',
      directions: ''
    },
    farm: {
      id: null,
      publish_address: 0
    },
    country_id: null,
  }),
  computed: {
    editedAddress () {
      const editedFarm = this.editedFarm
      return this.addressableAddress(editedFarm)
    }
  },
  watch: {
    editedFarm: {
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
        this.address.city_id = city.id
        if ( ! this.$_.isNil(zip)) {
          this.address.zip = zip
        }
      })
    },
    populate () {
      const editedFarm = this.editedFarm
      const farm = this.farm
      const editedAddress = this.editedAddress
      const address = this.address
      if ( ! this.$_.isEmpty(editedFarm)) {
        this.$_.forOwn(editedFarm, (value, key) => {
          if (key in farm) {
            farm[key] = value
          }
        })
        this.farm = farm
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
      const farm = this.farm
      this
        .$axios
        .post(`/api/potato/addresses/save/farm/${farm.id}`, { address, addressable: farm })
        .then((response) => {
          this.setErrors(response)
          address = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(address)) {
            this.$root.$emit('farm-address-updated', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
