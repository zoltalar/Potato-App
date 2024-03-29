<template>
  <div class="events show" v-if="eventNotEmpty(event)">
    <page-title>
      {{ event.title }}
    </page-title>
    <page-aside-content :col-aside="{ md: 4, lg: 4 }" :col-main="{ md: 8, lg: 8 }">
      <template v-slot:aside>
        <event-buttons-menu :event="event" />
        <event-general-information :event="event" class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="!eventApproved(event)">
          {{ $t('messages.event_unapproved') }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <event-description :event="event" class="mb-4" />
        <event-organizer :event="event" />
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageEventsShow',
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_events_show', { title: this.event.title }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_events_show', { title: this.event.title }) },
        { hid: 'og:title', name: 'og:title', content: this.$t('messages.page_title_events_show', { title: this.event.title }) },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_events_show', { title: this.event.title }) },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ]
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/events/:title/:id',
      pl: '/wydarzenia/:title/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      const response = await $axios.get(`/api/potato/events/show/${id}`)
      return { event: response.data.data }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    event: {}
  }),
  watch: {
    event: {
      handler (event) {
        if (this.$_.isEmpty(event)) {
          this.$router.push(this.localePath({ name: 'index' }))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    listen () {
      this.$root.$on('message-created', () => {
        this.$store.commit('flash/message', this.$t('messages.message_sent'))
      })
    }
  },
  created() {
    this.listen()
  }
}
</script>
