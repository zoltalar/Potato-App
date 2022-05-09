<template>
  <form class="form-default" @submit.prevent="resend">
    <b-form-group>
      <b-btn type="submit" variant="primary">{{ $t('phrases.request_another_link') }}</b-btn>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'EmailResendForm',
  methods: {
    resend () {
      this
        .$axios
        .post('/api/potato/email/resend')
        .then((response) => {
          if (response.status === 202) {
            this.$root.$emit('verification-sent', true)
          }
        })
    }
  }
}
</script>
