export default {
  methods: {
    productableOptions (defaultOption = false) {
      const options = []
      if (defaultOption) {
        options.push({
          text: '',
          value: null
        })
      }
      options.push({
        text: this.$t('phrases.farms'),
        value: 'farms'
      })
      return options
    },
    productInventory (products) {
      products = this.$_.groupBy(products, (product) => {
        return this.categoryName(product.inventory.category)
      })
      const inventory = {}
      this.$_.forEach(products, (products, categoryName) => {
        this.$_.forEach(products, (product) => {
          const attributes = [
            'spring',
            'summer',
            'fall',
            'winter'
          ]
          this.$_.forEach(attributes, (attribute) => {
            if (product[attribute] === 1) {
              if (this.$_.isNil(inventory[attribute])) {
                inventory[attribute] = {}
              }
              if (this.$_.isNil(inventory[attribute][categoryName])) {
                inventory[attribute][categoryName] = []
              }
              inventory[attribute][categoryName].push(this.inventoryName(product.inventory))
            }
          })
        })
      })
      return inventory
    }
  }
}
