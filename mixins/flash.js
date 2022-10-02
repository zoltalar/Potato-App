export default {
  methods: {
    clearErrorMessage () {
      this.$store.dispatch('flash/error', '')
    },
    clearFlashMessage () {
      this.$store.dispatch('flash/message', '')
    },
    flashErrorMessage () {
      return this.$store.getters['flash/error']
    },
    flashMessage () {
      return this.$store.getters['flash/message']
    },
    hasErrorMessage () {
      return this.flashErrorMessage() !== ''
    },
    hasFlashMessage () {
      return this.flashMessage() !== ''
    },
    isCurrentUserHasUnverifiedEmailFlashErrorMessage () {
      return this.flashErrorMessage() === this.$t('messages.email_unverified')
    }
  }
}
