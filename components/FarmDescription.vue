<template>
  <div class="description">
    <h2 class="h6 mb-3">
      {{ $t('phrases.description') }}
      <nuxt-link :to="farmEditDescriptionLink(farm)" class="link-edit" :title="$t('phrases.edit_description')" v-if="farmIsOwner(farm)">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
    </h2>
    <read-more-less :chars="550" :text="farm.description" />
  </div>
</template>
<script>
export default {
  name: 'FarmDescription',
  props: {
    farm: {
      type: Object,
      required: true
    }
  }
}
</script>
