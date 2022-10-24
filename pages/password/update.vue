<template>
  <div class="password change">
    <page-title>
      {{ $t('phrases.password_update') }}
    </page-title>
    <page-content>
      <b-alert class="mb-4" variant="success" :show="hasMessage()">
        {{ message }}
        <nuxt-link :to="localePath({ name: 'login' })" class="alert-link">{{ $t('phrases.login') }}</nuxt-link>
      </b-alert>
      <password-update-form />
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PagePasswordUpdate',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.password_update'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_password_update')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/password/update',
      pl: '/haslo/aktualizacja'
    }
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
  mounted() {
    this.listen()
  }
}
</script>
