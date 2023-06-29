export default {
  methods: {
    substanceName(substance) {
      let name = substance.name
      if (substance.translations) {
        const translation = this.$_.head(substance.translations)
        if (!this.$_.isEmpty(translation)) {
          name = translation.name
        }
      }
      return name
    },
    substanceValue(substance) {
      let value = substance.pivot.value
      const integer = parseInt(value)
      const unit = substance.pivot.value_unit
      if (value == integer) {
        value = integer
      }
      if (!this.$_.isNil(unit)) {
        value += unit
      }
      return value
    }
  }
}
