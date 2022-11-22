<template>
  <form class="form-default" @submit.prevent="store">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.event_title') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('title') !== null}" maxlength="255" v-model="occurrence.title" />
      <div class="invalid-feedback d-block" v-if="error('title') !== null">
        {{ error('title') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.organizer') }}
        <span class="text-danger">*</span>
      </template>
      <select class="custom-select" :class="{'is-invalid': error('eventable_id') !== null}" v-model="occurrence.eventable_id">
        <option :value="null"></option>
        <template v-if="occurrence.eventable_type === 'farm'">
          <option :value="farm.id" v-for="(farm) in farms">{{ farm.name }}</option>
        </template>
        <template v-if="occurrence.eventable_type === 'market'">
          <option :value="market.id" v-for="(market) in markets">{{ market.name }}</option>
        </template>
      </select>
      <div class="invalid-feedback d-block" v-if="error('eventable_id') !== null">
        {{ error('eventable_id') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.event_eventable_id')"></small>
    </b-form-group>
    <b-form-group :label="$t('phrases.organizer_type')">
      <b-button-group size="lg">
        <b-button :variant="buttonVariant('farm')" @click.prevent="setEventableType('farm')">{{ $t('phrases.farm') }}</b-button>
        <b-button :variant="buttonVariant('market')" @click.prevent="setEventableType('market')">{{ $t('phrases.farmers_market') }}</b-button>
      </b-button-group>
      <div class="invalid-feedback d-block" v-if="error('eventable_type') !== null">
        {{ error('eventable_type') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.event_eventable_type')"></small>
    </b-form-group>
    <b-form-group :label="$t('phrases.status')">
      <b-badge pill variant="info">
        {{ eventStatusName(1) }}
      </b-badge>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.next') }}</b-button>
      <nuxt-link :to="localePath({ name: 'account-events' })" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'EventCreateForm',
  mixins: [ formErrorsMixin ],
  data: () => ({
    occurrence: {
      title: '',
      eventable_id: null,
      eventable_type: 'farm'
    },
    farms: [],
    markets: []
  }),
  async fetch() {
    await this.fetchFarms()
    await this.fetchMarkets()
  },
  watch: {
    'occurrence.eventable_type': {
      handler () {
        this.occurrence.eventable_id = null
      }
    }
  },
  methods: {
    buttonVariant (type) {
      const occurrence = this.occurrence
      if (type === occurrence.eventable_type) {
        return 'primary'
      } else {
        return 'outline-primary'
      }
    },
    fetchFarms () {
      this
        .$axios
        .get('/api/potato/account/farms')
        .then((response) => {
          this.farms = this.$_.get(response, 'data.data', [])
        })
    },
    fetchMarkets () {
      this
        .$axios
        .get('/api/potato/account/markets')
        .then((response) => {
          this.markets = this.$_.get(response, 'data.data', [])
        })
    },
    setEventableType (type) {
      this.occurrence.eventable_type = type
    },
    store () {
      let occurrence = this.occurrence
      this
        .$axios
        .post('/api/potato/events/store', occurrence)
        .then((response) => {
          this.setErrors(response)
          occurrence = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(occurrence)) {
            this.$root.$emit('event-created', { occurrence })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
