export default {
  methods: {
    messageIsUnread (message) {
      return this.$_.isNil(message.read_at)
    },
    messageNotEmpty (message) {
      return ! this.$_.isEmpty(message)
    },
    messageViewLink (message) {
      return this.localePath({
        name: 'messages-show-id',
        params: {
          id: message.id
        }
      })
    }
  }
}
