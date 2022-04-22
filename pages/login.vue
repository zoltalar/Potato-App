<template>
  <div class="authentication login">
    <page-title>
      {{ $t('phrases.login') }}
    </page-title>
    <page-content>
      <login-form />
      <div class="text-center">
        {{ $t('phrases.dont_have_an_account?') }}
        <nuxt-link :to="localePath('register')">{{ $t('phrases.to_register') }}</nuxt-link>
      </div>
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
