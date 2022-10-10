<template>
  <div class="products index">
    <page-title>
      {{ $t('phrases.products') }}
    </page-title>
    <page-content>
      <template>
        <div>
          <div class="category-products" v-for="(products, categoryName, i) in inventory" :key="'category-product-' + i">
            <h2 class="h6">{{ categoryName }}</h2>
            <ul>
              <li v-for="(inventoryId, inventoryName, j) in products" :key="'category-product-item-' + i + '-' + j">
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
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/potato/categories/inventory')
      return { inventory: response.data }
    } catch (error) {}
  },
  data: () => ({
    inventory: {},
    id: null,
    name: ''
  }),
  methods: {
    sidebar (id, name) {
      this.id = id
      this.name = name

      this.$root.$emit('bv::toggle::collapse', 'sidebar-product')
    }
  }
}
</script>
