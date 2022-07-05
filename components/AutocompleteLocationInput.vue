<template>
  <div class="autocomplete-input">
    <b-form-input
      :size="size"
      maxlength="255"
      :placeholder="$t('phrases.near')"
      required
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
    },
    size: {
      type: String,
      default: 'lg'
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
    locate () {
      if (!process.browser) {
        return false;
      }
      let city = this.$store.getters['city/city']
      if (this.$_.isNil(city)) {
        try {
          city = this.$auth.$storage.getCookie('potato._city')
          if (!this.$_.isEmpty(city)) {
            this.setCity(city)
            this.$store.commit('city/city', city)
          } else if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              this
                .$store
                .dispatch('city/locate', [
                  position.coords.latitude,
                  position.coords.longitude
                ])
                .then((city) => {
                  this.setCity(city)
                })
            })
          }
        } catch(e) {}
      } else {
        this.setCity(city)
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
    onKeyUp (city = null) {
      const location = {
        id: city.id || 0,
        name: city.name || this.location
      }
      this.$root.$emit('autocomplete-location-input', { location })
    },
    select (location) {
      this.location = location.name
      this.open = false
      this.$store.dispatch('city/city', location)
      this.$root.$emit('autocomplete-location-input', { location })
    },
    setCity (city) {
      this.location = city.name
      this.onKeyUp(city)
    }
  },
  mounted () {
    if (this.geolocation) {
      this.locate()
    }
    document.addEventListener('click', this.clickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.clickOutside)
  }
}
</script>
