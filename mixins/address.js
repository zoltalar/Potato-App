export default {
  methods: {
    addressMeta () {
      return this.$store.getters['address/meta']
    },
    addressableTypes () {
      return this.$_.get(this.addressMeta(), 'addressable_types')
    },
    addressTypes () {
      return this.$_.get(this.addressMeta(), 'types')
    },
    refreshAddressMeta () {
      this.$store.dispatch('address/meta')
    }
  }
}
