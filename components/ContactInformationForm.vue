<template>
  <form class="form-default" @submit.prevent="update">
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
    <b-form-group :label="$t('phrases.phone')">
      <b-form-input :class="{'is-invalid': error('phone') !== null}" maxlength="20" v-model="user.phone" />
      <div class="invalid-feedback d-block" v-if="error('phone') !== null">
        {{ error('phone') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'ContactInformationForm',
  mixins: [ formErrorsMixin ],
  data: () => ({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    }
  }),
  methods: {
    populate () {
      const editedUser = this.authUser
      const user = this.user

      if ( ! this.$_.isEmpty(editedUser)) {
        this.$_.forOwn(editedUser, (value, key) => {
          if (key in user) {
            user[key] = value
          }
        })

        this.user = user
      }
    },
    update () {
      let user = this.user

      this
        .$axios
        .post('/api/potato/account/update-contact-information', user)
        .then((response) => {
          user = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(user)) {
            this.$root.$emit('contact-information-updated', { user })
            this.$auth.fetchUser()
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  },
  mounted () {
    this.populate()
  }
}
</script>
