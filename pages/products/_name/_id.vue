<template>
  <b-sidebar :title="inventoryName(item)" id="sidebar-product" backdrop backdrop-variant="secondary" no-close-on-route-change>
    <template>
      <inventory-details :id="item.id" :name="inventoryName(item)" />
    </template>
  </b-sidebar>
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
      en: '/products/:name/:id',
      pl: '/produkty/:name/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      let response = await $axios.get(`/api/potato/inventory/show/${id}`)
      const item = response.data.data
      return { item }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    item: {}
  }),
  watch: {
    '$route': {
      handler () {
        this.toggle()
      },
      immediate: true
    }
  },
  methods: {
    toggle () {
      this.$root.$emit('bv::toggle::collapse', 'sidebar-product')
    }
  },
  mounted() {
    this.toggle()
  }
}
</script>
