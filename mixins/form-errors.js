export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    clearErrors () {
      this.errors = {}
      this.clearErrorMessage()
    },
    error (attribute) {
      return this.$_.get(this.errors, attribute, null)
    },
    setErrors (response) {
      this.clearErrors()
      const errors = this.$_.get(response, 'data.errors', {})
      if (!this.$_.isEmpty(errors)) {
        this.$store.commit('flash/error', this.$t('messages.form_errors'))
        for (const property in errors) {
          if (errors[property][0]) {
            this.errors[property] = errors[property][0]
          }
        }
      }
    }
  }
}
