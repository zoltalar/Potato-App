export default {
  methods: {
    categoryProducts (inventory) {
      inventory = this.$_.groupBy(inventory, (item) => {
        return this.categoryName(item.category)
      })
      const products = {}
      this.$_.forEach(inventory, (categoryProducts, categoryName) => {
        this.$_.forEach(categoryProducts, (product) => {
          if (this.$_.isNil(products[categoryName])) {
            products[categoryName] = {}
          }
          const inventoryName = this.inventoryName(product)
          if (this.$_.isNil(products[categoryName][inventoryName])) {
            products[categoryName][inventoryName] = product.id
          }
        })
      })
      return products
    },
    productableOptions (defaultOption = false) {
      const options = []
      const types = ['farms', 'markets']
      if (defaultOption) {
        options.push({
          text: '',
          value: null
        })
      }
      this.$_.forEach(types, (type) => {
        options.push({
          text: this.$t('phrases.' + type),
          value: type
        })
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
                inventory[attribute][categoryName] = {}
              }
              const itemName = this.inventoryName(product.inventory)
              if (this.$_.isNil(inventory[attribute][categoryName][itemName])) {
                inventory[attribute][categoryName][itemName] = []
              }
              inventory[attribute][categoryName][itemName] = product.inventory_id
            }
          })
        })
      })
      return inventory
    }
  }
}
