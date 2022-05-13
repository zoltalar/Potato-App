<template>
  <b-card v-if="farm">
    <b-card-title class="h5">{{ farm.name }}</b-card-title>
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
