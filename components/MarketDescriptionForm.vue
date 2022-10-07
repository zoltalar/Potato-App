<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <b-form-textarea id="input-market-description" size="lg" rows="10" maxlength="5000" no-resize v-model="market.description"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-market-description" ref="market-description" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath('/account/markets')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'MarketDescriptionForm',
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
      description: ''
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
    'market.description': {
      handler (description) {
        this.$refs['market-description'].update(description)
      }
    }
  },
  methods: {
    populate () {
      const editedMarket = this.editedMarket
      const market = this.market
      if ( ! this.$_.isEmpty(editedMarket)) {
        this.$_.forOwn(editedMarket, (value, key) => {
          if (key in market) {
            market[key] = value
          }
        })
        this.market = market
      }
    },
    update () {
      let market = this.market
      this
        .$axios
        .put(`/api/potato/markets/update-description/${market.id}`, market)
        .then((response) => {
          this.setErrors(response)
          market = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(market)) {
            this.$root.$emit('market-description-updated', { market })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
