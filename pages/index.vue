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
        </b-col>
        <b-col :lg="colMap()">
          <div class="map">
            <span class="circle">
              <font-awesome-icon icon="map" />
            </span>
            <h2 class="h5" v-if="type === 'farms'">{{ $t('phrases.browse_farms_map') }}</h2>
            <h2 class="h5" v-else-if="type === 'markets'">{{ $t('phrases.browse_farmers_markets_map') }}</h2>
            <gmap-map class="google-maps" :center="map.center" :zoom="map.zoom" ref="google-map">
              <gmap-info-window
                :options="map.infoWindow.options"
                :position="map.infoWindow.position"
                :opened="map.infoWindow.open"
                @closeclick="map.infoWindow.open = false" />
              <gmap-marker
                v-for="(marker, i) in mapMarkers()"
                :key="'google-map-marker' + i"
                :position="mapsMarkerPosition(marker)"
                :clickable="true"
                @click="mapsInfoWindow(marker, i)" />
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
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_index')
        }
      ]
    }
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.get('/api/potato/farms/index', { params: { limit: 2, promote: true }})
      const farms = response.data.data
      response = await $axios.get('/api/potato/markets/index', { params: { limit: 2, promote: true }})
      const markets = response.data.data
      response = await $axios.get('/api/potato/addresses/plot')
      const markers = response.data.data
      return { farms, markets, markers }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    farms: [],
    markets: [],
    markers: [],
    map: {
      center: {
        lat: 51.9194,
        lng: 19.1451
      },
      zoom: 5,
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
    type: 'farms'
  }),
  computed: {
    city () {
      return this.$store.getters['city/city']
    },
    farmMarkers () {
      const markers = this.markers
      return this.$_.filter(markers, (marker) => {
        return marker.addressable_type === 'farm'
      })
    },
    marketMarkers () {
      const markers = this.markers
      return this.$_.filter(markers, (marker) => {
        return marker.addressable_type === 'market'
      })
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
      if ((type === 'farms' && farms.length === 0) || (type === 'markets' && markets.length === 0)) {
        return 12
      }
      return 6
    },
    infoWindow (marker, i) {
      this.map.infoWindow.position = this.position(marker)
      this.map.infoWindow.options.content = '<strong>' + marker.addressable.name + '</strong>'
      if (this.index === i) {
        this.map.infoWindow.open = ! this.map.infoWindow.open
      } else {
        this.map.infoWindow.open = true
        this.index = i
      }
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
