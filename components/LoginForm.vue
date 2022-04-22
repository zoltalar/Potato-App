<template>
  <form class="form-default">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="email" v-model="user.email" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.password') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="password" v-model="user.password" />
    </b-form-group>
    <b-form-group>
      <b-btn variant="primary" size="lg" block>{{ $t('phrases.to_login') }}</b-btn>
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
    }
  })
}
</script>
