<template>
  <div class="autocomplete-input">
    <b-form-input maxlength="60" v-model="city" />
    <ul v-if="hasCities()">
      <li v-for="(city, i) in cities" :key="'autocomplete-result-' + i">
        <span @click.prevent="select(city)">{{ city.name }}</span>
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
    }
  },
  data: () => ({
    city: '',
    cities: []
  }),
  watch: {
    city: {
      handler (city) {
        if (city.length >= 2) {
          this
            .$axios
            .get('/api/potato/cities/index', {
              params: {
                search: city
              }
            })
            .then((response) => {
              let cities = this.$_.get(response, 'data.data', [])
              if (cities.length > 10) {
                cities = this.$_.slice(cities, 0, 5)
              }
              this.cities = cities
            })
        }
      }
    },
    value: {
      handler (value) {
        this.city = value
      },
      immediate: true
    }
  },
  methods: {
    hasCities () {
      return this.cities.length > 0
    },
    select (city) {
      this.city = city.name
    }
  }
}
</script>
