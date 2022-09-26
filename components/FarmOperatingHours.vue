<template>
  <b-card class="card-default" v-if="farm">
    <nuxt-link :to="farmEditOperatingHoursLink(farm)" class="link-edit" :title="$t('phrases.edit_operating_hours')" v-if="farmIsOwner(farm)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.operating_hours') }}</b-card-title>
    <b-card-text>
      <span v-if="!operatingHoursIsEmpty(hours)">
        <span v-for="(day, i) in days()" :key="'operating-hours-day-' + i">
          <span class="day-name">{{ $t('phrases.' + day) }}: </span>
          <span>{{ operatingHoursDayRange(hours, day) }}</span>
          <br />
        </span>
      </span>
      <span v-else> - </span>
    </b-card-text>
    <b-card-title class="h6 mb-1">{{ $t('phrases.exceptions') }}</b-card-title>
    <b-card-text>
      <span v-if="!operatingHoursIsEmpty(hours)">{{ hours.exceptions }}</span>
      <span v-else> - </span>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'FarmOperatingHours',
  props: {
    farm: {
      type: Object,
      required: true
    }
  },
  computed: {
    hours () {
      const farm = this.farm
      return this.operatingHours(farm)
    }
  }
}
</script>
