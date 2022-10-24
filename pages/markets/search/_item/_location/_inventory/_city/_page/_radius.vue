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
          <h2 class="p" v-html="$t('messages.markets_search', { item: itemName, location: locationName })"></h2>
          <market-list-item-card :market="market" :linkable-image="true" class="mb-4" v-for="(market, i) in markets" :key="'market-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'markets-show-name-id', params: { name: slugify(market.name), id: market.id } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </market-list-item-card>
          <pagination class="mb-0" route="markets-search-item-location-inventory-city-page" :meta="meta" />
        </div>
        <div v-else>
          <span v-html="$t('messages.markets_search_empty')"></span>
          <nuxt-link :to="localePath({ name: 'markets-create' })" class="btn btn-primary">{{ $t('phrases.add_farmers_market') }}</nuxt-link>
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
      title: this.$t('messages.page_title_markets_search', { item: this.itemName, location: this.locationName }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_markets_search', { item: this.itemName, location: this.locationName })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/search/:item/:location/:inventory/:city/:page/:radius',
      pl: '/agromarkety/szukaj/:item/:location/:inventory/:city/:page/:radius'
    }
  },
  async asyncData({ params, store }) {
    const type = 'markets'
    const item = params.item
    const location = params.location
    const inventoryId = params.inventory
    const cityId = params.city
    const page = params.page
    const radius = params.radius
    try {
      const inventory = await store.dispatch('search/inventory', { inventoryId, itemName: item })
      const city = await store.dispatch('search/city', { cityId, location })
      const response = await store.dispatch('search/search', { type, item, inventoryId, location, cityId, radius, page })
      return {
        markets: response.search,
        meta: response.meta,
        inventory,
        city
      }
    } catch (error) {}
  },
  data: () => ({
    markets: [],
    meta: {},
    inventory: {},
    city: {}
  }),
  computed: {
    item () {
      return this.$route.params.item
    },
    itemName () {
      const inventory = this.inventory
      if (!this.$_.isNil(inventory)) {
        return this.inventoryName(inventory)
      }
      return this.unslugify(this.item)
    },
    location () {
      return this.$route.params.location
    },
    locationName () {
      const city = this.city
      if (!this.$_.isNil(city)) {
        return city.name
      }
      return this.unslugify(this.location)
    },
    radius () {
      return this.$route.params.radius || this.addressMaxRadius()
    }
  }
}
</script>
