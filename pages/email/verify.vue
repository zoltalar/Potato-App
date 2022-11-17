<template>
  <div class="authentication verify">
    <page-title>
      {{ $t('phrases.verify_your_email_address') }}
    </page-title>
    <page-content>
      <div v-if="$_.isNil($auth.user.email_verified_at)">
        <b-alert variant="danger" :show="verified === false">
          {{ $t('messages.verification_failed') }}
        </b-alert>
        <b-alert variant="success" :show="resent" dismissible>
          {{ $t('messages.verification_resent_text') }}
        </b-alert>
        <p v-html="$t('messages.verification_text')"></p>
        <email-resend-form class="mb-4" />
        <p v-html="$t('messages.verification_sent_text')"></p>
        <email-verify-form />
      </div>
      <div v-else>
        <b-alert variant="success" class="mb-0" show>
          {{ $t('messages.verification_successful_text') }}
          <nuxt-link :to="localePath({ name: 'account-farms' })" class="alert-link">{{ $t('phrases.continue') }}</nuxt-link>
        </b-alert>
      </div>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageEmailVerify',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.verify_your_email_address'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_email_verify')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/email/verify',
      pl: '/email/weryfikuj'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    resent: false,
    verified: null
  }),
  methods: {
    listen () {
      this.$root.$on('verification-sent', (bool) => {
        this.resent = bool
      })
      this.$root.$on('verified', (bool) => {
        this.verified = bool
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
