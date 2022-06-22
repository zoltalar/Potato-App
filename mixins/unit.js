export default {
  methods: {
    refreshUnitMeta () {
      this.$store.dispatch('unit/meta')
    },
    unitMeta () {
      return this.$store.getters['unit/meta']
    },
    unitSystems () {
      return this.$_.get(this.unitMeta(), 'systems')
    },
    unitTypes () {
      return this.$_.get(this.unitTypes(), 'types')
    },
    productUnits () {
      const productUnits = [{
        text: '',
        value: null
      }]
      const code = this.countryCode()
      const countries = this.countryCollection()
      const country = this.$_.head(this.$_.filter(countries, (country) => {
        return country.code === code
      }))
      if (!this.$_.isNil(country)) {
        let units = this.$_.get(country, 'units', [])
        units = this.$_.filter(units, (unit) => {
          return this.$_.includes([2, 4, 5], unit.type)
        })
        this.$_.forEach(units, (unit) => {
          productUnits.push({
            text: this.$t('phrases.' + unit.name),
            value: unit.abbreviation
          })
        })
      }
      return productUnits
    }
  }
}