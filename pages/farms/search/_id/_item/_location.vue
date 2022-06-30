<template>
  <div class="farms search">
    <page-title>
      {{ $t('phrases.search_results') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <h6>{{ $_.capitalize(item) }}</h6>
      </template>
      <template>
        <div class="list-farms" v-if="farms.length > 0">
          <p v-html="$t('messages.farms_search', { item, location })"></p>
          <farm-list-item-card :farm="farm" class="mb-4" v-for="(farm, i) in pagedFarms" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </farm-list-item-card>
          <b-pagination
            class="mb-4"
            v-model="pagination.currentPage"
            :items="farms"
            :total-rows="farms.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div v-else>
          <span v-html="$t('messages.farms_search_empty', { item, location })"></span>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsSearch',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.search_results'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_search')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/search/:id/:item/:location',
      pl: '/gospodarstwa-rolne/szukaj/:id/:item/:location'
    }
  },
  data: () => ({
    farms: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    id () {
      return this.$route.params.id
    },
    item () {
      return this.$route.params.item
    },
    location () {
      return this.$route.params.location
    },
    pagedFarms () {
      const farms = this.farms
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return farms.slice(start, end)
    }
  },
  methods: {
    fetch () {
      const id = this.id
      const item = this.item
      this
        .$axios
        .get(`/api/potato/farms/search`, {
          params: { id, item }
        })
        .then((response) => {
          this.farms = this.$_.get(response, 'data.data', [])
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
