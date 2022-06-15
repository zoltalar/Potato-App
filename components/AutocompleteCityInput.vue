<template>
  <div class="autocomplete-input">
    <b-form-input
      maxlength="60"
      :class="{'is-invalid': error}"
      @input="onChange"
      @keyup="onKeyUp"
      :disabled="disabled"
      v-model="city" />
    <ul v-if="hasCities() && open">
      <li v-for="(city, i) in cities" :key="'autocomplete-city-' + i" @click.prevent="select(city)">
        <span>{{ city.name }}</span>
        <small>({{ city.state.name }})</small>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AutocompleteCityInput',
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    city: '',
    cities: [],
    country_id: null,
    state_id: null,
    open: false,
    timeout: null
  }),
  watch: {
    value: {
      handler (value) {
        this.city = value
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
    fetchCities () {
      const city = this.city
      const stateId = this.state_id
      const countryId = this.country_id
      if (city.length >= 2) {
        this
          .$axios
          .get('/api/potato/cities/index', {
            params: {
              search: city,
              state_id: stateId,
              country_id: countryId
            }
          })
          .then((response) => {
            let cities = this.$_.get(response, 'data.data', [])
            if (cities.length > 5) {
              cities = this.$_.slice(cities, 0, 5)
            }
            this.cities = cities
          })
      } else {
        this.cities = []
      }
    },
    hasCities () {
      return this.cities.length > 0
    },
    listen () {
      this.$root.$on('input-country-id', ({ id }) => {
        this.country_id = id
      })
      this.$root.$on('input-state-id', ({ id }) => {
        this.state_id = id
      })
    },
    onChange () {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }

      this.timeout = setTimeout(() => {
        this.fetchCities()
        this.open = true
      }, 400)
    },
    onKeyUp () {
      const city = {
        name: this.city,
        zips: ''
      }
      this.$root.$emit('autocomplete-city-input', { city })
    },
    select (city) {
      this.city = city.name
      this.open = false
      this.$root.$emit('autocomplete-city-input', { city })
    }
  },
  mounted () {
    this.listen()
    document.addEventListener('click', this.clickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.clickOutside)
  }
}
</script>
