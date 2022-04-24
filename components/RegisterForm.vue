<template>
  <form class="form-default">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.first_name') }}
        <span class="text-danger">*</span>
      </template>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'RegisterForm',
  data: () => ({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  })
}
</script>
