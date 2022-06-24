<template>
  <div id="reviews" class="reviews" v-if="hasReviews()">
    <h6 class="mb-3">{{ $t('phrases.reviews') }}</h6>
    <div class="review-wrap" v-for="(review, i) in pagedReviews" :key="'review-' + i">
      <review class="mb-4" :review="review" />
      <hr v-if="i < pagedReviews.length - 1" />
    </div>
    <b-pagination
      v-model="pagination.currentPage"
      :items="reviews"
      :total-rows="reviews.length"
      :per-page="pagination.perPage"
    />
  </div>
</template>
<script>
export default {
  name: 'FarmReviews',
  props: {
    farm: {
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
      const farm = this.farm
      return this.$_.get(farm, 'reviews', [])
    }
  },
  methods: {
    hasReviews () {
      return this.reviews.length > 0
    }
  }
}
</script>
