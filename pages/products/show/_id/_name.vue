<template>
  <div class="products show">
    <page-title>
      Product Name
    </page-title>
  </div>
</template>
<script>
export default {
  name: 'PageProductsShow',
  layout: 'default',
  head () {
    return {
      title: 'Product Name',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_products_show')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/products/show/:id/:name',
      pl: '/produkty/pokaz/:id/:name'
    }
  },
}
</script>
