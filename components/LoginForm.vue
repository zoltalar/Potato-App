<template>
  <form class="form-default" @submit.prevent="login">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="email" :class="{'is-invalid': error === 'Unauthorized'}" maxlength="255" v-model="user.email" />
      <div class="invalid-feedback d-block" v-if="error === 'Unauthorized'">
        {{ $t('messages.auth_failed') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" :class="{'is-invalid': error === 'Unauthorized'}" maxlength="40" v-model="user.password" />
    </b-form-group>
    <b-form-group>
      <b-btn type="submit" variant="primary" size="lg" block :disabled=" ! hasInput()">{{ $t('phrases.to_login') }}</b-btn>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'LoginForm',
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    error: null
  }),
  methods: {
    hasInput () {
      const user = this.user
      return user.email !== '' && user.password !== ''
    },
    async login () {
      try {
        const user = this.user
        const response = await this.$auth.loginWith('local', {
          data: user
        })
        if (response.data.token) {
          this.error = null
          await this.$router.push(this.localePath('/'))
        } else if (response.data.error) {
          this.error = response.data.error
        }
      } catch (e) {}
    }
  }
}
</script>
