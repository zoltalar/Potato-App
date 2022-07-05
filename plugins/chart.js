import Vue from 'vue'
import { Bar } from 'vue-chartjs/legacy'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

Vue.component('bar-chart', {
  extends: Bar,
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
})
