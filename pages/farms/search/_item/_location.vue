<template>
  <div class="farms search">
    <page-title>
      {{ $t('phrases.search_results') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <h6>{{ $_.capitalize(item) }}</h6>
        <client-only>
          <bar-chart :chart-data="barChartData" :options="barChartOptions" />
        </client-only>
      </template>
      <template v-if="loaded">
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
      en: '/farms/search/:item/:location',
      pl: '/gospodarstwa-rolne/szukaj/:item/:location'
    }
  },
  data: () => ({
    farms: [],
    loaded: false,
    pagination: {
      currentPage: 1,
      perPage: 10
    },
    barChartData: {
      labels: [
        '2019-06',
        '2019-07',
        '2019-08',
        '2019-09',
        '2019-10',
        '2019-11',
        '2019-12',
        '2020-01',
        '2020-02',
        '2020-03',
        '2020-04',
        '2020-05'
      ],
      datasets: [
        {
          label: 'Visits',
          data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78],
          backgroundColor: '#58c26c'
        }
      ]
    },
    barChartOptions: {}
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
    }
  },
  methods: {
    fetch () {
      const item = this.item
      const inventoryId = this.inventoryId
      const location = this.location
      const cityId = this.cityId
      this
        .$axios
        .get(`/api/potato/farms/search`, {
          params: { item, inventory_id: inventoryId, location, city_id: cityId }
        })
        .then((response) => {
          this.farms = this.$_.get(response, 'data.data', [])
          this.loaded = true
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
