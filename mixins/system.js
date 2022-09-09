export default {
  methods: {
    loadResources() {
      if (this.$_.isEmpty(this.languageCollection())) {
        this.refreshLanguageCollection()
      }
      if (this.$_.isEmpty(this.countryCollection())) {
        this.refreshCountryCollection()
      }
      if (this.$_.isEmpty(this.currencyCollection())) {
        this.refreshCurrencyCollection()
      }
      if (this.$_.isEmpty(this.addressMeta())) {
        this.refreshAddressMeta()
      }
      if (this.$_.isEmpty(this.operatingHoursMeta())) {
        this.refreshOperatingHoursMeta()
      }
      if (this.$_.isEmpty(this.unitMeta())) {
        this.refreshUnitMeta()
      }
    }
  }
}
