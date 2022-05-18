export default {
  methods: {
    fullName (model, standard = false) {
      let name = ''
      const firstName = this._.get(model, 'first_name')
      const lastName = this._.get(model, 'last_name')
      if (standard) {
        if (firstName) {
          name += firstName
          name += ' '
        }
        name += lastName
      } else {
        name += lastName
        if (firstName) {
          name += ', '
          name += firstName
        }
      }
      return name
    },
  }
}
