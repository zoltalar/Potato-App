<template>
  <div class="password change">
    <page-title>
      {{ $t('phrases.password_change') }}
    </page-title>
    <page-content>
      <password-change-form />
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PagePasswordChange',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.password_change'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_password_change')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/password/change',
      pl: '/haslo/zmiana'
    }
  }
}
</script>
