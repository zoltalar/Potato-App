<template>
  <b-sidebar :title="itemName" id="sidebar-product" backdrop backdrop-variant="secondary" no-close-on-route-change>
    <template>
      <div class="p-3">
        <h2 class="h6 mb-3">{{ $t('phrases.nutrition_facts') }}</h2>
        <h2 class="h6 mb-3" v-if="hasGrowingAreas()">{{ $t('phrases.top_growing_areas') }}</h2>
        <b-list-group class="mb-4" v-if="hasGrowingAreas()">
          <nuxt-link :to="areaUrl('farms', area, id, itemName)" class="list-group-item" v-for="(area, i) in growingAreas" :key="'top-growing-area-' + i">
            {{ areaName(area) }}
          </nuxt-link>
        </b-list-group>
        <h2 class="h6 mb-3" v-if="hasSellingAreas()">{{ $t('phrases.top_selling_areas') }}</h2>
        <b-list-group class="mb-4" v-if="hasSellingAreas()">
          <nuxt-link :to="areaUrl('markets', area, id, itemName)" class="list-group-item" v-for="(area, i) in sellingAreas" :key="'top-selling-area-' + i">
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
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_product', { item: this.itemName.toLowerCase() }) },
        { hid: 'og:title', name: 'og:title', content: this.itemName },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_product', { item: this.itemName.toLowerCase() }) },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
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
      const growingAreas = response.data.data
      response = await $axios.get(`/api/potato/products/top-selling-areas/${id}`)
      const sellingAreas = response.data.data
      response = await $axios.get(`/api/potato/prices/analytics/${id}`)
      const analytics = response.data.data
      return { item, growingAreas, sellingAreas, analytics }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    item: {},
    growingAreas: [],
    sellingAreas: [],
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
    hasGrowingAreas () {
      return this.growingAreas.length > 0
    },
    hasSellingAreas () {
      return this.sellingAreas.length > 0
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
