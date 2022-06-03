export default {
  methods: {
    fullName (model, standard = false) {
      let name = ''
      if (!this.$_.isEmpty(model)) {
        const firstName = this.$_.get(model, 'first_name')
        const lastName = this.$_.get(model, 'last_name')
        if (standard) {
          if (firstName) {
            name += firstName
            name += ' '
          }
          if (lastName) {
            name += lastName
          }
        } else {
          if (lastName) {
            name += lastName
          }
          if (firstName) {
            name += ', '
            name += firstName
          }
        }
        return name
      }
    },
  }
}
