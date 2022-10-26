<template>
  <div class="farms create">
    <page-title>
      {{ $t('phrases.add_farmers_market') }}
    </page-title>
    <page-content-aside>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
        </b-alert>
        <market-create-form />
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageMarketsCreate',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.add_farmers_market'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_markets_add')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/create',
      pl: '/agromarkety/utworz'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  methods: {
    listen () {
      this.$root.$on('market-created', () => {
        this.$store.commit('flash/message', this.$t('messages.market_created'))
        this.$router.push(this.localePath({ name: 'account-markets' }))
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
