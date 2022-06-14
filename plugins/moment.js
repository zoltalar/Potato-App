export default (context) => {
  context
    .$moment
    .updateLocale('pl', {
      monthsShort: [
        'Sty',
        'Lut',
        'Mar',
        'Kwi',
        'Maj',
        'Cze',
        'Lip',
        'Sie',
        'Wrz',
        'Paź',
        'Lis',
        'Gru'
      ],
      relativeTime : {
        future: "za %s",
        past: "%s temu",
        s: 'kilka sekund',
        ss: '%d sekund',
        m: "minuta",
        mm: "%d minut",
        h: "godzina",
        hh: "%d godzin",
        d: "dzień",
        dd: "%d dni",
        w: "tydzień",
        ww: "%d tygodni",
        M: "miesiąc",
        MM: "%d miesięcy",
        y: "rok",
        yy: "%d lat"
      }
    })
}
