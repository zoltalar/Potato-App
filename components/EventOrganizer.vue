<template>
  <div class="organizer">
    <h2 class="h6 mb-1">
      {{ $t('phrases.organizer') }}
    </h2>
    <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(event.eventable.name), id: event.eventable_id } })" v-if="event.eventable_type === 'farm'">{{ event.eventable.name }}</nuxt-link>
    <nuxt-link :to="localePath({ name: 'markets-show-name-id', params: { name: slugify(event.eventable.name), id: event.eventable_id } })" v-else-if="event.eventable_type === 'market'">{{ event.eventable.name }}</nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'EventOrganizer',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
