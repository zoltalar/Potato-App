export default {
  methods: {
    operatingHours (operatable, defaultValue = {}) {
      return this.$_.get(operatable, 'operating_hours', defaultValue)
    },
    operatingHoursDayRange (hours, day) {
      let string = this.$t('phrases.closed')
      if (!this.operatingHoursIsEmpty(hours)) {
        let range = this.$_.head(hours[day])
        if (!this.$_.isNil(range)) {
          range = range.split('-')
          if (range.length === 2) {
            const start = this.time(range[0])
            const end = this.time(range[1])
            string = [start, end].join(' - ')
          }
        }
      }
      return string
    },
    operatingHoursIsEmpty (hours) {
      if (this.$_.isObject(hours) || this.$_.isNil(hours)) {
        return this.$_.isEmpty(hours)
      } else if (this.$_.isArray(hours)) {
        return hours.length > 0
      }
      return false
    },
    operatingHoursMeta () {
      return this.$store.getters['operating-hours/meta']
    },
    operatingHoursTypes () {
      return this.$_.get(this.operatingHoursMeta(), 'types')
    },
    refreshOperatingHoursMeta () {
      this.$store.dispatch('operating-hours/meta')
    }
  }
}
