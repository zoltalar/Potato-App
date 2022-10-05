<template>
  <div class="cities show">
    <page-title>
      Rzeszow
    </page-title>
  </div>
</template>
<script>
export default {
  name: 'PageCitiesShow',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.cities'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_cities')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/cities/show/:id/:name',
      pl: '/miasta/pokaz/:id/:name'
    }
  }
}
</script>
