<template>
  <div class="description">
    <h6 class="mb-3">{{ $t('phrases.description') }}</h6>
    <span v-html="nl2br(farm.description)"></span>
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
