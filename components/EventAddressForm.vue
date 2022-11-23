<template>
  <form class="form-default" @submit.prevent="save">
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
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <b-button variant="secondary" size="lg" class="ml-3" @click.prevent="destroy" v-if="hasAddress()">{{ $t('phrases.delete') }}</b-button>
      <nuxt-link :to="localePath({ name: 'account-events' })" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
import formAddressable from '@/mixins/form-addressable'
export default {
  name: 'EventAddressForm',
  mixins: [ formErrorsMixin, formAddressable ],
  props: {
    editedEvent: {
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
      zip: ''
    },
    event: {
      id: null
    },
    country_id: null,
  }),
  computed: {
    editedAddress () {
      const editedEvent = this.editedEvent
      return this.addressableAddress(editedEvent)
    }
  },
  watch: {
    editedEvent: {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
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
    destroy () {
      if (this.hasAddress()) {
        const model = this.$t('phrases.address').toLowerCase()
        const message = this.$t('messages.confirm_model_destroy', { model })
        if (confirm(message)) {
          this
            .$axios
            .delete(this.destroyUri())
            .then((response) => {
              if (response.status === 204) {
                this.reset()
                this.$root.$emit('event-address-deleted')
              }
            })
        }
      }
    },
    destroyUri () {
      const address = this.editedAddress
      const addressable = this.editedEvent
      const type = 'event'
      return `/api/potato/addresses/${address.id}/${type}/${addressable.id}`
    },
    hasAddress () {
      return ! this.$_.isNil(this.editedAddress)
    },
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
      const editedEvent = this.editedEvent
      const event = this.event
      const editedAddress = this.editedAddress
      const address = this.address
      if ( ! this.$_.isEmpty(editedEvent)) {
        this.$_.forOwn(editedEvent, (value, key) => {
          if (key in event) {
            event[key] = value
          }
        })
        this.event = event
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
    reset () {
      this.address.state_id = null
      this.address.address = ''
      this.address.address_2 = ''
      this.address.city = ''
      this.address.city_id = null
      this.address.zip = ''
      this.country_id = null
    },
    save () {
      let address = this.address
      address.type = 1
      const event = this.event
      this
        .$axios
        .post(`/api/potato/addresses/save/event/${event.id}`, { address, addressable: event })
        .then((response) => {
          this.setErrors(response)
          address = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(address)) {
            this.$root.$emit('event-address-updated', { event })
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
