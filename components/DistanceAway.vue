<template>
  <span class="distance-away">
    ({{ text() }})
  </span>
</template>
<script>
export default {
  name: 'DistanceAway',
  props: {
    distance: {
      type: Number,
      required: true
    }
  },
  methods: {
    text () {
      const distance = Math.round(this.distance)
      const unit = this.unit()
      return this.$t('messages.distance_away', { distance, unit })
    },
    unit () {
      const units = this.countryUnits()
      const unit = this.$_.head(this.$_.filter(units, (unit) => {
        return unit.type === 1;
      }))
      return this.$_.get(unit, 'abbreviation', '')
    }
  }
}
</script>
