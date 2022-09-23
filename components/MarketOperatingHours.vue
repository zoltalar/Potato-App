<template>
  <b-card class="card-default" v-if="market">
    <nuxt-link :to="marketEditOperatingHoursLink(market)" class="link-edit" :title="$t('phrases.edit_operating_hours')" v-if="marketIsOwner(market)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-2">{{ $t('phrases.operating_hours') }}</b-card-title>
    <b-card-text>
      <span v-if="!operatingHoursIsEmpty(hours)">
        <span v-for="(hour, i) in hours" :key="'operating-hours-' + i">
          <span class="hour-type" v-if="hour.type === 1">
            <font-awesome-icon icon="calendar" class="mr-1" />
            {{ dateFormat(hour.start_date) }} - {{ dateFormat(hour.end_date) }}
          </span>
          <span class="hour-type" v-else-if="hour.type === 2">
            <font-awesome-icon icon="calendar" class="mr-1" />
            {{ monthName(hour.start_month) }} - {{ monthName(hour.end_month) }}
          </span>
          <span v-for="(day, j) in days()" :key="'operating-hours-day-' + i + '-' + j">
            <span class="day-name">{{ $t('phrases.' + day) }}: </span>
            <span>{{ operatingHoursDayRange(hour, day) }}</span>
            <br />
          </span>
          <hr v-if="(i+1) < hours.length" />
        </span>
      </span>
      <span v-else> - </span>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'MarketOperatingHours',
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  computed: {
    hours () {
      const market = this.market
      return this.operatingHours(market, [])
    }
  }
}
</script>
