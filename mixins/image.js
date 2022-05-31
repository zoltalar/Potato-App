export default {
  methods: {
    imageIsCover(image) {
      return parseInt(image.cover) === 1
    },
    imageIsPrimary(image) {
      return parseInt(image.primary) === 1
    },
    filesize(model) {
      const size = this.$_.get(model, 'size', 0)
      return Math.round(size / 1024)
    },
    imageVariation(variations, name, key = null) {
      if (key) {
        name += '.' + key
      }
      return this.$_.get(variations, name)
    }
  }
}
