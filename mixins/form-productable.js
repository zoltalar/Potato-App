export default {
  props: {
    productable: {
      type: Object,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    inventory: {},
    products: []
  }),
  watch: {
    productable: {
      handler (productable) {
        this.products = this.$_.get(productable, 'products', [])
      },
      immediate: true
    }
  },
  methods: {
    fetch () {
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
    productIndex (id) {
      return this.$_.findIndex(this.products, { id })
    },
    save () {
      const products = this.products
      this
        .$axios
        .post(this.uri(), { products })
        .then((response) => {
          this.setErrors(response)
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
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
    uri () {
      const type = this.type
      const productable = this.productable
      return `/api/potato/products/save/${type}/${productable.id}`
    }
  }
}
