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
                <nuxt-link :to="localePath({ name: 'products-name-id', params: { name: slugify(inventoryName), id: inventoryId } })">{{ inventoryName }}</nuxt-link>
              </li>
            </ul>
          </div>
          <nuxt-child />
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
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_products') },
        { hid: 'og:title', name: 'og:title', content: this.$t('phrases.products') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_products') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
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
      const response = await $axios.get('/api/potato/inventory/categories')
      return { inventory: response.data }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    inventory: {}
  })
}
</script>
