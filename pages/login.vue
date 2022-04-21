<template>
  <div class="authentication login">
    <page-title>
      {{ $t('phrases.login') }}
    </page-title>
    <page-content>
      Login
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageLogin',
  layout: 'default',
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/login',
      pl: '/logowanie'
    }
  }
}
</script>
