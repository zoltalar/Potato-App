<template>
  <b-card class="card-default" v-if="farm">
    <nuxt-link :to="farmEditOperatingHoursLink(farm)" class="link-edit" :title="$t('phrases.edit_operating_hours')" v-if="farmIsOwner(farm)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.operating_hours') }}</b-card-title>
    <b-card-text>
      <span v-if="farm.operating_hours">{{ farm.operating_hours }}</span>
      <span v-else> - </span>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'FarmOperatingHours',
  props: {
    farm: {
      type: Object,
      required: true
    }
  }
}
</script>
