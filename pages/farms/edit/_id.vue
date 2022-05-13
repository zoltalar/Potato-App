<template>
  <div class="farms create">
    <page-title>
      {{ $t('phrases.edit_farm') }}
    </page-title>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsEdit',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.edit_farm'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_edit')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/edit/:id',
      pl: '/gospodarstwa-rolne/edytuj/:id'
    }
  }
}
</script>
