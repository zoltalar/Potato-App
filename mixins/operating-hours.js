export default {
  methods: {
    operatingHours (operatable) {
      return this.$_.get(operatable, 'operating_hours', {})
    }
  }
}
