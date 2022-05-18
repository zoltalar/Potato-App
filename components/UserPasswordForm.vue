<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.current_password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" :class="{'is-invalid': error('password_current') !== null}" maxlength="40" v-model="user.password_current" />
      <div class="invalid-feedback d-block" v-if="error('password_current') !== null">
        {{ error('password_current') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.new_password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" :class="{'is-invalid': error('password') !== null}" maxlength="40" v-model="user.password" />
      <div class="invalid-feedback d-block" v-if="error('password') !== null">
        {{ error('password') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.confirm_new_password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" :class="{'is-invalid': error('password_confirmation') !== null}" maxlength="40" v-model="user.password_confirmation" />
      <div class="invalid-feedback d-block" v-if="error('password_confirmation') !== null">
        {{ error('password_confirmation') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.change') }}</b-button>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'UserPasswordForm',
  mixins: [ formErrorsMixin ],
  data: () => ({
    user: {
      password_current: '',
      password: '',
      password_confirmation: ''
    }
  }),
  methods: {
    reset () {
      const user = this.user
      this.$_.forOwn(user, (value, key) => {
        user[key] = ''
      })
      this.user = user
    },
    update () {
      let user = this.user

      this
        .$axios
        .put('/api/potato/users/update-password', user)
        .then((response) => {
          user = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(user)) {
            this.reset()
            this.$root.$emit('user-password-updated', { user })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
