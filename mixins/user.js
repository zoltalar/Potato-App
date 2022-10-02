export default {
  methods: {
    currentUserHasUnverifiedEmailFlashErrorMessage() {
      const user = this.$auth.loggedIn ? this.$auth.user : {}
      if (!this.userHasVerifiedEmail(user)) {
        this.$store.dispatch('flash/error', this.$t('messages.email_unverified'))
      }
    },
    userHasVerifiedEmail (user) {
      return !this.$_.isNil(user.email_verified_at)
    }
  }
}
