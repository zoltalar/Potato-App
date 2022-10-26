<template>
  <div class="authentication login">
    <page-title>
      {{ $t('phrases.login') }}
    </page-title>
    <page-content>
      <login-form />
      <div class="text-center">
        {{ $t('phrases.dont_have_an_account?') }}
        <nuxt-link :to="localePath({ name: 'register' })">{{ $t('phrases.to_register') }}</nuxt-link>
        <br />
        <nuxt-link :to="localePath({ name: 'password-reset' })">{{ $t('phrases.forgot_password?') }}</nuxt-link>
      </div>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageLogin',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.login'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_login')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/login',
      pl: '/logowanie'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  mounted() {
    this.loggedInRedirect()
  }
}
</script>
