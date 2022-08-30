export default {
  methods: {
    operatingHours (operatable) {
      return this.$_.get(operatable, 'operating_hours', {})
    },
    operatingHoursDayRange (hours, day) {
      let string = this.$t('phrases.closed')
      if (day in hours) {
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
      return this.$_.isEmpty(hours)
    }
  }
}
