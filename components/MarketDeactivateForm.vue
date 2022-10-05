<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.deactivation_reason') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-textarea id="input-market-deactivation-reason" :class="{'is-invalid': error('deactivation_reason') !== null}" size="lg" rows="7" maxlength="500" no-resize v-model="market.deactivation_reason"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('deactivation_reason') !== null">
        {{ error('deactivation_reason') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-market-deactivation-reason" ref="market-deactivation-reason" />
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.submit') }}</b-button>
      <nuxt-link :to="localePath('/account/markets')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'MarketDeactivateForm',
  mixins: [ formErrorsMixin ],
  props: {
    editedMarket: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    market: {
      id: null,
      deactivation_reason: ''
    }
  }),
  watch: {
    editedMarket: {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
    },
    'market.deactivation_reason': {
      handler (reason) {
        this.$refs['market-deactivation-reason'].update(reason)
      }
    }
  },
  methods: {
    populate () {
      const editedMarket = this.editedMarket
      const market = this.market
      if (!this.$_.isEmpty(editedMarket)) {
        this.$_.forOwn(editedMarket, (value, key) => {
          if (key in market) {
            market[key] = value
          }
        })
        this.market = market
      }
    },
    reset () {
      this.market.deactivation_reason = ''
    },
    update () {
      let market = this.market
      this
        .$axios
        .put(`/api/potato/markets/deactivate/${market.id}`, market)
        .then((response) => {
          this.setErrors(response)
          market = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(market)) {
            this.reset()
            this.$root.$emit('market-deactivated', { market })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
