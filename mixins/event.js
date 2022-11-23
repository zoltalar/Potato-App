export default {
  methods: {
    eventEditTab () {
      const tab = this.$route.params.tab
      let editTab = tab
      if (tab) {
        const locale = this.$i18n.locale
        const tabs = this.eventEditTabs()
        this.$_.each(tabs, (struct) => {
          if (struct.tabs[locale] === tab) {
            editTab = struct.tab
          }
        })
      }
      return editTab
    },
    eventEditTabs () {
      return [
        { tab: 'general', tabs: { en: 'general', pl: 'ogolne' } },
        { tab: 'description', tabs: { en: 'description', pl: 'opis' } },
        { tab: 'address', tabs: { en: 'address', pl: 'adres' } },
        { tab: 'photos', tabs: { en: 'photos', pl: 'zdjecia' } },
      ]
    },
    eventIsOwner (event) {
      return this.$auth.loggedIn && this.$auth.user.id === this.$_.get(event, 'eventable.user_id')
    },
    eventMeta () {
      return this.$store.getters['event/meta']
    },
    eventStatusName (id) {
      let name = null
      const statuses = this.eventStatuses()
      if (this.$_.isObject(statuses) && !this.$_.isEmpty(statuses)) {
        this.$_.forOwn(statuses, (value, key) => {
          if (key == id) {
            name = value
          }
        })
      }
      return name
    },
    eventStatuses () {
      return this.$_.get(this.eventMeta(), 'statuses')
    },
    localeEventEditTab (tab) {
      let editTab = tab
      const locale = this.$i18n.locale
      const tabs = this.eventEditTabs()
      this.$_.each(tabs, (struct) => {
        if (struct.tab === tab) {
          editTab = struct.tabs[locale]
        }
      })
      return editTab
    },
    async refreshEventMeta () {
      return await this.$store.dispatch('event/meta')
    }
  }
}
