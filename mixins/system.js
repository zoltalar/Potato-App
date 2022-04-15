export default {
  methods: {
    loadResources() {
      if (this.$_.isEmpty(this.languageCollection())) {
        this.refreshLanguageCollection()
      }
      if (this.$_.isEmpty(this.countryCollection())) {
        this.refreshCountryCollection()
      }
    }
  }
}
