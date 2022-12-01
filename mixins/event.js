export default {
  methods: {
    eventApproved (event) {
      const status = this.$_.get(event, 'status', 1)
      return parseInt(status) === 3
    },
    eventEditAddressLink (event) {
      return this.localePath({
        name: 'events-edit-tab-id',
        params: {
          tab: this.localeEventEditTab('address'),
          id: event.id
        }
      })
    },
    eventEditDescriptionLink (event) {
      return this.localePath({
        name: 'events-edit-tab-id',
        params: {
          tab: this.localeEventEditTab('description'),
          id: event.id
        }
      })
    },
    eventEditGeneralInformationLink (event) {
      return this.localePath({
        name: 'events-edit-tab-id',
        params: {
          tab: this.localeEventEditTab('general'),
          id: event.id
        }
      })
    },
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
        { tab: 'address', tabs: { en: 'address', pl: 'adres' } }
      ]
    },
    eventIsOwner (event) {
      return this.$auth.loggedIn && this.$auth.user.id === this.$_.get(event, 'eventable.user_id')
    },
    eventMeta () {
      return this.$store.getters['event/meta']
    },
    eventNotEmpty (event) {
      return ! this.$_.isEmpty(event)
    },
    eventMinRadius () {
      return 5
    },
    eventMaxRadius () {
      return 500
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
    eventScopeOptions (defaultOption = false) {
      const options = []
      const scopes = this.eventScopes()
      if (defaultOption) {
        options.push({
          text: '',
          value: null
        })
      }
      this.$_.forOwn(scopes, (value, key) => {
        options.push({
          text: value,
          value: key
        })
      })
      return options
    },
    eventScopes () {
      return this.$_.get(this.eventMeta(), 'scopes')
    },
    eventStatuses () {
      return this.$_.get(this.eventMeta(), 'statuses')
    },
    eventStyle (event) {
      let variant = 'info'
      const status = parseInt(this.$_.get(event, 'status', 1))
      switch (status) {
        case 3:
          variant = 'success'
          break
        case 4:
          variant = 'danger'
          break
      }
      return variant
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
