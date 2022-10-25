<template>
  <div class="products index">
    <page-title>
      {{ inventoryName(item) }}
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
          <b-sidebar id="sidebar-product" visible shadow>
            <template>
              <inventory-details :id="item.id" :name="inventoryName(item)" />
            </template>
          </b-sidebar>
        </div>
      </template>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageProductsShow',
  layout: 'default',
  head () {
    return {
      title: this.inventoryName(this.item),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_product', { item: this.inventoryName(this.item)})
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/product/:name/:id',
      pl: '/produkt/:name/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      let response = await $axios.get('/api/potato/inventory/categories')
      const inventory = response.data
      response = await $axios.get(`/api/potato/inventory/show/${id}`)
      const item = response.data.data
      return { inventory, item }
    } catch (error) {}
  },
  data: () => ({
    inventory: {},
    item: {}
  })
}
</script>
