export default {
  methods: {
    empty (string) {
      return this.$_.isNil(string) || string === ''
    },
    nl2br (string, xhtml = true) {
      const tag = (xhtml || typeof xhtml === 'undefined') ? '<br ' + '/>' : '<br>'
      return (string + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + tag + '$2')
    },
    phrases (string) {
      let phrases = []
      if (string) {
        const rows = string.split(/\r?\n/)
        this.$_.forEach(rows, (row) => {
          const words = row.split(/;|,/)
          this.$_.forEach(words, (word) => {
            word = this.$_.trim(word)
            if (word) {
              phrases.push(word)
            }
          })
        })
        phrases = this.$_.uniq(phrases)
      }
      return phrases
    },
    slugify (string) {
      return this.$_.kebabCase(string)
    }
  }
}
