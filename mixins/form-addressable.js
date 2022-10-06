export default {
  methods: {
    addressLabel () {
      const country = this.selectedCountry()
      if (this.$_.isObject(country)) {
        if (country.code === 'pl') {
          return this.$t('phrases.street_and_house_number')
        } else if (country.code === 'us') {
          return this.$t('phrases.street')
        }
      }
      return this.$t('phrases.street')
    },
    countryOptions () {
      const options = [{
        value: null,
        text: ''
      }]
      const countries = this.countryCollection()
      this.$_.forEach(countries, (country) => {
        const name = this.$_.snakeCase(country.name)
        options.push({
          value: country.id,
          text: this.$t('phrases.' + name)
        })
      })
      return options
    },
    selectedCountry () {
      const countries = this.countryCollection()
      const countryId = this.country_id
      return this.$_.find(countries, { id: countryId })
    },
    stateLabel () {
      const country = this.selectedCountry()
      if (this.$_.isObject(country)) {
        if (country.code === 'pl') {
          return this.$t('phrases.voivodeship')
        } else if (country.code === 'us') {
          return this.$t('phrases.state')
        }
      }
      return ''
    },
    stateOptions () {
      const options = [{
        value: null,
        text: ''
      }]
      const country = this.selectedCountry()
      if (this.$_.isObject(country)) {
        const states = this.$_.get(country, 'states', [])
        this.$_.forEach(states, (state) => {
          options.push({
            value: state.id,
            text: state.name
          })
        })
      }
      return options
    }
  }
}
