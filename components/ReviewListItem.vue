<template>
  <div class="review">
    <h6 class="mb-2">{{ review.title }}</h6>
    <b-form-rating variant="warning" class="p-0 mb-2" :value="review.rating" no-border inline readonly />
    <div class="mb-2" v-if="review.content">
      <read-more-less :text="review.content" :chars="280" />
    </div>
    <div class="small text-muted">
      {{
        $t('messages.farm_review_footer', {
          date: shortDate(review.created_at, localeDateFormat()),
          time: shortTime(review.created_at),
          user: fullName(review.user, true)
        })
      }}
    </div>
  </div>
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
