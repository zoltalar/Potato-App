export default {
  props: {
    operatable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    hours: {
      monday: {
        selected: false,
        start: null,
        end: null
      },
      tuesday: {
        selected: false,
        start: null,
        end: null
      },
      wednesday: {
        selected: false,
        start: null,
        end: null
      },
      thursday: {
        selected: false,
        start: null,
        end: null
      },
      friday: {
        selected: false,
        start: null,
        end: null
      },
      saturday: {
        selected: false,
        start: null,
        end: null
      },
      sunday: {
        selected: false,
        start: null,
        end: null
      }
    }
  }),
  methods: {
    cancelUrl () {
      const type = this.type
      if (type === 'farm') {
        return this.localePath('/account/farms')
      }
      return ''
    },
    days () {
      return this.$_.keys(this.hours)
    },
    duplicate () {
      if (this.selectedDaysCount() <= 1) {
        alert(this.$t('messages.operating_hours_duplicate_error'))
        return false
      }
      const days = this.days()
      const hours = this.hours
      let start = null
      let end = null
      this.$_.forEach(days, (day) => {
        if (hours[day].selected === true) {
          if (day === 'monday') {
            start = hours[day].start
            end = hours[day].end
          } else {
            this.hours[day].start = start
            this.hours[day].end = end
          }
        }
      })
    },
    hour12 () {
      return this.countryCode() === 'us'
    },
    reset (day) {
      this.hours[day].start = null
      this.hours[day].end = null
    },
    selectedDaysCount () {
      let count = 0
      const days = this.days()
      const hours = this.hours
      this.$_.forEach(days, (day) => {
        if (hours[day].selected === true) {
          count++
        }
      })
      return count
    },
    toggle (day) {
      const selected = this.hours[day].selected
      if (!selected) {
        this.reset(day)
      }
      this.hours[day].selected = !selected
    }
  }
}
