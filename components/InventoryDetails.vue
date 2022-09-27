<template>
  <div class="p-3">
    <h5 class="mb-3">{{ name }}</h5>
    <h6 class="mb-3" v-if="hasAreas()">{{ $t('phrases.top_growing_areas') }}</h6>
    <b-list-group class="mb-4" v-if="hasAreas()">
      <nuxt-link :to="areaUrl(area, id, name)" class="list-group-item" v-for="(area, i) in areas" :key="'top-growing-area-' + i">
        {{ areaName(area) }}
      </nuxt-link>
    </b-list-group>
    <h6 class="mb-3">{{ $t('phrases.price_chart') }}</h6>
    <client-only>
      <bar-chart :chart-data="chartData" :options="chartOptions" />
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'InventoryDetails',
  props: ['id', 'name'],
  data: () => ({
    areas: [],
    chartData: {
      labels: [],
      datasets: []
    },
    chartOptions: {}
  }),
  watch: {
    id: {
      handler() {
        this.chart()
        this.fetch()
      },
      immediate: true
    }
  },
  methods: {
    chart () {
      const id = this.id
      if (!this.$_.isNil(id)) {
        this
          .$axios
          .get(`/api/potato/prices/analytics/${id}`)
          .then((response) => {
            const analytics = this.$_.get(response, 'data.data', [])
            this.chartData.labels = this.$_.map(analytics, '_year_month')
            this.chartData.datasets = [{
              label: this.$t('phrases.price') + ' (' + this.currencyCode() + ')',
              data: this.$_.map(analytics, 'average_price'),
              backgroundColor: '#58c26c',
              hoverBackgroundColor: '#58c26c'
            }]
          })
      }
    },
    fetch () {
      const id = this.id
      if (!this.$_.isNil(id)) {
        this
          .$axios
          .get(`/api/potato/products/top-growing-areas/${id}`)
          .then((result) => {
            this.areas = this.$_.get(result, 'data.data', [])
          })
      }
    },
    hasAreas () {
      return this.areas.length > 0
    }
  }
}
</script>
