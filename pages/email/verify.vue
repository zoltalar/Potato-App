<template>
  <div class="authentication verify">
    <page-title>
      {{ $t('phrases.verify_your_email_address') }}
    </page-title>
    <page-content>
      <b-alert variant="success" class="mb-0" :show="verified">
        {{ $t('messages.verification_successful_text') }}
        <nuxt-link :to="localePath({ name: 'account-farms' })" class="alert-link">{{ $t('phrases.continue') }}</nuxt-link>
      </b-alert>
      <b-alert variant="danger" class="mb-0" :show=" ! verified">
        {{ $t('messages.verification_failed') }}
        <nuxt-link :to="localePath({ name: 'account-farms' })" class="alert-link">{{ $t('phrases.continue') }}</nuxt-link>
      </b-alert>
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
  async asyncData({ query, $axios, $auth }) {
    const id = query.id
    const email = query.email
    if (id && email) {
      try {
        const response = await $axios.put(`/api/potato/email/verify/${id}/${email}`)
        const verified = (response.status === 204)
        if (verified) {
          $auth.fetchUser()
        }
        return { verified }
      } catch (error) {}
    }
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    verified: false
  })
}
</script>
