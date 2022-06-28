export default {
  methods: {
    currencyCollection () {
      return this.$store.getters['currency/collection']
    },
    currencyOptions () {
      const options = [{
        value: null,
        text: '',
      }]
      const currencies = this.currencyCollection()
      this.$_.forEach(currencies, (currency) => {
        options.push({
          value: currency.id,
          text: currency.code
        })
      })
      return options
    },
    refreshCurrencyCollection () {
      this.$store.dispatch('currency/collection')
    }
  }
}
