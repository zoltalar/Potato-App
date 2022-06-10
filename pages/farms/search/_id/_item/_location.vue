<template>
  <p>Search Results Page</p>
</template>
<script>
export default {
  name: 'PageFarmsSearch',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.search_results'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_search')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/search/:id/:item/:location',
      pl: '/gospodarstwa-rolne/szukaj/:id/:item/:location'
    }
  },
}
</script>
