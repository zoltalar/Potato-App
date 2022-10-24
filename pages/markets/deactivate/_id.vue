<template>
  <div class="markets deactivate">
    <page-title>
      {{ $t('phrases.deactivate_market') }}
      -
      {{ market.name }}
    </page-title>
    <page-content>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="marketIsActive(market)">
          <p class="mb-4">{{ $t('messages.market_deactivate') }}</p>
          <b-row>
            <b-col md="6">
              <market-deactivate-form :edited-market="market" />
            </b-col>
          </b-row>
        </div>
        <div v-else>
          <nuxt-link :to="localePath({ name: 'account-markets' })" class="btn btn-primary btn-lg">{{ $t('phrases.continue') }}</nuxt-link>
        </div>
      </template>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageMarketsDeactivate',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.deactivate_market') + ' - ' + this.market.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_markets_deactivate')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/deactivate/:id',
      pl: '/agromarkety/dezaktywuj/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      const response = await $axios.get(`/api/potato/markets/show/${id}`)
      return { market: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    market: {}
  }),
  watch: {
    market: {
      handler(market) {
        if (this.$_.isEmpty(market) || !this.marketIsOwner(market)) {
          this.$router.push(this.localePath({ name: 'account-markets' }))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    fetch () {
      const id = this.$route.params.id
      this
        .$axios
        .get(`/api/potato/markets/show/${id}`)
        .then((response) => {
          this.market = this.$_.get(response, 'data.data')
        })
    },
    listen () {
      this.$root.$off('market-deactivated')

      this.$root.$on('market-deactivated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_deactivated'))
        this.fetch()
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
