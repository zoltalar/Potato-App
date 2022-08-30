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
      },
      exceptions: null
    }
  }),
  computed: {
    editedOperatingHours () {
      const operatable = this.operatable
      return this.operatingHours(operatable)
    }
  },
  watch: {
    'editedOperatingHours': {
      handler () {
        this.populate()
      },
      immediate: true
    },
    'hours.exceptions': {
      handler (exceptions) {
        this.$refs['operating-hours-exceptions'].update(exceptions)
      }
    }
  },
  methods: {
    cancelUrl () {
      const type = this.type
      if (type === 'farm') {
        return this.localePath('/account/farms')
      }
      return ''
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
    populate () {
      const editedOperatingHours = this.editedOperatingHours
      const days = this.days()
      if ( ! this.$_.isEmpty(editedOperatingHours)) {
        this.$_.forEach(days, (day) => {
          if (day in editedOperatingHours) {
            const operatingHours = editedOperatingHours[day]
            let range = this.$_.head(operatingHours)
            if (!this.$_.isNil(range)) {
              range = range.split('-')
              if (range.length === 2) {
                this.hours[day].selected = true
                this.hours[day].start = range[0]
                this.hours[day].end = range[1]
              }
            }
          }
        })
        this.hours.exceptions = editedOperatingHours.exceptions
      }
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
    save () {
      let hours = this.hours
      const type = this.type
      this
        .$axios
        .post(this.uri(), hours)
        .then((response) => {
          this.setErrors(response)
          hours = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(hours)) {
            this.$root.$emit(type + '-operating-hours-updated', { hours })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    uri () {
      const type = this.type
      const operatable = this.operatable
      return `/api/potato/operating-hours/save/${type}/${operatable.id}`
    }
  }
}
