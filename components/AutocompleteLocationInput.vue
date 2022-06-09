<template>
  <div class="autocomplete-input">
    <b-form-input
      size="lg"
      maxlength="255"
      :placeholder="$t('phrases.near')"
      @input="onChange"
      @keyup="onKeyUp"
      v-model="location" />
    <ul v-if="hasLocations() && open">
      <li v-for="(location, i) in locations" :key="'autocomplete-locations-' + i" @click.prevent="select(location)">
        <span>{{ location.name }}</span>
        <small>{{ location.state.name }}</small>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AutocompleteLocationInput',
  props: {
    value: {
      type: String,
      default: null
    },
    geolocation: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    location: '',
    locations: [],
    open: false,
    timeout: null
  }),
  watch: {
    value: {
      handler (value) {
        this.location = value
      },
      immediate: true
    }
  },
  methods: {
    clickOutside (event) {
      if ( ! this.$el.contains(event.target)) {
        this.open = false
      }
    },
    fetchLocations () {
      const location = this.location
      if (location.length >= 2) {
        this
          .$axios
          .get('/api/potato/cities/index', {
            params: {
              search: location
            }
          })
          .then((response) => {
            let locations = this.$_.get(response, 'data.data', [])
            if (locations.length > 5) {
              locations = this.$_.slice(locations, 0, 5)
            }
            this.locations = locations
          })
      } else {
        this.locations = []
      }
    },
    geolocate () {
      if (process.browser) {
        const city = this.$store.getters['city/city']
        if (this.empty(city)) {
          const id = this.$auth.$storage.getUniversal('potato._city_id')
          const name = this.$auth.$storage.getUniversal('potato._city_name')
          if (!this.$_.isNil(id) && !this.$_.isNil(name)) {
            this.$store.commit('city/id', id)
            this.$store.commit('city/city', name)
            this.location = name
            this.onKeyUp()
          } else if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              this
                .$store
                .dispatch('city/coords', [
                  position.coords.latitude,
                  position.coords.longitude
                ])
                .then((city) => {
                  this.location = city.name
                  this.onKeyUp()
                })
            })
          }
        } else {
          this.location = city
          this.onKeyUp()
        }
      }
    },
    hasLocations () {
      return this.locations.length > 0
    },
    onChange () {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }

      this.timeout = setTimeout(() => {
        this.fetchLocations()
        this.open = true
      }, 400)
    },
    onKeyUp () {
      const location = this.location
      this.$root.$emit('autocomplete-location-input', { location })
    },
    select (location) {
      const id = location.id
      const name = location.name
      this.location = name
      this.open = false
      this.$store.dispatch('city/id', id)
      this.$store.dispatch('city/city', name)
      this.$root.$emit('autocomplete-location-input', { location: name })
    }
  },
  mounted() {
    if (this.geolocation) {
      this.geolocate()
    }
    document.addEventListener('click', this.clickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutside)
  }
}
</script>
