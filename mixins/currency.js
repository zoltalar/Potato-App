export default {
  methods: {
    currencyCollection () {
      return this.$store.getters['currency/collection']
    },
    currencyOptions (defaultText = true) {
      const options = [{
        text: (defaultText ? ' - ' + this.$t('phrases.currency') +  ' - ' : ''),
        value: null
      }]
      const currencies = this.currencyCollection()
      this.$_.forEach(currencies, (currency) => {
        options.push({
          text: currency.code,
          value: currency.id
        })
      })
      return options
    },
    refreshCurrencyCollection () {
      this.$store.dispatch('currency/collection')
    }
  }
}
