export default {
  methods: {
    countryCode () {
      return this.$store.getters['country/code']
    },
    countryCollection () {
      return this.$store.getters['country/collection']
    },
    countryFlag (country) {
      let flag = this.countryName(country)
      flag = this.$_.kebabCase(flag)
      try {
        return require(`@/assets/images/flag/${flag}.svg`)
      } catch(e) {}
    },
    countryName(country) {
      return this.$_.get(country, 'name', 'Poland')
    },
    defaultCountry () {
      const code = this.countryCode()
      return this.$_.find(this.countryCollection(), { code })
    },
    async refreshCountryCollection () {
      return await this.$store.dispatch('country/collection')
    }
  }
}
