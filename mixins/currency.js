export default {
  methods: {
    currencyCode () {
      return this.$store.getters['currency/code']
    },
    currencyCollection () {
      return this.$store.getters['currency/collection']
    },
    currencyOptions (defaultOption = false, defaultText = '', valueProperty = 'id') {
      const options = []
      if (defaultOption) {
        options.push({
          text: defaultText,
          value: null
        })
      }
      const currencies = this.currencyCollection()
      this.$_.forEach(currencies, (currency) => {
        options.push({
          text: currency.code,
          value: currency[valueProperty]
        })
      })
      return options
    },
    refreshCurrencyCollection () {
      this.$store.dispatch('currency/collection')
    }
  }
}
