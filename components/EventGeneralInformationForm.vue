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
      email: ''
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
      console.log("Updating...")
    }
  }
}
</script>
