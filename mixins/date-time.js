export default {
  methods: {
    shortDate (dt, format = 'MMM DD') {
      return this.$moment(dt).locale(this.languageCode()).format(format)
    },
    dateTimeFromNow (dt) {
      return this.$moment(dt).locale(this.languageCode()).fromNow(true)
    }
  }
}
