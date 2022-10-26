export default {
  methods: {
    languageCode () {
      return this.$store.getters['language/code']
    },
    languageCollection () {
      return this.$store.getters['language/collection']
    },
    languageOptions (defaultOption = false, defaultText = '') {
      const options = []
      if (defaultOption) {
        options.push({
          text: defaultText,
          value: null
        })
      }
      const languages = this.languageCollection()
      this.$_.forEach(languages, (language) => {
        options.push({
          value: language.code,
          text: language.native
        })
      })
      return options
    },
    async refreshLanguageCollection () {
      return await this.$store.dispatch('language/collection')
    }
  }
}
