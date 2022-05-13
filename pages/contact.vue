<template>
  <div class="contact">
    <page-title>
      {{ $t('phrases.contact_us') }}
    </page-title>
  </div>
</template>
<script>
export default {
  name: 'PageContact',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.contact_us'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_contact')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/contact',
      pl: '/kontakt'
    }
  }
}
</script>
