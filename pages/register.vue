<template>
  <div class="authentication register">
    <page-title>
      {{ $t('phrases.register') }}
    </page-title>
    <page-content-aside>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage () }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show=" ! $_.isEmpty(user)">
          {{ $t('messages.registration_successful') }}
          <nuxt-link :to="localePath({ name: 'login' })" class="alert-link">{{ $t('phrases.to_login') }}</nuxt-link>
        </b-alert>
        <register-form />
      </template>
      <template v-slot:aside>
        <span class="circle">
          <font-awesome-icon icon="list" />
        </span>
        <h4>{{ $t('phrases.why_register?') }}</h4>
        <div class="list">
          <div class="list-item" v-for="(reason, i) in reasons()">
            <span class="circle circle-light-gray">
              {{ (i + 1) }}
            </span>
            <div class="list-item-center">
              <p>{{ reason.text }}</p>
            </div>
          </div>
        </div>
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageRegister',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.register'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_register') },
        { hid: 'og:title', name: 'og:title', content: this.$t('phrases.register') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_register') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/register',
      pl: '/rejestracja'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    user: {}
  }),
  methods: {
    listen () {
      this.$root.$on('register', ({ user }) => {
        this.user = user
      })
    },
    reasons () {
      return [
        { text: this.$t('messages.why_register_reason_1') },
        { text: this.$t('messages.why_register_reason_2') },
        { text: this.$t('messages.why_register_reason_3') }
      ]
    }
  },
  mounted() {
    this.listen()
    this.loggedInRedirect()
  }
}
</script>
