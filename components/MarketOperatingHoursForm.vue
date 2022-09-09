<template>
  <form class="form-operating-hours">
    <b-form-group>
      <div v-for="(model, i) in hours" :key="'operating-hours-' + i">
        <b-button variant="danger" size="sm" class="float-right" v-if="i >= 1">
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
                  <b-button variant="primary" size="sm" :title="$t('phrases.duplicate')" v-if="day === 'monday'">
                    <font-awesome-icon icon="clone" />
                  </b-button>
                  <b-button variant="danger" size="sm" :title="$t('phrases.reset')" v-else>
                    <font-awesome-icon icon="times" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
        </div>
        <b-button variant="primary" size="sm" class="mt-3" @click.prevent="addHours()" v-if="i === hours.length - 1 && i < max">
          {{ $t('phrases.add_season') }}
        </b-button>
        <hr />
      </div>
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
    max: 2
  }),
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
    hasHours () {
      return this.hours.length > 0
    }
  },
  mounted () {
    if (!this.hasHours()) {
      this.addHours()
    }
  }
}
</script>
