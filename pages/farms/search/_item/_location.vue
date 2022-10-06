<template>
  <div class="farms search">
    <page-title>
      {{ $t('phrases.farms_search_results') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <advanced-site-search-form />
      </template>
      <template>
        <div class="list-farms" v-if="farms.length > 0">
          <h2 class="p" v-html="$t('messages.farms_search', { item, location })"></h2>
          <farm-list-item-card :farm="farm" :linkable-image="true" class="mb-4" v-for="(farm, i) in pagedFarms" :key="'farm-list-item-' + i">
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
          <span v-html="$t('messages.farms_search_empty')"></span>
          <nuxt-link :to="localePath('/farms/create')" class="btn btn-primary">{{ $t('phrases.add_farm') }}</nuxt-link>
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
      title: this.$t('messages.page_title_farms_search', { item: this.item, location: this.location }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_search', { item: this.item, location: this.location })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/search/:item/:location',
      pl: '/gospodarstwa-rolne/szukaj/:item/:location'
    }
  },
  async asyncData({ query, params, $axios }) {
    const cityId = query.city_id
    const inventoryId = query.inventory_id
    const item = params.item
    const location = params.location
    const radius = query.radius
    try {
      const response = await $axios.get(`/api/potato/farms/search`, {
        params: { item, inventory_id: inventoryId, location, city_id: cityId, radius }
      })
      return { farms: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    farms: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    cityId () {
      return this.$route.query.city_id
    },
    inventoryId () {
      return this.$route.query.inventory_id
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
    },
    radius () {
      return this.$route.query.radius || this.addressMaxRadius()
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.fetch()
      }
    }
  },
  methods: {
    fetch () {
      const item = this.item
      const inventoryId = this.inventoryId
      const location = this.location
      const cityId = this.cityId
      const radius = this.radius
      this
        .$axios
        .get(`/api/potato/farms/search`, {
          params: { item, inventory_id: inventoryId, location, city_id: cityId, radius }
        })
        .then((response) => {
          this.farms = this.$_.get(response, 'data.data', [])
        })
    }
  }
}
</script>
