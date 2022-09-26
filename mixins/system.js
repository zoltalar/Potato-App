export default {
  methods: {
    async loadResources(force = false) {
      if (this.$_.isEmpty(this.languageCollection()) || force) {
        await this.refreshLanguageCollection()
      }
      if (this.$_.isEmpty(this.categoryCollection()) || force) {
        await this.refreshCategoryCollection()
      }
      if (this.$_.isEmpty(this.countryCollection()) || force) {
        await this.refreshCountryCollection()
      }
      if (this.$_.isEmpty(this.currencyCollection()) || force) {
        await this.refreshCurrencyCollection()
      }
      if (this.$_.isEmpty(this.addressMeta()) || force) {
        await this.refreshAddressMeta()
      }
      if (this.$_.isEmpty(this.operatingHoursMeta()) || force) {
        await this.refreshOperatingHoursMeta()
      }
      if (this.$_.isEmpty(this.unitMeta()) || force) {
        await this.refreshUnitMeta()
      }
    }
  }
}
