export default {
  methods: {
    phrases (string) {
      let phrases = []
      if (string) {
        const rows = string.split(/\r?\n/)
        this._.forEach(rows, (row) => {
          const words = row.split(/;|,/)
          this._.forEach(words, (word) => {
            word = this._.trim(word)
            if (word) {
              phrases.push(word)
            }
          })
        })
        phrases = this._.uniq(phrases)
      }
      return phrases
    }
  }
}
