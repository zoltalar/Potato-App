<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group :label="$t('phrases.facebook')">
      <b-input-group prepend="https://facebook.com/">
        <b-form-input :class="{'is-invalid': error('facebook') !== null}" maxlength="100" v-model="market.facebook" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('facebook') !== null">
        {{ error('facebook') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.twitter')">
      <b-input-group prepend="https://twitter.com/">
        <b-form-input :class="{'is-invalid': error('twitter') !== null}" maxlength="100" v-model="market.twitter" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('twitter') !== null">
        {{ error('twitter') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.pinterest')">
      <b-input-group prepend="https://pinterest.com/">
        <b-form-input :class="{'is-invalid': error('pinterest') !== null}" maxlength="100" v-model="market.pinterest" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('pinterest') !== null">
        {{ error('pinterest') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.instagram')">
      <b-input-group prepend="https://instagram.com/">
        <b-form-input :class="{'is-invalid': error('instagram') !== null}" maxlength="100" v-model="market.instagram" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('instagram') !== null">
        {{ error('instagram') }}
      </div>
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
  name: 'MarketSocialMediaForm',
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
      facebook: '',
      twitter: '',
      pinterest: '',
      instagram: ''
    }
  }),
  watch: {
    editedMarket: {
      handler () {
        this.populate()
      },
      deep: true
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
        .put(`/api/potato/markets/update-social-media/${market.id}`, market)
        .then((response) => {
          this.setErrors(response)
          market = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(market)) {
            this.$root.$emit('market-social-media-updated', { market })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
