export default {
  methods: {
    cityLargestCollection () {
      return this.$store.getters['city/largestCollection']
    },
    async refreshCityLargestCollection () {
      return await this.$store.dispatch('city/largestCollection')
    }
  }
}
