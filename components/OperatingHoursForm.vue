<template>
  <form class="form-operating-hours" @submit.prevent="save">
    <b-form-group>
      <div v-for="(day, i) in days()">
        <b-checkbox @change="toggle(day)">{{ $t('phrases.' + day) }}</b-checkbox>
        <div class="options" v-if="hours[day].selected === true">
          <b-form-group>
            <label class="sub-label">
              {{ $t('phrases.time_range') }}
              <span class="text-danger">*</span>
            </label>
            <b-input-group size="sm" class="input-group-fixed">
              <b-form-timepicker :hour12="hour12()" :label-no-time-selected="$t('phrases.no_time_selected')" v-model="hours[day].start" />
              <b-form-timepicker :hour12="hour12()" :label-no-time-selected="$t('phrases.no_time_selected')" v-model="hours[day].end" />
              <b-button variant="primary" size="sm" :title="$t('phrases.duplicate')" @click.prevent="duplicate(day)" v-if="day === 'monday'">
                <font-awesome-icon icon="clone" />
              </b-button>
              <b-button variant="danger" size="sm" :title="$t('phrases.reset')" @click.prevent="reset(day)" v-else>
                <font-awesome-icon icon="times" />
              </b-button>
            </b-input-group>
          </b-form-group>
        </div>
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="cancelUrl()" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formOperatableMixin from '@/mixins/form-operatable'
export default {
  name: 'OperatingHoursForm',
  mixins: [ formOperatableMixin ]
}
</script>
