<template>
  <div class="account reviews">
    <page-title>
      {{ $t('phrases.reviews') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div class="list-reviews" v-if="reviews.length > 0">
          <p v-html="$t('messages.account_reviews')"></p>
          <div class="list-favorites">
            <review-list-item class="mb-4" :review="review" v-for="(review, i) in pagedReviews" :key="'review-list-item-' + i" />
          </div>
          <b-pagination
            v-model="pagination.currentPage"
            :items="reviews"
            :total-rows="reviews.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div v-else>
          <p v-html="$t('messages.account_reviews_empty')"></p>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountReviews',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.reviews'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_reviews')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/account/reviews',
      pl: '/konto/recenzje'
    }
  },
  data: () => ({
    reviews: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    pagedReviews () {
      const reviews = this.reviews
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return reviews.slice(start, end)
    }
  },
  methods: {
    fetch() {
      this
        .$axios
        .get('/api/potato/account/reviews')
        .then((response) => {
          this.reviews = this.$_.get(response, 'data.data')
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
