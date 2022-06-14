<template>
  <form class="form-message-reply">
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
  name: 'MessageReplyForm',
  mixins: [ formErrorsMixin ],
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    message: {
      content: ''
    }
  }),
  methods: {
    populate () {
      const reply = this.reply
      if (!this.$_.isEmpty(reply)) {
        this.message.reply_id = reply.id
      }
    },
    send () {
      let message = this.message
      const reply = this.reply
      this
        .$axios
        .post(`/api/potato/messages/reply/${reply.id}`, message)
        .then((response) => {
          this.setErrors(response)
          message = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(message)) {
            this.$root.$emit('message-replied', { message })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
