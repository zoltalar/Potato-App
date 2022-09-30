<template>
  <form class="form-default" @submit.prevent="reset">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="email" :class="{'is-invalid': error('email') !== null}" maxlength="255" v-model="user.email" />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-btn type="submit" variant="primary" size="lg" block :disabled=" ! hasInput()">{{ $t('phrases.send_link') }}</b-btn>
    </b-form-group>
  </form>
</template>
<script>
import formErrors from '@/mixins/form-errors'
export default {
  name: 'PasswordResetForm',
  mixins: [ formErrors ],
  data: () => ({
    user: {
      email: ''
    }
  }),
  methods: {
    hasInput () {
      const user = this.user
      return user.email !== ''
    },
    async reset () {
      const user = this.user
      this
        .$axios
        .post('/api/potato/password/reset', user)
        .then((response) => {
          this.setErrors(response)
          const message = this.$_.get(response, 'data.message')
          if (this.$_.isNil(message)) {
            this.user.email = ''
            this.$root.$emit('reset', message)
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
