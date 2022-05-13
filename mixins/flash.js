export default {
  methods: {
    clearFlashMessage () {
      this.$store.dispatch('flash/message', '')
    },
    flashMessage () {
      return this.$store.getters['flash/message']
    },
    hasFlashMessage () {
      return this.flashMessage() !== ''
    }
  }
}
