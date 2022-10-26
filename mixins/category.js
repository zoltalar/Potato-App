export default {
  methods: {
    categoryCollection () {
      return this.$store.getters['category/collection']
    },
    categoryName (category) {
      let name = category.name
      if (category.translations) {
        const translation = this.$_.head(category.translations)
        if (!this.$_.isEmpty(translation)) {
          name = translation.name
        }
      }
      return name
    },
    categoryNames () {
      const categories = this.$_.sortBy(this.categoryCollection(), ['category.list_order'])
      return categories.map((category) => {
        return this.categoryName(category)
      })
    },
    async refreshCategoryCollection () {
      return await this.$store.dispatch('category/collection')
    }
  }
}
