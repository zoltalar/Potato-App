<template>
  <div class="products index">
    <page-title>
      {{ $t('phrases.products') }}
    </page-title>
    <page-content>
      <template>
        <div>
          <div class="category-products" v-for="(categoryProducts, categoryName, i) in products" :key="'category-product-' + i">
            <h6>{{ categoryName }}</h6>
            <ul>
              <li v-for="(inventoryId, inventoryName, j) in categoryProducts" :key="'category-product-item-' + i + '-' + j">
                <a :href="localePath({ name: 'products' })" @click.prevent="sidebar(inventoryId, inventoryName)">{{ inventoryName }}</a>
              </li>
            </ul>
          </div>
          <b-sidebar id="sidebar-product" backdrop backdrop-variant="secondary">
            <template>
              <inventory-details :id="id" :name="name" />
            </template>
          </b-sidebar>
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
    inventory: [],
    id: null,
    name: ''
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
    },
    sidebar (id, name) {
      this.id = id
      this.name = name

      this.$root.$emit('bv::toggle::collapse', 'sidebar-product')
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
