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
    inventory: {}
  }),
  computed: {
    products () {
      const productable = this.productable
      return this.$_.get(productable, 'products', [])
    }
  },
  watch: {
    productable: {
      handler () {
        this.fetch()
      },
      immediate: true
    }
  },
  methods: {
    fetch () {
      const type = this.type
      const productable = this.productable
      this
        .$axios
        .get('/api/potato/inventory/index', {
          params: {
            limit: 500,
            type,
            productable_id: productable.id
          }
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
      const product = this.$_.find(products, { inventory_id: id })
      return !this.$_.isNil(product)
    },
    productIndex (id) {
      return this.$_.findIndex(this.products, { inventory_id: id })
    },
    save () {
      let products = this.products
      const type = this.type
      this
        .$axios
        .post(this.uri(), { products })
        .then((response) => {
          this.setErrors(response)
          products = this.$_.get(response, 'data.data')
          if (this.$_.isArray(products)) {
            this.$root.$emit(type + '-products-saved', { products })
          }
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
          inventory_id: id,
          spring: 0,
          summer: 0,
          fall: 0,
          winter: 0,
          amount: '',
          amount_unit: null,
          price: '',
          currency_id: null,
          price_unit: null
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
