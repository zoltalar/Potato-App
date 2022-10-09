<template>
  <div class="markets browse">
    <page-title>
      {{ $t('messages.page_title_markets_browse', { location: city.name}) }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <nuxt-link :to="localePath({ name: 'cities-show-name-id', params: { name: city.name, id: city.id } })" class="btn btn-primary mb-4">{{ $t('phrases.back') }}</nuxt-link>
      </template>
      <template>
        <div v-if="hasMarkets()">
          <market-list-item-card :market="market" :linkable-image="true" class="mb-4" v-for="(market, i) in markets" :key="'market-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'markets-show-id-name', params: { id: market.id, name: slugify(market.name) } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </market-list-item-card>
          <pagination class="mb-0" route="markets-browse-id-city-page" :meta="meta" />
        </div>
        <div v-else>
          <p>{{ $t('messages.markets_empty', { location: city }) }}</p>
          <nuxt-link :to="localePath('/markets/create')" class="btn btn-primary">{{ $t('phrases.add_farmers_market') }}</nuxt-link>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageMarketsBrowse',
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_markets_browse', { location: this.city.name }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_browse', { location: this.city.name })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/:city/:id/:page',
      pl: '/agromarkety/:city/:id/:page'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    const page = params.page
    try {
      let response = await $axios.get(`/api/potato/cities/show/${id}`)
      const city = response.data.data
      if (city) {
        const latitude = city.latitude
        const longitude = city.longitude
        const response = await $axios.get(`/api/potato/markets/browse/${latitude}/${longitude}`, { params: { page }})
        return {
          city,
          markets: response.data.data,
          meta: response.data.meta
        }
      }
    } catch (error) {}
  },
  data: () => ({
    city: {},
    markets: [],
    meta: {}
  }),
  watch: {
    city: {
      handler (city) {
        if (this.$_.isEmpty(city)) {
          this.$router.push(this.localePath('/'))
        }
      },
      immediate: true
    }
  },
  methods: {
    hasMarkets () {
      return this.markets.length > 0
    }
  }
}
</script>
