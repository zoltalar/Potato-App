export default {
  methods: {
    currentSeason () {
      let season = ''
      const date = this.$moment()
      const month = date.month() + 1
      const day = date.date()
      if (month === 1 || month === 2) {
        season = 'winter';
      } else if (month === 4 || month === 5) {
        season = 'spring';
      } else if (month === 7 || month === 8) {
        season = 'summer';
      } else if (month === 10 || month === 11) {
        season = 'fall';
      } else if (month === 3 && day <= 19) {
        season = 'winter';
      } else if (month === 3) {
        season = 'spring';
      } else if (month === 6 && day <= 20) {
        season = 'spring';
      } else if (month === 6) {
        season = 'summer';
      } else if (month === 9 && day <= 20) {
        season = 'summer';
      } else if (month === 9) {
        season = 'fall';
      } else if (month === 12 && day <= 21) {
        season = 'fall';
      } else if (month === 12) {
        season = 'winter';
      }
      return season
    },
    dateIsSame (dt) {
      const today = this.$moment().format('YYYY-MM-DD')
      const date = this.$moment(dt).format('YYYY-MM-DD')
      return this.$moment(date).isSame(today)
    },
    dateTimeFromNow (dt) {
      return this.$moment(dt).locale(this.languageCode()).fromNow(true)
    },
    days () {
      return [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
    },
    localeDateFormat () {
      let format = 'DD/MM/YYYY'
      const code = this.languageCode()
      if (code === 'en') {
        format = 'MM/DD/YYYY'
      }
      return format
    },
    seasonIndex (season) {
      const seasons = {
        winter: 0,
        spring: 1,
        summer: 2,
        fall: 3
      }
      if (seasons.hasOwnProperty(season)) {
        return seasons[season]
      }
      return null
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
    },
    time (time, format = 'HH:mm') {
      const code = this.countryCode()
      if (code === 'us') {
        format = 'hh:mm a'
      }
      return this.$moment(time, 'HH:mm:ss').locale(code).format(format)
    }
  }
}
