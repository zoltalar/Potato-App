export default {
  methods: {
    languageCollection () {
      return this.$store.getters['language/collection']
    },
    languageOptions () {
      const options = []
      const languages = this.languageCollection()
      this.$_.forEach(languages, (language) => {
        options.push({
          value: language.code,
          text: language.native
        })
      })
      return options
    },
    refreshLanguageCollection () {
      this.$store.dispatch('language/collection')
    }
  }
}
