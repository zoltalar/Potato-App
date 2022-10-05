<template>
  <div class="markets search">
    <page-title>
      {{ $t('phrases.markets_search_results') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <advanced-site-search-form />
      </template>
      <template>
        <div class="list-markets" v-if="markets.length > 0">
          <p v-html="$t('messages.markets_search', { item, location })"></p>
          <market-list-item-card :market="market" :linkable-image="true" class="mb-4" v-for="(market, i) in pagedMarkets" :key="'market-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'markets-show-id-name', params: { id: market.id, name: slugify(market.name) } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </market-list-item-card>
          <b-pagination
            class="mb-4"
            v-model="pagination.currentPage"
            :items="markets"
            :total-rows="markets.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div v-else>
          <span v-html="$t('messages.markets_search_empty')"></span>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageMarketsSearch',
  layout: 'default',
  head () {
    return {
      title: this.item + ' ' + this.$t('phrases.in') + ' ' + this.location + ' - ' + this.$t('phrases.markets_search_results'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_markets_search', { item: this.item, location: this.location })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/search/:item/:location',
      pl: '/agromarkety/szukaj/:item/:location'
    }
  },
  async asyncData({ query, params, $axios }) {
    const cityId = query.city_id
    const inventoryId = query.inventory_id
    const item = params.item
    const location = params.location
    const radius = query.radius
    try {
      const response = await $axios.get(`/api/potato/markets/search`, {
        params: { item, inventory_id: inventoryId, location, city_id: cityId, radius }
      })
      return { markets: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    markets: [],
    loaded: false,
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    cityId () {
      return this.$route.query.city_id
    },
    inventoryId () {
      return this.$route.query.inventory_id
    },
    item () {
      return this.$route.params.item
    },
    location () {
      return this.$route.params.location
    },
    pagedMarkets () {
      const markets = this.markets
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return markets.slice(start, end)
    },
    radius () {
      return this.$route.query.radius || this.addressMaxRadius()
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.fetch()
      }
    }
  },
  methods: {
    fetch () {
      const item = this.item
      const inventoryId = this.inventoryId
      const location = this.location
      const cityId = this.cityId
      const radius = this.radius
      this
        .$axios
        .get(`/api/potato/markets/search`, {
          params: { item, inventory_id: inventoryId, location, city_id: cityId, radius }
        })
        .then((response) => {
          this.markets = this.$_.get(response, 'data.data', [])
        })
    }
  }
}
</script>
