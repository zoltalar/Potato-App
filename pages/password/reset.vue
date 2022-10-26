<template>
  <div class="password reset">
    <page-title>
      {{ $t('phrases.password_reset') }}
    </page-title>
    <page-content>
      <b-alert class="mb-4" variant="success" :show="hasMessage()">
        {{ message }}
      </b-alert>
      <password-reset-form />
      <div class="text-center">
        {{ $t('phrases.already_have_an_account?') }}
        <nuxt-link :to="localePath({ name: 'login' })">{{ $t('phrases.to_login') }}</nuxt-link>
      </div>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PagePasswordReset',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.password_reset'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_password_reset')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/password/reset',
      pl: '/haslo/reset'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    message: ''
  }),
  methods: {
    hasMessage () {
      return this.message !== ''
    },
    listen () {
      this.$root.$on('password-reset', (message) => {
        this.message = message
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
