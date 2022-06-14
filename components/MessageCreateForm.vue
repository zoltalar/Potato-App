<template>
  <form class="form-message-create">
    <b-form-group :label="$t('phrases.subject')">
      <b-form-input :class="{'is-invalid': error('subject') !== null}" maxlength="255" v-model="message.subject" />
      <div class="invalid-feedback d-block" v-if="error('subject') !== null">
        {{ error('subject') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.message') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-textarea id="input-message-content" :class="{'is-invalid': error('content') !== null}" rows="7" maxlength="1000" v-model="message.content"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('content') !== null">
        {{ error('content') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-message-content" ref="message-content" />
      </small>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'MessageCreateForm',
  mixins: [ formErrorsMixin ],
  props: {
    messageable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    message: {
      subject: '',
      content: ''
    }
  }),
  methods: {
    store () {
      let message = this.message
      const messageable = this.messageable
      const type = this.type
      this
        .$axios
        .post(`/api/potato/messages/store/${type}/${messageable.id}`, message)
        .then((response) => {
          this.setErrors(response)
          message = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(message)) {
            this.$root.$emit('message-created', { message })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
