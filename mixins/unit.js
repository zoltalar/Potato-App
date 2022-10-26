export default {
  methods: {
    countryUnits () {
      const code = this.countryCode()
      const countries = this.countryCollection()
      const country = this.$_.head(this.$_.filter(countries, (country) => {
        return country.code === code
      }))
      return this.$_.get(country, 'units', [])
    },
    lengthUnit (property = null) {
      const units = this.countryUnits()
      const unit = this.$_.head(this.$_.filter(units, (unit) => {
        return parseInt(unit.type) === 1
      }))
      if (!this.$_.isNil(property)) {
        return this.$_.get(unit, property)
      }
      return unit
    },
    productUnits (defaultOption = false, defaultText = '') {
      const productUnits = []
      if (defaultOption) {
        productUnits.push({
          text: defaultText,
          value: null
        })
      }
      let units = this.countryUnits()
      units = this.$_.filter(units, (unit) => {
        return this.$_.includes([2, 4, 5], unit.type)
      })
      this.$_.forEach(units, (unit) => {
        productUnits.push({
          text: this.$t('phrases.' + unit.name),
          value: unit.abbreviation
        })
      })
      return productUnits
    },
    async refreshUnitMeta () {
      return await this.$store.dispatch('unit/meta')
    },
    unitMeta () {
      return this.$store.getters['unit/meta']
    },
    unitSystems () {
      return this.$_.get(this.unitMeta(), 'systems')
    },
    unitTypes () {
      return this.$_.get(this.unitTypes(), 'types')
    }
  }
}
