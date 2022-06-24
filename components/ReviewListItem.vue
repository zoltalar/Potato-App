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
    <b-card-footer>
      <small class="text-muted">
        {{
          $t('messages.review_footer', {
            date: shortDate(review.created_at, localeDateFormat()),
            time: shortTime(review.created_at),
            rateable: review.rateable.name
          })
        }}
      </small>
    </b-card-footer>
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
