export default {
  methods: {
    categoryName (category) {
      let name = category.name
      if (category.translations) {
        const translation = this.$_.head(category.translations)
        if (!this.$_.isEmpty(translation)) {
          name = translation.name
        }
      }
      return name
    }
  }
}
