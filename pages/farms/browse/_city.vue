<template>
  <div class="farms browse">
    <page-title>
      {{ $t('messages.page_title_farms_browse', { location: city }) }}
    </page-title>
    <page-content-aside>
      <template>
        Test
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsBrowse',
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_farms_browse', { location: this.city }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_browse', { location: this.city })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/browse/:city',
      pl: '/gospodarstwa-rolne/przegladaj/:city'
    }
  },
  computed: {
    city () {
      return this.$route.params.city
    }
  }
}
</script>
