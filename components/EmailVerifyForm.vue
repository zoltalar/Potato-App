<template>
  <form class="form-default" @submit.prevent="verify">
    <b-form-group>
      <b-input-group size="lg" class="input-group-fixed">
        <b-form-input maxlength="7" v-model="code" />
        <b-input-group-append>
          <b-button type="submit" variant="primary" :disabled="!hasInput()">{{ $t('phrases.verify') }}</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'EmailVerifyForm',
  data: () => ({
    code: ''
  }),
  methods: {
    hasInput () {
      const code = this.code
      return code !== ''
    },
    async verify () {
      const code = this.code
      try {
        const response = await this.$axios.put(`/api/potato/email/verify/${code}`)
        const verified = (response.status === 204)
        if (verified) {
          await this.$auth.fetchUser()
          this.clearErrorMessage()
        }
        this.$root.$emit('verified', verified)
      } catch (error) {}
    }
  }
}
</script>
