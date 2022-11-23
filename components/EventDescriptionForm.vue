<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <b-form-textarea id="input-event-description" size="lg" rows="10" maxlength="5000" no-resize v-model="event.description"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-event-description" ref="event-description" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
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
  name: 'EventDescriptionForm',
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
      description: ''
    }
  }),
  watch: {
    editedEvent: {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
    },
    'event.description': {
      handler (description) {
        this.$refs['event-description'].update(description)
      }
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
        .put(`/api/potato/events/update-description/${event.id}`, event)
        .then((response) => {
          this.setErrors(response)
          event = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(event)) {
            this.$root.$emit('event-description-updated', { event })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
