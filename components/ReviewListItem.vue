<template>
  <div class="review">
    <h6 class="mb-2">{{ review.title }}</h6>
    <b-form-rating variant="warning" class="p-0 mb-2" :value="review.rating" no-border inline readonly />
    <div class="mb-2" v-if="review.content">
      <read-more-less :text="review.content" :chars="280" />
    </div>
    <slot name="links"></slot>
    <div class="small text-muted">
      {{
        $t('messages.model_footer', {
          date: shortDate(review.created_at, localeDateFormat()),
          time: shortTime(review.created_at),
          user: fullName(review.user, true)
        })
      }}
    </div>
    <div class="comments review-comments" v-if="hasComments()">
      <h4 class="h6 mb-2">{{ $t('phrases.comments_to_this_review') }}</h4>
      <comment-list-item :comment="comment" class="mb-4" v-for="(comment, j) in comments" :key="'comment-' + j" />
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
  },
  computed: {
    comments () {
      const review = this.review
      return this.$_.get(review, 'comments', [])
    }
  },
  methods: {
    hasComments () {
      return this.comments.length > 0
    }
  }
}
</script>
