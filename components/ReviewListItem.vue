<template>
  <b-card class="list-review-item" no-body>
    <b-card-body>
      <b-card-title class="h5 mb-2">{{ review.title }}</b-card-title>
      <b-form-rating variant="warning" class="p-0 mb-2" :value="review.rating" no-border inline readonly />
      <b-card-text v-if="review.content">
        <read-more-less :text="review.content" :chars="280" />
      </b-card-text>
      <slot name="links"></slot>
    </b-card-body>
    <slot name="footer"></slot>
  </b-card>
</template>
<script>
export default {
  name: 'ReviewListItem',
  props: {
    review: {
      type: Object,
      required: true
    }
  }
}
</script>
