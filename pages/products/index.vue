<template>
  <div class="products index">
    <page-title>
      {{ $t('phrases.products') }}
    </page-title>
    <page-content>
      <template>
        <div class="category-products" v-for="(categoryProducts, categoryName, i) in products" :key="'category-product-' + i">
          <h6>{{ categoryName }}</h6>
          <ul>
            <li v-for="(id, inventoryName, j) in categoryProducts" :key="'category-product-item-' + i + '-' + j">
              <nuxt-link :to="localePath({ name: 'products-show-id-name', params: { id, name: slugify(inventoryName) }})">{{ inventoryName }}</nuxt-link>
            </li>
          </ul>
        </div>
      </template>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageProductsIndex',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.products'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_products')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/products',
      pl: '/produkty'
    }
  },
  data: () => ({
    inventory: []
  }),
  computed: {
    products () {
      const inventory = this.inventory
      return this.categoryProducts(inventory)
    }
  },
  methods: {
    fetch () {
      this
        .$axios
        .get('/api/potato/inventory/index', {
          params: {
            limit: 1000
          }
        })
        .then((result) => {
          this.inventory = this.$_.get(result, 'data.data', [])
        })
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
