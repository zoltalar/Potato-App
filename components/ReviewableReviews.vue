<template>
  <div id="reviews" class="reviews">
    <h2 class="h6 mb-3">
      {{ $t('phrases.reviews') }}
      ({{ reviews.length }})
    </h2>
    <div v-if="hasReviews()">
      <div class="list-reviews" v-for="(review, i) in pagedReviews" :key="'review-' + i">
        <review-list-item class="mb-4" :review="review">
          <template v-slot:links>
            <div class="mb-2" v-if="$auth.loggedIn">
              <a href="/" @click.prevent="comment(review)">{{ $t('phrases.comment_on_this_review') }}</a>
            </div>
          </template>
        </review-list-item>
        <hr v-if="i < (pagedReviews.length - 1)" />
      </div>
      <b-pagination
        v-model="pagination.currentPage"
        :items="reviews"
        :total-rows="reviews.length"
        :per-page="pagination.perPage"
      />
      <b-modal id="modal-comment-create" :title="$t('phrases.review_comment')" @ok="store" no-enforce-focus>
        <comment-create-form :commentable="selectedReview" type="review" ref="form-comment-create" />
      </b-modal>
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
    selectedReview: null,
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
    comment (review) {
      this.selectedReview = review
      this.$bvModal.show('modal-comment-create')
    },
    hasReviews () {
      return this.reviews.length > 0
    },
    listen () {
      this.$root.$on('comment-created', () => {
        this.$bvModal.hide('modal-comment-create')
      })
    },
    store (event) {
      event.preventDefault()
      this.$refs['form-comment-create'].store()

      return
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
