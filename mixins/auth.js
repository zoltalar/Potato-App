export default {
  computed: {
    authUser () {
      return this.$auth.$storage.getUniversal('user')
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
