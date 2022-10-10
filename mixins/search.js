export default {
  methods: {
    searchCity () {
      return this.$store.getters['search/city']
    },
    searchInventory () {
      return this.$store.getters['search/inventory']
    }
  }
}
