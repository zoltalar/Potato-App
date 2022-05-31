<template>
  <div class="authentication verify">
    <page-title>
      {{ $t('phrases.verify_your_email_address') }}
    </page-title>
    <page-content>
      <div v-if="$_.isNil($auth.user.email_verified_at)">
        <b-alert variant="success" :show="resent" dismissible>
          {{ $t('messages.verification_resent_text') }}
        </b-alert>
        <p>{{ $t('messages.verification_text') }}</p>
        <email-resend-form />
      </div>
      <div v-else>
        <b-alert variant="success" show>
          {{ $t('messages.verified_text') }}
        </b-alert>
      </div>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageEmailResend',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.verify_your_email_address'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_email_resend')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/email/resend',
      pl: '/email/wyslij'
    }
  },
  data: () => ({
    resent: false
  }),
  methods: {
    listen () {
      this.$root.$on('verification-sent', (bool) => {
        this.resent = bool
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
