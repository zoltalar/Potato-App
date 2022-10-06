<template>
  <div id="reviews" class="reviews">
    <h2 class="h6 mb-3">
      {{ $t('phrases.reviews') }}
      ({{ reviews.length }})
    </h2>
    <div v-if="hasReviews()">
      <div class="list-reviews" v-for="(review, i) in pagedReviews" :key="'review-' + i">
        <review-list-item class="mb-4" :review="review" />
        <hr v-if="i < pagedReviews.length - 1" />
      </div>
      <b-pagination
        v-model="pagination.currentPage"
        :items="reviews"
        :total-rows="reviews.length"
        :per-page="pagination.perPage"
      />
    </div>
    <p v-else>{{ $t('phrases.no_reviews') }}.</p>
  </div>
</template>
<script>
export default {
  name: 'ReviewableReviews',
  props: {
    reviewable: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    pagination: {
      currentPage: 1,
      perPage: 3
    }
  }),
  computed: {
    pagedReviews () {
      const reviews = this.reviews
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return reviews.slice(start, end)
    },
    reviews () {
      const reviewable = this.reviewable
      return this.$_.get(reviewable, 'reviews', [])
    }
  },
  methods: {
    hasReviews () {
      return this.reviews.length > 0
    }
  }
}
</script>
