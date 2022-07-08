<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col sm="6">
          <div class="promoted-farms" v-if="farms.length > 0">
            <span class="circle">
              <font-awesome-icon icon="seedling" />
            </span>
            <h5>{{ $t('phrases.buy_from_farmers_near_you') }}</h5>
            <div class="list list-farms">
              <farm-list-item :farm="farm" v-for="(farm, i) in farms" />
            </div>
          </div>
        </b-col>
        <b-col sm="6">
          <div class="map">
            <span class="circle">
              <font-awesome-icon icon="map" />
            </span>
            <h5>{{ $t('phrases.browse_farms_map') }}</h5>
            <gmap-map class="google-maps" :center="map.center" :zoom="map.zoom" ref="google-map">
              <gmap-info-window
                :options="map.infoWindow.options"
                :position="map.infoWindow.position"
                :opened="map.infoWindow.open"
                @closeclick="map.infoWindow.open = false" />
              <gmap-marker
                v-for="(marker, i) in map.markers"
                :key="'google-map-marker' + i"
                :position="position(marker)"
                :clickable="true"
                @click="infoWindow(marker, i)" />
            </gmap-map>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'PageIndex',
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
  data: () => ({
    farms: [],
    map: {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 10,
      markers: [],
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
    city () {
      return this.$store.getters['city/city']
    }
  },
  watch: {
    city: {
      handler (city) {
        if (!this.$_.isEmpty(city)) {
          this.centerize(city)
          this.locate(city)
          this.fetch()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    fetch () {
      this
        .$axios
        .get(`/api/potato/addresses/plot/farm`)
        .then((response) => {
          this.map.markers = this.$_.get(response, 'data.data', [])
        })
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
    locate (city) {
      const latitude = city.latitude
      const longitude = city.longitude
      this
        .$axios
        .get(`/api/potato/farms/locate/${latitude}/${longitude}`, {
          params: { limit: 2 }
        })
        .then((response) => {
          this.farms = this.$_.get(response, 'data.data', [])
        })
    },
    position (marker) {
      return {
        lat: marker.latitude,
        lng: marker.longitude
      }
    },
    centerize (city) {
      if (!this.$_.isEmpty(city)) {
        this.map.center.lat = city.latitude
        this.map.center.lng = city.longitude
        this.map.zoom = 10
      }
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
