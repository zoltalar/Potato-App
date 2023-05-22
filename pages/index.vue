<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col lg="6" v-if="colMap() !== 12">
          <div v-if="type === 'farms'">
            <div class="promoted-farms">
              <span class="circle">
                <font-awesome-icon icon="seedling" />
              </span>
              <h2 class="h5">{{ $t('phrases.promoted_farms') }}</h2>
              <div class="list list-farms">
                <farm-list-item :farm="farm" :char-limit="80" v-for="(farm, i) in farms" :key="'farm-list-item-' + i" />
              </div>
            </div>
          </div>
          <div v-else-if="type === 'markets'">
            <div class="promoted-markets">
              <span class="circle">
                <font-awesome-icon icon="shopping-bag" />
              </span>
              <h2 class="h5">{{ $t('phrases.promoted_farmers_markets') }}</h2>
              <div class="list list-markets">
                <market-list-item :market="market" :char-limit="80" v-for="(market, i) in markets" :key="'market-list-item-' + i" />
              </div>
            </div>
          </div>
          <div v-else-if="type === 'events'">
            <div class="upcoming-events">
              <span class="circle">
                <font-awesome-icon icon="calendar-alt" />
              </span>
              <h2 class="h5">{{ $t('phrases.upcoming_events') }}</h2>
              <b-card>
                <ul class="list-square mb-0">
                  <li v-for="(event, i) in events" :key="'event-' + i">
                    <nuxt-link :to="localePath({ name: 'events-show-title-id', params: { title: slugify(event.title), id: event.id } })">{{ event.title }}</nuxt-link>
                    <small class="text-muted ml-1">
                      <span v-if="isValidDate(event.start_date) || isValidDate(event.end_date)">{{ dateRange(event.start_date, event.end_date) }}</span><span v-if="addressableAddress(event)">, {{ addressLine(addressableAddress(event), ',', ['city', 'state']) }}</span>
                    </small>
                  </li>
                </ul>
              </b-card>
            </div>
          </div>
        </b-col>
        <b-col :lg="colMap()">
          <div class="map">
            <span class="circle">
              <font-awesome-icon icon="map" />
            </span>
            <h2 class="h5" v-if="type === 'farms'">{{ $t('phrases.browse_farms_map') }}</h2>
            <h2 class="h5" v-else-if="type === 'markets'">{{ $t('phrases.browse_farmers_markets_map') }}</h2>
            <h2 class="h5" v-else-if="type === 'events'">{{ $t('phrases.browse_events_map') }}</h2>
            <gmap-map class="google-maps" :center="map.center" :zoom="map.zoom" ref="google-map">
              <gmap-marker
                v-for="(marker, i) in mapMarkers()"
                :key="'google-map-marker' + i"
                :position="mapsMarkerPosition(marker)"
                :clickable="false" />
            </gmap-map>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import googleMapMixin from '@/mixins/google-map'
export default {
  name: 'PageIndex',
  mixins: [ googleMapMixin ],
  layout: 'home',
  head () {
    return {
      title: this.$t('messages.search_food'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_index') },
        { hid: 'og:title', name: 'og:title', content: this.$t('messages.search_food') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_index') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ]
    }
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.get('/api/potato/farms/index', { params: { limit: 2, promote: true }})
      const farms = response.data.data
      response = await $axios.get('/api/potato/markets/index', { params: { limit: 2, promote: true }})
      const markets = response.data.data
      response = await $axios.get('/api/potato/events/index', { params: { limit: 10, scope: 1 }})
      const events = response.data.data
      response = await $axios.get('/api/potato/addresses/plot')
      const markers = response.data.data
      return { farms, markets, events, markers }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    farms: [],
    markets: [],
    events: [],
    markers: [],
    map: {
      center: {
        lat: 51.9194,
        lng: 19.1451
      },
      zoom: 5
    },
    type: 'farms'
  }),
  computed: {
    city () {
      return this.$store.getters['city/city']
    },
    eventMarkers () {
      return this.filterMarkers('event')
    },
    farmMarkers () {
      return this.filterMarkers('farm')
    },
    marketMarkers () {
      return this.filterMarkers('market')
    }
  },
  watch: {
    city: {
      handler (city) {
        this.centerize(city)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    colMap () {
      const type = this.type
      const farms = this.farms
      const markets = this.markets
      const events = this.events
      if ((type === 'farms' && farms.length === 0)
        || (type === 'markets' && markets.length === 0)
        || (type === 'events' && events.length === 0)) {
        return 12
      }
      return 6
    },
    filterMarkers (type) {
      const markers = this.markers
      return this.$_.filter(markers, (marker) => {
        return marker.addressable_type === type
      })
    },
    listen () {
      this.$root.$on('search-type', ({ type }) => {
        this.type = type
      })
    },
    centerize (city) {
      if (!this.$_.isEmpty(city)) {
        this.map.center.lat = city.latitude
        this.map.center.lng = city.longitude
        this.map.zoom = 10
      }
    },
    mapMarkers () {
      const type = this.type.slice(0, -1)
      return this[type + 'Markers']
    }
  },
  created () {
    this.listen()
  }
}
</script>
