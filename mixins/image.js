export default {
  methods: {
    imageVariation(variations, name, key = null) {
      if (key) {
        name += '.' + key
      }
      return this.$_.get(variations, name)
    }
  }
}
