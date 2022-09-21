<template>
  <form class="form-operating-hours" @submit.prevent="save">
    <b-form-group>
      <div v-for="(model, i) in hours" :key="'operating-hours-' + i">
        <b-button variant="danger" size="sm" class="float-right" :title="$t('phrases.delete')" @click.prevent="deleteHours(i)">
          <font-awesome-icon icon="times" />
        </b-button>
        <p>
          <strong>{{ $t('phrases.season') }}</strong>
        </p>
        <b-form-group>
          <label class="sub-label">
            {{ $t('phrases.type') }}
            <span class="text-danger">*</span>
          </label>
          <b-radio :name="'types[' + i + ']'" value="1" v-model.number="hours[i].type">{{ $t('phrases.this_season_has_specific_start_and_end_dates') }}</b-radio>
          <b-radio :name="'types[' + i + ']'" value="2" v-model.number="hours[i].type">{{ $t('phrases.this_season_has_start_end_months') }}</b-radio>
          <div class="invalid-feedback d-block" v-if="error('hours.' + i + '.type') !== null">
            {{ error('hours.' + i + '.type') }}
          </div>
        </b-form-group>
        <b-form-group v-if="hours[i].type === 1">
          <label class="sub-label">
            {{ $t('phrases.dates') }}
            <span class="text-danger">*</span>
          </label>
          <b-input-group size="sm" class="input-group-fixed">
            <b-form-datepicker
              :placeholder="$t('phrases.start_date')"
              :locale="countryCode()"
              :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
              :reset-button="true"
              reset-button-variant="secondary"
              :label-reset-button="$t('phrases.reset')"
              :label-no-date-selected="$t('phrases.no_date_selected')"
              v-model="hours[i].start_date" />
            <b-form-datepicker
              :placeholder="$t('phrases.end_date')"
              :locale="countryCode()"
              :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
              :reset-button="true"
              reset-button-variant="secondary"
              :label-reset-button="$t('phrases.reset')"
              :label-no-date-selected="$t('phrases.no_date_selected')"
              v-model="hours[i].end_date" />
          </b-input-group>
          <div class="invalid-feedback d-block" v-if="error('hours.' + i + '.start_date') !== null">
            {{ error('hours.' + i + '.start_date') }}
          </div>
          <div class="invalid-feedback d-block" v-else-if="error('hours.' + i + '.end_date') !== null">
            {{ error('hours.' + i + '.end_date') }}
          </div>
        </b-form-group>
        <b-form-group v-else-if="hours[i].type === 2">
          <label class="sub-label">
            {{ $t('phrases.months') }}
            ({{ $t('phrases.from_to') }})
            <span class="text-danger">*</span>
          </label>
          <b-input-group size="sm" class="input-group-fixed">
            <b-select :options="monthNameOptions()" v-model.number="hours[i].start_month" />
            <b-select :options="monthNameOptions()" v-model.number="hours[i].end_month" />
          </b-input-group>
          <div class="invalid-feedback d-block" v-if="error('hours.' + i + '.start_month') !== null">
            {{ error('hours.' + i + '.start_month') }}
          </div>
          <div class="invalid-feedback d-block" v-else-if="error('hours.' + i + '.end_month') !== null">
            {{ error('hours.' + i + '.end_month') }}
          </div>
        </b-form-group>
        <p>
          <strong>{{ $t('phrases.days') }}</strong>
        </p>
        <div v-for="(day, j) in days()" :key="'day-operating-hours-day-' + i + '-' + j">
          <b-checkbox v-model="hours[i][day].selected">{{ $t('phrases.' + day) }}</b-checkbox>
          <div class="options" v-if="hours[i][day].selected === true">
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
                  v-model="hours[i][day].start" />
                <b-form-timepicker
                  :hour12="hour12()"
                  :label-no-time-selected="$t('phrases.no_time_selected')"
                  :label-close-button="$t('phrases.close')"
                  v-model="hours[i][day].end" />
                <b-input-group-append>
                  <b-button variant="primary" size="sm" :title="$t('phrases.duplicate')" @click.prevent="duplicate(i, day)" v-if="day === 'monday'">
                    <font-awesome-icon icon="clone" />
                  </b-button>
                  <b-button variant="danger" size="sm" :title="$t('phrases.reset')" @click.prevent="reset(i, day)" v-else>
                    <font-awesome-icon icon="times" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <div class="invalid-feedback d-block" v-if="error('hours.' + i + '.' + day + '.start') !== null">
                {{ error('hours.' + i + '.' + day + '.start') }}
              </div>
              <div class="invalid-feedback d-block" v-else-if="error('hours.' + i + '.' + day + '.end') !== null">
                {{ error('hours.' + i + '.' + day + '.end') }}
              </div>
            </b-form-group>
          </div>
        </div>
        <hr />
      </div>
      <b-button variant="primary" size="sm" :title="$t('phrases.add_season')" @click.prevent="addHours()" v-if="hours.length < max">
        <font-awesome-icon icon="plus" />
      </b-button>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath('/account/markets')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formOperatableMixin from '@/mixins/form-operatable'
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'MarketOperatingHoursForm',
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
    hours: [],
    max: 3
  }),
  computed: {
    editedOperatingHours () {
      const operatable = this.operatable
      return this.operatingHours(operatable, [])
    }
  },
  watch: {
    editedOperatingHours: {
      handler () {
        this.populate()
      },
      immediate: true
    }
  },
  methods: {
    addHours () {
      let hours = this.hours
      hours.push({
        type: null,
        start_date: null,
        end_date: null,
        start_month: null,
        end_month: null,
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
      })
    },
    deleteHours(index) {
      this.$delete(this.hours, index)
    },
    duplicate (index) {
      if (this.selectedDaysCount(index) <= 1) {
        alert(this.$t('messages.operating_hours_duplicate_error'))
        return false
      }
      const days = this.days()
      const hours = this.hours[index]
      let start = null
      let end = null
      this.$_.forEach(days, (day) => {
        if (hours[day].selected === true) {
          if (day === 'monday') {
            start = hours[day].start
            end = hours[day].end
          } else {
            this.hours[index][day].start = start
            this.hours[index][day].end = end
          }
        }
      })
    },
    hasHours () {
      return this.hours.length > 0
    },
    populate () {
      const editedOperatingHours = this.editedOperatingHours
      const days = this.days()
      if (this.$_.isArray(editedOperatingHours) && editedOperatingHours.length > 0) {
        this.$_.forEach(editedOperatingHours, (editedOperatingHour, i) => {
          this.addHours()
          this.$_.forOwn(editedOperatingHour, (value, key) => {
            if (!this.$_.isArray(value) && key in this.hours[i]) {
              this.hours[i][key] = editedOperatingHour[key]
            }
          })
          this.$_.forEach(days, (day) => {
            if (day in editedOperatingHour) {
              const operatingHours = editedOperatingHour[day]
              let range = this.$_.head(operatingHours)
              if (!this.$_.isNil(range)) {
                range = range.split('-')
                if (range.length === 2) {
                  this.hours[i][day].selected = true
                  this.hours[i][day].start = range[0]
                  this.hours[i][day].end = range[1]
                }
              }
            }
          })
        })
      }
    },
    reset (index, day) {
      this.hours[index][day].start = null
      this.hours[index][day].end = null
    },
    save () {
      let hours = this.hours
      const type = this.type
      this
        .$axios
        .post(this.uri(), { hours })
        .then((response) => {
          this.setErrors(response)
          hours = this.$_.get(response, 'data.data')
          this.$root.$emit(type + '-operating-hours-updated', { hours })
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    selectedDaysCount (index) {
      let count = 0
      const days = this.days()
      const hours = this.hours[index]
      this.$_.forEach(days, (day) => {
        if (hours[day].selected === true) {
          count++
        }
      })
      return count
    },
    uri () {
      const type = this.type
      const operatable = this.operatable
      return `/api/potato/operating-hours/save-batch/${type}/${operatable.id}`
    }
  }
}
</script>
