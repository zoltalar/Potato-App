<template>
  <form class="form-operating-hours" @submit.prevent="save">
    <b-form-group>
      <div v-for="(day, i) in days()" :key="'day-operating-hours-' + i">
        <b-checkbox v-model="hours[day].selected">{{ $t('phrases.' + day) }}</b-checkbox>
        <div class="options" v-if="hours[day].selected === true">
          <b-form-group>
            <label class="sub-label">
              {{ $t('phrases.time_range') }}
              ({{ $t('phrases.from_to') }})
              <span class="text-danger">*</span>
            </label>
            <b-input-group size="sm" class="input-group-fixed">
              <b-form-timepicker
                :hour12="hour12()"
                :label-no-time-selected="$t('phrases.no_time_selected')"
                :label-close-button="$t('phrases.close')"
                v-model="hours[day].start" />
              <b-form-timepicker
                :hour12="hour12()"
                :label-no-time-selected="$t('phrases.no_time_selected')"
                :label-close-button="$t('phrases.close')"
                v-model="hours[day].end" />
              <b-input-group-append>
                <b-button variant="primary" size="sm" :title="$t('phrases.duplicate')" @click.prevent="duplicate(day)" v-if="day === 'monday'">
                  <font-awesome-icon icon="clone" />
                </b-button>
                <b-button variant="danger" size="sm" :title="$t('phrases.reset')" @click.prevent="reset(day)" v-else>
                  <font-awesome-icon icon="times" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
            <div class="invalid-feedback d-block" v-if="error(day + '.start') !== null">
              {{ error(day + '.start') }}
            </div>
            <div class="invalid-feedback d-block" v-else-if="error(day + '.end') !== null">
              {{ error(day + '.end') }}
            </div>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.exceptions')">
      <b-form-textarea id="input-exceptions" size="lg" rows="7" maxlength="1000" no-resize v-model="hours.exceptions"></b-form-textarea>
      <small class="form-text text-muted">
        <chars-remaining for="input-exceptions" ref="operating-hours-exceptions" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath({ name: 'account-farms' })" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formOperatableMixin from '@/mixins/form-operatable'
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'FarmOperatingHoursForm',
  mixins: [ formOperatableMixin, formErrorsMixin ],
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
    editedOperatingHours: {
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
</script>
