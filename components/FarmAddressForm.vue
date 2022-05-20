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
      <b-form-select size="lg" v-model="country_id" :options="countryOptions()"></b-form-select>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ stateLabel() }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select size="lg" v-model="address.state_id" :options="stateOptions()" :disabled="$_.isNil(country_id)"></b-form-select>
      <div class="invalid-feedback d-block" v-if="error('state_id') !== null">
        {{ error('state_id') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ addressLabel() }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('address') !== null}" maxlength="100" v-model="address.address" />
      <div class="invalid-feedback d-block" v-if="error('address') !== null">
        {{ error('address') }}
      </div>
    </b-form-group>
    <b-form-group v-if="$_.get(this.selectedCountry(), 'code') === 'us'">
      <b-form-input :class="{'is-invalid': error('address_2') !== null}" maxlength="100" v-model="address.address_2" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.town') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('city') !== null}" maxlength="60" v-model="address.city" />
      <div class="invalid-feedback d-block" v-if="error('city') !== null">
        {{ error('city') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.postal_code') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('zip') !== null}" maxlength="15" v-model="address.zip" />
      <div class="invalid-feedback d-block" v-if="error('zip') !== null">
        {{ error('zip') }}
      </div>
    </b-form-group>
    <h5 class="mt-4 mb-4">{{ $t('phrases.driving_directions_parking') }}</h5>
    <b-form-group>
      <b-form-textarea id="input-address-directions" size="lg" rows="7" maxlength="1000" no-resize v-model="address.directions"></b-form-textarea>
      <small class="form-text text-muted">
        <chars-remaining for="input-address-directions" ref="address-directions" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
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
      zip: '',
      directions: ''
    },
    farm: {
      id: null,
      publish_address: 0
    },
    country_id: null,
  }),
  watch: {
    'editedFarm': {
      handler() {
        this.populate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    populate () {
      const editedFarm = this.editedFarm
      const farm = this.farm
      if ( ! this.$_.isEmpty(editedFarm)) {
        this.$_.forOwn(editedFarm, (value, key) => {
          if (key in farm) {
            farm[key] = value
          }
        })
        this.farm = farm
      }
    },
    save () {
      const address = this.address
      const farm = this.farm
      this
        .$axios
        .post(`/api/potato/addresses/save/farm/${farm.id}`, address)
        .then((response) => {
          this.setErrors(response)
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  },
  mounted() {
    this.fetchCountries()
  }
}
</script>
