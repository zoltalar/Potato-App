<template>
  <div class="reviews">
    <h6 class="mb-3" id="reviews">{{ $t('phrases.reviews') }}</h6>
    <review-list-item class="mb-4" :review="review" v-for="(review, i) in pagedReviews" :key="'review-list-item-' + i">
      <template v-slot:footer>
        <b-card-footer>
          <small class="text-muted">
            {{
              $t('messages.farm_review_footer', {
                date: shortDate(review.created_at, localeDateFormat()),
                time: shortTime(review.created_at),
                user: fullName(review.user, true)
              })
            }}
          </small>
        </b-card-footer>
      </template>
    </review-list-item>
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
      perPage: 1
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
}
</script>
