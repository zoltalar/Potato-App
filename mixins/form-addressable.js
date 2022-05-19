export default {
  data: () => ({
    countries: []
  }),
  computed: {
    states () {
      const countryId = this.farm.country_id
    }
  },
  methods: {
    countryOptions () {
      const options = [{
        value: null,
        text: ''
      }]
      const countries = this.countries
      this.$_.forEach(countries, (country) => {
        options.push({
          value: country.id,
          text: country.name
        })
      })
      return options
    },
    fetchCountries () {
      this
        .$axios
        .get('/api/potato/countries/index')
        .then((response) => {
          this.countries = this.$_.get(response, 'data.data')
        })
        .catch(() => {
          this.countries = []
        })
    }
  }
}
