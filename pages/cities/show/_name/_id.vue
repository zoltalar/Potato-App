<template>
  <div class="cities show">
    <page-title>
      {{ $t('messages.page_title_cities', { location: city.name }) }}
    </page-title>
    <page-content>
      <template>
        <gmap-map class="google-maps" :center="mapCenter" :zoom="map.zoom" ref="google-map">
          <gmap-info-window
            :options="map.infoWindow.options"
            :position="map.infoWindow.position"
            :opened="map.infoWindow.open"
            @closeclick="map.infoWindow.open = false" />
          <gmap-marker
            v-for="(marker, i) in markers"
            :key="'google-map-marker' + i"
            :position="mapsMarkerPosition(marker)"
            :clickable="true"
            @click="mapsInfoWindow(marker, i)" />
        </gmap-map>
        <b-row>
          <b-col md="6">
            <div class="promoted-farms">
              <h2 class="h5">{{ $t('phrases.featured_farms') }}</h2>
              <div class="list list-farms" v-if="hasFarms()">
                <farm-list-item :farm="farm" :distance-away="true" v-for="(farm, i) in farms" :key="'farm-list-item-' + i" />
                <nuxt-link :to="localePath({ name: 'farms-browse-city-id-page', params: { city: slugify(city.name), id: city.id, page: 1 } })">{{ $t('phrases.more_farms') }}</nuxt-link>
              </div>
              <div v-else>
                <b-card class="bg-light" no-body>
                  <b-card-body>
                    <p>{{ $t('messages.farms_empty', { location: city.name }) }}</p>
                    <nuxt-link :to="localePath('/farms/create')" class="btn btn-primary">{{ $t('phrases.add_farm') }}</nuxt-link>
                  </b-card-body>
                </b-card>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="promoted-markets">
              <h2 class="h5">{{ $t('phrases.featured_farmers_markets') }}</h2>
              <div class="list list-markets" v-if="hasMarkets()">
                <market-list-item :market="market" :distance-away="true" v-for="(market, i) in markets" :key="'market-list-item-' + i" />
                <nuxt-link :to="localePath({ name: 'markets-browse-city-id-page', params: { city: slugify(city.name), id: city.id, page: 1 } })">{{ $t('phrases.more_farmers_markets') }}</nuxt-link>
              </div>
              <div v-else>
                <b-card class="bg-light" no-body>
                  <b-card-body>
                    <p>{{ $t('messages.markets_empty', { location: city.name }) }}</p>
                    <nuxt-link :to="localePath('/markets/create')" class="btn btn-primary">{{ $t('phrases.add_farmers_market') }}</nuxt-link>
                  </b-card-body>
                </b-card>
              </div>
            </div>
          </b-col>
          <b-col md="12" v-if="hasProducts()">
            <div class="locally-grown">
              <h2 class="h5">{{ $t('messages.locally_grown', { season: $t('phrases.' + currentSeason()) }) }}</h2>
              <b-card>
                <div class="category-inventory" v-for="(inventory, categoryName, i) in products" :key="'category-inventory-' + i">
                  <h6>{{ categoryName }}</h6>
                  <ul>
                    <li v-for="(inventoryId, item, j) in inventory" :key="'category-inventory-list-item-' + i + '-' + j">
                      <nuxt-link :to="localePath({ name: 'farms-search-item-location-inventory-city-page-radius', params: { item: slugify(item), location: slugify(city.name), inventory: inventoryId, city: city.id, page: 1, radius: addressMaxRadius() }})">{{ item }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </b-card>
              <nuxt-link :to="localePath('products')">{{ $t('phrases.more_products') }}</nuxt-link>
            </div>
          </b-col>
        </b-row>
      </template>
    </page-content>
  </div>
</template>
<script>
import googleMapMixin from '@/mixins/google-map'
export default {
  name: 'PageCitiesShow',
  mixins: [ googleMapMixin ],
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_cities', { location: this.city.name }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_cities', { location: this.city.name })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/cities/:name/:id',
      pl: '/miasta/:name/:id'
    }
  },
  async asyncData ({ params, $axios }) {
    const id = params.id
    try {
      let response = await $axios.get(`/api/potato/cities/show/${id}`)
      const city = response.data.data
      response = await $axios.get(`/api/potato/farms/locate/${city.latitude}/${city.longitude}`, { params: { limit: 3 }})
      const farms = response.data.data
      response = await $axios.get(`/api/potato/markets/locate/${city.latitude}/${city.longitude}`, { params: { limit: 3 }})
      const markets = response.data.data
      response = await $axios.get('/api/potato/addresses/plot')
      const markers = response.data.data
      response = await $axios.get(`/api/potato/products/growing-area/${city.latitude}/${city.longitude}`)
      const products = response.data
      return { city, farms, markets, markers, products }
    } catch (error) {}
  },
  data: () => ({
    city: {},
    farms: [],
    markets: [],
    markers: [],
    products: [],
    map: {
      zoom: 10,
      infoWindow: {
        index: null,
        open: false,
        options: {
          content: '',
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        position: null
      }
    }
  }),
  computed: {
    mapCenter () {
      const city = this.city
      return {
        lat: city.latitude,
        lng: city.longitude
      }
    }
  },
  watch: {
    city: {
      handler (city) {
        if (this.$_.isEmpty(city)) {
          this.$router.push(this.localePath('/'))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    hasFarms () {
      return this.farms.length > 0
    },
    hasMarkets () {
      return this.markets.length > 0
    },
    hasProducts () {
      return !this.$_.isEmpty(this.products)
    }
  }
}
</script>
