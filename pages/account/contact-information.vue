<template>
  <div class="account home">
    <page-title>
      {{ $t('phrases.contact_information') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        Test
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountContactInformation',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.contact_information'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_contact_information')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/account/contact-information',
      pl: '/konto/dane-kontaktowe'
    }
  }
}
</script>
