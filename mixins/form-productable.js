export default {
  data: () => ({
    inventory: {},
    products: []
  }),
  methods: {
    fetchInventory () {
      this
        .$axios
        .get('/api/potato/inventory/index', {
          params: { limit: 100 }
        })
        .then((response) => {
          let inventory = this.$_.get(response, 'data.data', [])
          inventory = this.$_.sortBy(inventory, [
            'category.list_order',
            'translations[0].name'
          ])
          inventory = this.$_.groupBy(inventory, (item) => {
            return this.categoryName(item.category)
          })
          this.inventory = inventory
        })
    },
    hasProduct (id) {
      const products = this.products
      const product = this.$_.find(products, { id })
      return !this.$_.isNil(product)
    },
    toggleProduct (id) {
      if (this.hasProduct(id)) {
        this.$delete(this.products, this.productIndex(id))
      } else {
        const product = {
          id,
          spring: 0,
          summer: 0,
          fall: 0,
          winter: 0,
          amount: '',
          unit: null
        }
        this.products.push(product)
      }
    },
    productIndex (id) {
      return this.$_.findIndex(this.products, { id })
    }
  }
}
