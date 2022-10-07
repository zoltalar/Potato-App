<template>
  <ul class="pagination" role="menubar" aria-disabled="false" :aria-label="$t('phrases.pagination')">
    <li class="page-item" role="presentation">
      <span class="page-link disabled" v-if="onFirstPage()">&laquo;</span>
      <nuxt-link :to="gotoPage(previousPage)" class="page-link" v-else>&laquo;</nuxt-link>
    </li>
    <li class="page-item" role="presentation" v-for="i in range" :key="'pagination-item-' + i" :class="{'active': (currentPage === i)}">
      <span class="page-link" v-if="currentPage === i">{{ i }}</span>
      <nuxt-link :to="gotoPage(i)" class="page-link" v-else>{{ i }}</nuxt-link>
    </li>
    <li class="page-item" role="presentation">
      <span class="page-link" v-if="!hasMorePages()">&raquo;</span>
      <nuxt-link :to="gotoPage(nextPage)" class="page-link" v-else>&raquo;</nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    route: {
      type: String,
      required: true
    },
    meta: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.params.page)
    },
    lastPage() {
      return this.$_.get(this.meta, 'last_page')
    },
    nextPage () {
      return this.currentPage + 1
    },
    previousPage () {
      return this.currentPage - 1
    },
    range() {
      let i = 1

      if (this.currentPage - 2 > 0) {
        i = this.currentPage - 2
      }

      let range = []
      let max = i + 5

      for ( ; i <= this.lastPage && i <= max; i++) {
        range.push(i)
      }

      return range
    }
  },
  methods: {
    gotoPage (page) {
      let params = this.$_.clone(this.$route.params)
      params.page = page
      let query = this.$route.query
      return this.localePath({ name: this.route, params, query })
    },
    hasMorePages () {
      return this.currentPage < this.lastPage
    },
    onFirstPage () {
      return this.currentPage <= 1
    }
  }
}
</script>
