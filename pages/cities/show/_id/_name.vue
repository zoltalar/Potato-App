<template>
  <div class="cities show">
    <page-title>
      {{ city.name }}
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
              <h5>{{ $t('phrases.featured_farms') }}</h5>
              <div class="list list-farms" v-if="hasFarms()">
                <farm-list-item :farm="farm" v-for="(farm, i) in farms" :key="'farm-list-item-' + i" />
                <nuxt-link to="/">{{ $t('phrases.more_farms') }}</nuxt-link>
              </div>
              <div v-else>
                <p>{{ $t('messages.farms_empty', { location: city.name }) }}</p>
                <nuxt-link :to="localePath('/farms/create')" class="btn btn-primary">{{ $t('phrases.add_farm') }}</nuxt-link>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="promoted-markets">
              <h5>{{ $t('phrases.featured_farmers_markets') }}</h5>
              <div class="list list-markets" v-if="hasMarkets()">
                <market-list-item :market="market" v-for="(market, i) in markets" :key="'market-list-item-' + i" />
                <nuxt-link to="/">{{ $t('phrases.more_farmers_markets') }}</nuxt-link>
              </div>
              <div v-else>
                <p>{{ $t('messages.markets_empty', { location: city.name }) }}</p>
                <nuxt-link :to="localePath('/markets/create')" class="btn btn-primary">{{ $t('phrases.add_farmers_market') }}</nuxt-link>
              </div>
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
      title: this.city.name + ' - ' + this.$t('messages.page_title_cities'),
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
      en: '/cities/show/:id/:name',
      pl: '/miasta/pokaz/:id/:name'
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
      return { city, farms, markets, markers }
    } catch (error) {}
  },
  data: () => ({
    city: {},
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
    },
    farms: [],
    markets: [],
    markers: []
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
    }
  }
}
</script>
