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
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage () }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <p class="mb-4">{{ $t('messages.account_contact_information') }}</p>
        <b-row>
          <b-col md="6">
            <user-contact-information-form />
          </b-col>
        </b-row>
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
  },
  methods: {
    listen () {
      this.$root.$on('user-contact-information-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.user_contact_information_updated'))
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
