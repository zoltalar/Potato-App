<template>
  <form class="form-default" @submit.prevent="submit">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.first_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('first_name') !== null}" maxlength="100" v-model="contact.first_name" />
      <div class="invalid-feedback d-block" v-if="error('first_name') !== null">
        {{ error('first_name') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.last_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('last_name') !== null}" maxlength="100" v-model="contact.last_name" />
      <div class="invalid-feedback d-block" v-if="error('last_name') !== null">
        {{ error('last_name') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('email') !== null}" maxlength="255" v-model="contact.email" />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.message') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-textarea id="input-contact-message" :class="{'is-invalid': error('email') !== null}" size="lg" rows="7" maxlength="1000" no-resize v-model="contact.message"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('message') !== null">
        {{ error('message') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-contact-message" ref="contact-message" />
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.submit') }}</b-button>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
import passwordMixin from '@/mixins/password'
export default {
  name: 'ContactForm',
  mixins: [ formErrorsMixin, passwordMixin ],
  data: () => ({
    contact: {
      first_name: '',
      last_name: '',
      email: '',
      message: ''
    }
  }),
  methods: {
    reset () {
      const contact = this.contact
      this.$_.forOwn(contact, (value, key) => {
        contact[key] = ''
      })
      this.contact = contact
    },
    submit () {
      let contact = this.contact
      this
        .$axios
        .post('/api/potato/contact', contact)
        .then((response) => {
          this.setErrors(response)
          contact = this.$_.get(response, 'data')
          if ( ! this.$_.isEmpty(contact)) {
            this.reset()
            this.$root.$emit('contact', { contact })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
