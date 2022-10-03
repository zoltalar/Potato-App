<template>
  <div class="authentication verify">
    <page-title>
      {{ $t('phrases.verify_your_email_address') }}
    </page-title>
    <page-content>
      <b-alert variant="success" :show="verified">
        {{ $t('messages.verification_successful_text') }}
        <nuxt-link :to="localePath('/account/farms')" class="alert-link">{{ $t('phrases.continue') }}</nuxt-link>
      </b-alert>
      <p v-if=" ! verified">{{ $t('phrases.verifying') }}...</p>
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
      en: '/email/verify/:id/:email',
      pl: '/email/weryfikuj/:id/:email'
    }
  },
  data: () => ({
    verified: false
  }),
  watch: {
    '$route': {
      handler () {
        this.verify()
      },
      immediate: true
    }
  },
  methods: {
    verify () {
      const id = this.$route.params.id
      const email = this.$route.params.email

      this
        .$axios
        .put(`/api/potato/email/verify/${id}/${email}`)
        .then((response) => {
          if (response.status === 204) {
            this.verified = true
            this.$auth.fetchUser()
          }
        })
    }
  }
}
</script>
