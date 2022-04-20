export default {
  methods: {
    countryCode () {
      return this.$store.getters['country/code']
    },
    countryCollection () {
      return this.$store.getters['country/collection']
    },
    countryFlag (country) {
      let flag = this.$_.get(country, 'name')
      flag = this.$_.kebabCase(flag)
      try {
        return require(`@/assets/images/flag/${flag}.svg`)
      } catch(e) {}
    },
    defaultCountry () {
      const code = this.countryCode()
      return this.$_.find(this.countryCollection(), { code })
    },
    refreshCountryCollection () {
      this.$store.dispatch('country/collection')
    }
  }
}
