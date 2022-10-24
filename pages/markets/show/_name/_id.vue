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
        <b-row class="mb-4">
          <b-col>
            <b-row>
              <b-col>
                <b-form-rating
                  variant="warning"
                  size="lg"
                  class="p-0"
                  :value="market.average_rating"
                  :title="$t('messages.reviews_count', { count: market.reviews_count })"
                  no-border
                  inline
                  readonly />
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <social-media :linkable="market" type="market" class="text-right" />
          </b-col>
        </b-row>
        <market-description :market="market" class="mb-4" />
        <products :productable="market" type="market" class="mb-4" />
        <reviewable-reviews :reviewable="market" />
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
      title: this.$t('messages.page_title_markets_show', { name: this.market.name, address: this.addressLine(this.addressableAddress(this.market)) }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_markets_show') + ': ' + this.market.name
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/:name/:id',
      pl: '/agromarkety/:name/:id'
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
      handler (market) {
        if (this.$_.isEmpty(market)) {
          this.$router.push(this.localePath({ name: 'index' }))
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
  }
}
</script>
