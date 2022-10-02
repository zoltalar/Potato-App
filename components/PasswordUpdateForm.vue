<template>
  <form class="form-default" @submit.prevent="submit">
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
      <template v-slot:label>
        {{ $t('phrases.password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" :class="{'is-invalid': error('password') !== null}" maxlength="40" v-model="user.password" />
      <div class="invalid-feedback d-block" v-if="error('password') !== null">
        {{ error('password') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.confirm_password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" :class="{'is-invalid': error('password_confirmation') !== null}" maxlength="40" v-model="user.password_confirmation" />
      <div class="invalid-feedback d-block" v-if="error('password_confirmation') !== null">
        {{ error('password_confirmation') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-btn type="submit" variant="primary" size="lg" block :disabled=" ! hasInput()">{{ $t('phrases.change_password') }}</b-btn>
    </b-form-group>
  </form>
</template>
<script>
import formErrors from '@/mixins/form-errors'
export default {
  name: 'PasswordUpdateForm',
  mixins: [ formErrors ],
  data: () => ({
    user: {
      email: '',
      password: '',
      password_confirmation: '',
      token: ''
    }
  }),
  watch: {
    '$route.query': {
      handler () {
        this.populate()
      },
      immediate: true
    }
  },
  methods: {
    hasInput () {
      const user = this.user
      return user.email !== '' && user.password !== '' && user.password_confirmation !== ''
    },
    populate () {
      this.user.email = this.$route.query.email
      this.user.token = this.$route.query.token
    },
    reset () {
      this.user.password = ''
      this.user.password_confirmation = ''
    },
    async submit () {
      const user = this.user
      this
        .$axios
        .post('/api/potato/password/reset', user)
        .then((response) => {
          this.setErrors(response)
          const message = this.$_.get(response, 'data.message')
          if (!this.$_.isNil(message)) {
            this.reset()
            this.$root.$emit('password-reset', message)
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
