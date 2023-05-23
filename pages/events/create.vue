<template>
  <div class="events create">
    <page-title>
      {{ $t('phrases.add_event') }}
    </page-title>
    <page-content-aside>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
        </b-alert>
        <event-create-form />
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageEventsCreate',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.add_event'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_events_add') },
        { hid: 'og:title', name: 'og:title', content: this.$t('phrases.add_event') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_events_add') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/events/create',
      pl: '/wydarzenia/utworz'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  methods: {
    listen () {
      this.$root.$on('event-created', () => {
        this.$store.commit('flash/message', this.$t('messages.event_created'))
        this.$router.push(this.localePath({ name: 'account-events' }))
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
