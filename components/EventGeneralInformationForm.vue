<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.event_title') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input size="lg" :class="{'is-invalid': error('title') !== null}" maxlength="255" v-model="event.title" />
      <div class="invalid-feedback d-block" v-if="error('title') !== null">
        {{ error('title') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.website_url')">
      <b-form-input size="lg" :class="{'is-invalid': error('website') !== null}" maxlength="255" placeholder="http://" v-model="event.website" />
      <div class="invalid-feedback d-block" v-if="error('website') !== null">
        {{ error('website') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.phone')">
      <b-form-input size="lg" :class="{'is-invalid': error('phone') !== null}" maxlength="20" v-model="event.phone" />
      <div class="invalid-feedback d-block" v-if="error('phone') !== null">
        {{ error('phone') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="email" size="lg" :class="{'is-invalid': error('email') !== null}" maxlength="255" v-model="event.email" />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.event_general_information_email')"></small>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.start_date') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-datepicker
        :placeholder="$t('phrases.start_date')"
        :locale="countryCode()"
        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
        :reset-button="true"
        reset-button-variant="secondary"
        :label-reset-button="$t('phrases.reset')"
        :label-no-date-selected="$t('phrases.no_date_selected')"
        size="lg"
        v-model="event.start_date" />
      <div class="invalid-feedback d-block" v-if="error('start_date') !== null">
        {{ error('start_date') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.end_date')">
      <b-form-datepicker
        :placeholder="$t('phrases.end_date')"
        :locale="countryCode()"
        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
        :reset-button="true"
        reset-button-variant="secondary"
        :label-reset-button="$t('phrases.reset')"
        :label-no-date-selected="$t('phrases.no_date_selected')"
        size="lg"
        v-model="event.end_date" />
      <div class="invalid-feedback d-block" v-if="error('end_date') !== null">
        {{ error('end_date') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.start_time')">
      <b-form-timepicker
        :hour12="(isHour12() === true)"
        :label-no-time-selected="$t('phrases.no_time_selected')"
        :label-close-button="$t('phrases.close')"
        size="lg"
        v-model="event.start_time" />
      <div class="invalid-feedback d-block" v-if="error('start_time') !== null">
        {{ error('start_time') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.end_time')">
      <b-form-timepicker
        :hour12="(isHour12() === true)"
        :label-no-time-selected="$t('phrases.no_time_selected')"
        :label-close-button="$t('phrases.close')"
        size="lg"
        v-model="event.end_time" />
      <div class="invalid-feedback d-block" v-if="error('end_time') !== null">
        {{ error('end_time') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath({ name: 'account-events' })" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'EventGeneralInformationForm',
  mixins: [ formErrorsMixin ],
  props: {
    editedEvent: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    event: {
      id: null,
      title: '',
      website: '',
      phone: '',
      email: '',
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null
    }
  }),
  watch: {
    editedEvent: {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    populate () {
      const editedEvent = this.editedEvent
      const event = this.event
      if ( ! this.$_.isEmpty(editedEvent)) {
        this.$_.forOwn(editedEvent, (value, key) => {
          if (key in event) {
            event[key] = value
          }
        })
        this.event = event
      }
    },
    update () {
      let event = this.event
      this
        .$axios
        .put(`/api/potato/events/update-general-information/${event.id}`, event)
        .then((response) => {
          this.setErrors(response)
          event = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(event)) {
            this.$root.$emit('event-general-information-updated', { event })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
