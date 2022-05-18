<template>
  <b-card v-if="farm">
    <b-card-title class="h5">{{ farm.name }}</b-card-title>
    <b-card-sub-title class="mb-2" v-if="farmIsNameable(farm)">{{ fullName(farm, true) }}</b-card-sub-title>
    <b-card-text v-if="farm.description">
      <char-limit :text="farm.description" :chars="200" />
    </b-card-text>
    <slot name="links"></slot>
  </b-card>
</template>
<script>
export default {
  name: 'FarmListItem',
  props: {
    farm: {
      type: Object,
      required: true
    }
  }
}
</script>
