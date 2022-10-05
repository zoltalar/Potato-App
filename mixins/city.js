export default {
  methods: {
    cityLargestCollection () {
      return this.$store.getters['city/largestCollection']
    },
    refreshCityLargestCollection () {
      this.$store.dispatch('city/largestCollection')
    }
  }
}
