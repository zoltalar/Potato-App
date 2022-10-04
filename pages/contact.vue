<template>
  <div class="contact">
    <page-title>
      {{ $t('phrases.contact_us') }}
    </page-title>
    <page-content-aside>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage () }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show=" ! $_.isEmpty(contact)">
          {{ $t('messages.contact_successful') }}
        </b-alert>
        <contact-form />
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageContact',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.contact_us'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_contact')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/contact',
      pl: '/kontakt'
    }
  },
  data: () => ({
    contact: {}
  }),
  methods: {
    listen () {
      this.$root.$on('contact', ({ contact }) => {
        this.contact = contact
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
