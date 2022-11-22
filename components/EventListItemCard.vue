<template>
  <b-card class="list-event-item" no-body>
    <b-card-body>
      <b-card-title class="h5 mb-1">{{ event.title }}</b-card-title>
      <ul class="list-meta mb-1">
        <li>
          {{ dateFormat(event.start_date) }}
        </li>
        <li>
          2:00 PM - 5:00 PM
        </li>
        <li>
          <b-badge pill variant="info">
            {{ eventStatusName(event.status) }}
          </b-badge>
        </li>
      </ul>
      <b-card-text v-if="event.description">
        <read-more-less :text="event.description" :chars="190" />
      </b-card-text>
      <slot name="links"></slot>
    </b-card-body>
    <b-card-footer>
      <small class="text-muted">
        {{
          $t('messages.event_footer', {
            date: shortDate(event.created_at, localeDateFormat()),
            time: shortTime(event.created_at),
            eventable: event.eventable.name
          })
        }}
      </small>
    </b-card-footer>
  </b-card>
</template>
<script>
export default {
  name: 'EventListItemCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
