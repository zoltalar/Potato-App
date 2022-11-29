<template>
  <div id="events" class="events">
    <h2 class="h6 mb-3">
      {{ $t('phrases.upcoming_events') }}
      ({{ events.length }})
    </h2>
    <div v-if="hasEvents()">
      <ul class="list-square">
        <li v-for="(event, i) in pagedEvents" :key="'eventable-event-' + i">
          <nuxt-link :to="localePath({ name: 'events-show-title-id', params: { title: slugify(event.title), id: event.id } })">{{ event.title }}</nuxt-link>
          <small class="text-muted ml-1" v-if="isValidDate(event.start_date) || isValidDate(event.end_date)">{{ dateRange(event.start_date, event.end_date) }}</small>
        </li>
      </ul>
      <b-pagination
        v-model="pagination.currentPage"
        :items="events"
        :total-rows="events.length"
        :per-page="pagination.perPage"
      />
    </div>
    <p v-else>{{ $t('phrases.no_events') }}.</p>
  </div>
</template>
<script>
export default {
  name: 'EventableEvents',
  props: {
    eventable: {
      type: Object,
      required: true
    }
  },
  data: () => ({
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
    },
    events () {
      const eventable = this.eventable
      return this.$_.get(eventable, 'events', [])
    }
  },
  methods: {
    hasEvents () {
      return this.events.length > 0
    }
  }
}
</script>
