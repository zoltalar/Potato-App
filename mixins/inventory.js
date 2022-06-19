export default {
  methods: {
    inventoryName (inventory) {
      let name = inventory.name
      if (inventory.translations) {
        const translation = this.$_.head(inventory.translations)
        if (!this.$_.isEmpty(translation)) {
          name = translation.name
        }
      }
      return name
    }
  }
}
