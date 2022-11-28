<template>
  <div class="account events">
    <page-title>
      {{ $t('phrases.events') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
          <nuxt-link :to="localePath({ name: 'email-verify' })" class="alert-link" v-if="isCurrentUserHasUnverifiedEmailFlashErrorMessage()">{{ $t('phrases.verify') }}</nuxt-link>
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div class="list-events" v-if="events.length > 0">
          <p v-html="$t('messages.account_events')"></p>
          <event-list-item-card class="mb-4" :event="occurrence" v-for="(occurrence, i) in pagedEvents" :key="'event-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'events-edit-tab-id', params: { tab: localeEventEditTab('general') , id: occurrence.id } })" class="card-link">{{ $t('phrases.edit') }}</nuxt-link>
              <a :href="localePath({ name: 'account-events' })" class="card-link" @click.prevent="destroy(occurrence)">{{ $t('phrases.delete') }}</a>
              <nuxt-link :to="localePath({ name: 'events-show-title-id', params: { title: slugify(occurrence.title), id: occurrence.id } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
            </template>
          </event-list-item-card>
          <b-pagination
            class="mb-4"
            v-model="pagination.currentPage"
            :items="events"
            :total-rows="events.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div class="mb-4" v-else>
          <p v-html="$t('messages.account_events_empty')"></p>
        </div>
        <nuxt-link :to="localePath({ name: 'events-create' })" class="btn btn-primary btn-lg">{{ $t('phrases.add_event') }}</nuxt-link>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountEvents',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.events'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_events')
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/potato/account/events')
      return { events: response.data.data }
    } catch(error) {}
  },
  data: () => ({
    events: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    pagedEvents () {
      const events = this.events
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return events.slice(start, end)
    }
  },
  methods: {
    destroy (event) {
      const message = this.$t('messages.confirm_destroy')
      if (confirm(message)) {
        this
          .$axios
          .delete(`/api/potato/events/${event.id}`)
          .then((response) => {
            if (response.status === 204) {
              this.$store.commit('flash/message', this.$t('messages.event_deleted'))
              this.$nuxt.refresh()
            }
          })
      }
    }
  },
  mounted() {
    this.currentUserHasUnverifiedEmailFlashErrorMessage()
  }
}
</script>
