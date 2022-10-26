<template>
  <b-sidebar :title="itemName" id="sidebar-product" backdrop backdrop-variant="secondary" no-close-on-route-change>
    <template>
      <div class="p-3">
        <h2 class="h6 mb-3" v-if="hasAreas()">{{ $t('phrases.top_growing_areas') }}</h2>
        <b-list-group class="mb-4" v-if="hasAreas()">
          <nuxt-link :to="areaUrl(area, id, itemName)" class="list-group-item" v-for="(area, i) in areas" :key="'top-growing-area-' + i">
            {{ areaName(area) }}
          </nuxt-link>
        </b-list-group>
        <h2 class="h6 mb-3">{{ $t('phrases.price_chart') }}</h2>
        <client-only>
          <bar-chart :chart-data="chartData" :options="chartOptions" />
        </client-only>
      </div>
    </template>
  </b-sidebar>
</template>
<script>
export default {
  name: 'PageProductsShow',
  layout: 'default',
  head () {
    return {
      title: this.itemName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_product', { item: this.itemName.toLowerCase() })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/products/:name/:id',
      pl: '/produkty/:name/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      let response = await $axios.get(`/api/potato/inventory/show/${id}`)
      const item = response.data.data
      response = await $axios.get(`/api/potato/products/top-growing-areas/${id}`)
      const areas = response.data.data
      response = await $axios.get(`/api/potato/prices/analytics/${id}`)
      const analytics = response.data.data
      return { item, areas, analytics }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    item: {},
    areas: [],
    analytics: [],
    chartData: {
      labels: [],
      datasets: []
    },
    chartOptions: {}
  }),
  computed: {
    id () {
      return this.$route.params.id
    },
    itemName () {
      return this.inventoryName(this.item)
    }
  },
  watch: {
    '$route': {
      handler () {
        this.toggle()
      },
      immediate: true
    },
    analytics: {
      handler () {
        this.chart()
      },
      immediate: true
    }
  },
  methods: {
    chart () {
      const analytics = this.analytics
      this.chartData.labels = this.$_.map(analytics, '_year_month')
      this.chartData.datasets = [{
        label: this.$t('phrases.price') + ' (' + this.currencyCode() + ')',
        data: this.$_.map(analytics, 'average_price'),
        backgroundColor: '#58c26c',
        hoverBackgroundColor: '#58c26c'
      }]
    },
    hasAreas () {
      return this.areas.length > 0
    },
    toggle () {
      this.$root.$emit('bv::toggle::collapse', 'sidebar-product')
    }
  },
  mounted() {
    this.toggle()
  }
}
</script>
