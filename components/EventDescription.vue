<template>
  <div class="description">
    <h2 class="h6 mb-3">
      {{ $t('phrases.description') }}
      <nuxt-link :to="eventEditDescriptionLink(event)" class="link-edit" :title="$t('phrases.edit_description')" v-if="eventIsOwner(event)">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
    </h2>
    <read-more-less :chars="550" :text="event.description" />
  </div>
</template>
<script>
export default {
  name: 'EventDescription',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
