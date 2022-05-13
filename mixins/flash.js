export default {
  methods: {
    flashMessage () {
      return this.$store.getters['flash/message']
    },
    hasFlashMessage () {
      return this.flashMessage() !== ''
    }
  }
}
