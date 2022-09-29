<template>
  <form class="form-default" @submit.prevent="register">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.first_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('first_name') !== null}" maxlength="100" v-model="user.first_name" />
      <div class="invalid-feedback d-block" v-if="error('first_name') !== null">
        {{ error('first_name') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.last_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('last_name') !== null}" maxlength="100" v-model="user.last_name" />
      <div class="invalid-feedback d-block" v-if="error('last_name') !== null">
        {{ error('last_name') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input :class="{'is-invalid': error('email') !== null}" maxlength="255" v-model="user.email" />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.password') }}
        <span class="text-danger">*</span>
      </template>
      <b-input-group>
        <b-form-input :type="passwordInputType" :class="{'is-invalid': error('password') !== null}" maxlength="40" v-model="user.password" />
        <b-input-group-append>
          <b-button variant="secondary" @click="togglePasswordInputType()">
            <font-awesome-icon :icon="passwordInputTypeIcon" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('password') !== null">
        {{ error('password') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.to_register') }}</b-button>
      <span class="ml-3">{{ $t('phrases.already_have_an_account?') }}</span>
      <nuxt-link :to="localePath('/login')">{{ $t('phrases.to_login') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
import passwordMixin from '@/mixins/password'
export default {
  name: 'RegisterForm',
  mixins: [ formErrorsMixin, passwordMixin ],
  data: () => ({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }),
  methods: {
    register () {
      let user = this.user
      this
        .$axios
        .post('/api/potato/register', user)
        .then((response) => {
          this.setErrors(response)
          user = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(user)) {
            this.reset()
            this.$root.$emit('register', { user })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    reset () {
      const user = this.user
      this.$_.forOwn(user, (value, key) => {
        user[key] = ''
      })
      this.user = user
    }
  }
}
</script>
