<template>
  <b-card class="list-event-item" no-body>
    <b-card-body>
      <b-card-title class="h5 mb-1">{{ event.title }}</b-card-title>
      <ul class="list-meta mb-1">
        <li v-if="isValidDate(event.start_date) || isValidDate(event.end_date)">
          {{ dateRange(event.start_date, event.end_date) }}
        </li>
        <li v-if="isValidTime(event.start_time) || isValidTime(event.end_time)">
          {{ timeRange(event.start_time, event.end_time) }}
        </li>
        <li v-if="hasAddress()">
          {{ addressLine(address, ',', ['city', 'state']) }}
        </li>
        <li v-if="status">
          <b-badge class="text-uppercase" :variant="eventStyle(event)" pill>
            {{ eventStatusName(event.status) }}
          </b-badge>
        </li>
      </ul>
      <b-card-text v-if="event.description">
        <char-limit :text="event.description" :chars="190" :ellipsis="true" />
      </b-card-text>
      <slot name="links"></slot>
    </b-card-body>
    <slot name="footer"></slot>
  </b-card>
</template>
<script>
export default {
  name: 'EventListItemCard',
  props: {
    event: {
      type: Object,
      required: true
    },
    status: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    address () {
      const event = this.event
      return this.addressableAddress(event)
    }
  },
  methods: {
    hasAddress () {
      return ! this.$_.isNil(this.address)
    }
  }
}
</script>
