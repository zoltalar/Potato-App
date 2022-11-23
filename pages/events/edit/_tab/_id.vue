<template>
  <div class="events edit">
    <page-title>
      {{ $t('phrases.edit_event') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <event-edit-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage () }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="eventEditTab() === 'general'">
          <h5 class="mb-4">{{ $t('phrases.general_information') }}</h5>
          <b-row>
            <b-col md="6">
              <event-general-information-form :edited-event="event" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="eventEditTab() === 'description'">
          <h5 class="mb-4">{{ $t('phrases.description') }}</h5>
          <event-description-form :edited-event="event" />
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageEventsEdit',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.edit_event'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_events_edit')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/events/edit/:tab/:id',
      pl: '/wydarzenia/edytuj/:tab/:id'
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
        if (this.$_.isEmpty(event) || !this.eventIsOwner(event)) {
          this.$router.push(this.localePath({ name: 'account-events' }))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    listen () {
      this.$root.$off('event-general-information-updated')
      this.$root.$off('event-description-updated')

      this.$root.$on('event-general-information-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.event_general_information_updated'))
      })
      this.$root.$on('event-description-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.event_description_updated'))
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
