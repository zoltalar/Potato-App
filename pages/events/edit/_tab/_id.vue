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
  })
}
</script>
