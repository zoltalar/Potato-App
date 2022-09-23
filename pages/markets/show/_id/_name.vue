<template>
  <div class="markets show" v-if="marketNotEmpty(market)">
    <page-cover :imageable="market" type="market" />
    <page-title>
      {{ market.name }}
    </page-title>
    <page-aside-content :col-aside="{ md: 4, lg: 4 }" :col-main="{ md: 8, lg: 8 }">
      <template v-slot:aside>
        <image-primary :imageable="market" type="market" class="mb-3" />
        <market-buttons-menu :market="market" />
        <market-contact-information :market="market" class="mt-4" />
        <market-operating-hours :market="market" class="mt-4 mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="!marketIsActive(market)">
          {{ $t('messages.market_inactive') }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageMarketsShow',
  layout: 'default',
  head () {
    return {
      title: this.market.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_markets_show')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/show/:id/:name',
      pl: '/agromarkety/pokaz/:id/:name'
    }
  },
  data: () => ({
    market: {}
  }),
  watch: {
    market: {
      handler (market) {
        if (this.$_.isEmpty(market)) {
          this.$router.push(this.localePath('/'))
        }
      },
      deep: true
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
      this.$root.$on('market-favorited', () => {
        this.$store.commit('flash/message', this.$t('messages.market_favorited'))
        this.fetch()
      })
      this.$root.$on('message-created', () => {
        this.$store.commit('flash/message', this.$t('messages.message_sent'))
      })
      this.$root.$on('review-created', () => {
        this.$store.commit('flash/message', this.$t('messages.review_created'))
        this.fetch()
      })
    }
  },
  created () {
    this.listen()
  },
  mounted () {
    this.fetch()
  }
}
</script>
