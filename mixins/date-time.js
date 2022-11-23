export default {
  methods: {
    currentSeason () {
      let season = ''
      const date = this.$moment()
      const month = date.month() + 1
      const day = date.date()
      if (month === 1 || month === 2) {
        season = 'winter'
      } else if (month === 4 || month === 5) {
        season = 'spring'
      } else if (month === 7 || month === 8) {
        season = 'summer'
      } else if (month === 10 || month === 11) {
        season = 'fall'
      } else if (month === 3 && day <= 19) {
        season = 'winter'
      } else if (month === 3) {
        season = 'spring'
      } else if (month === 6 && day <= 20) {
        season = 'spring'
      } else if (month === 6) {
        season = 'summer'
      } else if (month === 9 && day <= 20) {
        season = 'summer'
      } else if (month === 9) {
        season = 'fall'
      } else if (month === 12 && day <= 21) {
        season = 'fall'
      } else if (month === 12) {
        season = 'winter'
      }
      return season
    },
    dateFormat (date) {
      return this.$moment(date, 'YYYY-MM-DD').format(this.localeDateFormat())
    },
    dateIsSame (dt) {
      const today = this.$moment().format('YYYY-MM-DD')
      const date = this.$moment(dt).format('YYYY-MM-DD')
      return this.$moment(date).isSame(today)
    },
    dateRange (startDate, endDate) {
      const dates = []
      if (this.isValidDate(startDate)) {
        dates.push(this.dateFormat(startDate))
      }
      if (this.isValidDate(endDate)) {
        dates.push(this.dateFormat(endDate))
      }
      return dates.join(' - ')
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
    isHour12 () {
      return this.countryCode() === 'us'
    },
    isValidDate (date) {
      return this.$moment(date).isValid()
    },
    isValidTime (time) {
      return this.$moment(time, 'HH:mm:ss').isValid()
    },
    localeDateFormat () {
      let format = 'DD/MM/YYYY'
      const code = this.languageCode()
      if (code === 'en') {
        format = 'MM/DD/YYYY'
      }
      return format
    },
    monthName (index) {
      const names = this.monthNames(true)
      return names[index-1] || ''
    },
    monthNames (translate = false) {
      let months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
      ]
      if (translate) {
        this.$_.forEach(months, (month, i) => {
          months[i] = this.$t('date.' + month)
        })
      }
      return months
    },
    monthNameOptions () {
      let options = [{
        value: null,
        text: ''
      }]
      const months = this.monthNames(true)
      this.$_.forEach(months, (month, i) => {
        options.push({
          value: (i+1),
          text: month
        })
      })
      return options
    },
    seasons () {
      return [
        'winter',
        'spring',
        'summer',
        'fall'
      ]
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
    },
    timeRange (startTime, endTime) {
      const times = []
      if (this.isValidTime(startTime)) {
        times.push(this.time(startTime))
      }
      if (this.isValidTime(endTime)) {
        times.push(this.time(endTime))
      }
      return times.join(' - ')
    }
  }
}
