export default {
  methods: {
    loggedInRedirect () {
      if (this.$auth.loggedIn) {
        this.$router.push(this.localePath({ name: 'account-farms' }))
      }
    },
    logout () {
      this.$auth.logout()
    }
  }
}
