export default {
  methods: {
    dateIsSame (dt) {
      const today = this.$moment().format('YYYY-MM-DD')
      const date = this.$moment(dt).format('YYYY-MM-DD')
      return this.$moment(date).isSame(today)
    },
    dateTimeFromNow (dt) {
      return this.$moment(dt).locale(this.languageCode()).fromNow(true)
    },
    shortDate (dt, format = 'MMM DD') {
      return this.$moment(dt).locale(this.languageCode()).format(format)
    },
    shortTime (dt, format = 'HH:mm') {
      const code = this.languageCode()
      if (code === 'en') {
        format = 'hh:mm a'
      }
      return this.$moment(dt).locale(code).format(format)
    }
  }
}
