export default {
  methods: {
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
    refreshCountryCollection () {
      this.$store.dispatch('country/collection')
    }
  }
}
