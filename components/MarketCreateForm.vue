<template>
  <form class="form-default" @submit.prevent="store">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.farmers_market_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('name') !== null}" maxlength="255" v-model="market.name" />
      <div class="invalid-feedback d-block" v-if="error('name') !== null">
        {{ error('name') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="email" :class="{'is-invalid': error('email') !== null}" maxlength="255" v-model="market.email" />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.market_contact_information_email')"></small>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.promote_this_farmers_market') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-radio value="1" v-model="market.promote">{{ $t('phrases.yes') }}</b-form-radio>
      <div class="invalid-feedback d-block" v-if="error('promote') !== null">
        {{ error('promote') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.market_promote_yes')"></small>
    </b-form-group>
    <b-form-group>
      <b-form-radio value="0" v-model="market.promote">{{ $t('phrases.no') }}</b-form-radio>
      <div class="invalid-feedback d-block" v-if="error('promote') !== null">
        {{ error('promote') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.market_promote_no')"></small>
    </b-form-group>
    <b-form-group>
      <b-card>
        <b-card-text v-html="$t('messages.market_create_agreement')" />
      </b-card>
    </b-form-group>
    <b-form-group>
      <b-checkbox :value="1" :unchecked-value="null" v-model="market.terms">{{ $t('phrases.i_have_read_and_agree_with_conditions_above') }}</b-checkbox>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg" :disabled="submitDisabled()">{{ $t('phrases.create') }}</b-button>
      <nuxt-link :to="localePath('/account/markets')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'MarketCreateForm',
  mixins: [ formErrorsMixin ],
  data: () => ({
    market: {
      name: '',
      email: '',
      promote: null,
      terms: null
    }
  }),
  methods: {
    store () {
      let market = this.market
      this
        .$axios
        .post('/api/potato/markets/store', market)
        .then((response) => {
          this.setErrors(response)
          market = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(market)) {
            this.$root.$emit('market-created', { market })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    submitDisabled () {
      return parseInt(this.market.terms) !== 1
    }
  }
}
</script>
