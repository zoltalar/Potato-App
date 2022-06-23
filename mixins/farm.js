export default {
  methods: {
    farmAddress (farm) {
      const addresses = this.$_.get(farm, 'addresses', [])
      return this.$_.head(this.$_.filter(addresses, (address) => {
        return address.type === 1
      }))
    },
    farmEditAddressLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('address')
        }
      })
    },
    farmEditContactInformationLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('contact-information')
        }
      })
    },
    farmEditDescriptionLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('description')
        }
      })
    },
    farmEditMailingAddressLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('mailing-address')
        }
      })
    },
    farmEditOperatingHoursLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('operating-hours')
        }
      })
    },
    farmEditPhotosLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('photos')
        }
      })
    },
    farmEditProductsLink (farm) {
      return this.localePath({
        name: 'farms-edit-id-tab',
        params: {
          id: farm.id,
          tab: this.localeFarmEditTab('products')
        }
      })
    },
    farmEditTab () {
      const tab = this.$route.params.tab
      let editTab = tab
      if (tab) {
        const locale = this.$i18n.locale
        const tabs = this.farmEditTabs()
        this.$_.each(tabs, (struct) => {
          if (struct.tabs[locale] === tab) {
            editTab = struct.tab
          }
        })
      }
      return editTab
    },
    farmEditTabs () {
      return [
        { tab: 'contact-information', tabs: { en: 'contact-information', pl: 'dane-kontaktowe' } },
        { tab: 'address', tabs: { en: 'address', pl: 'adres' } },
        { tab: 'mailing-address', tabs: { en: 'mailing-address', pl: 'adres-do-korespondencji' } },
        { tab: 'description', tabs: { en: 'description', pl: 'opis' } },
        { tab: 'operating-hours', tabs: { en: 'operating-hours', pl: 'godziny-otwarcia' } },
        { tab: 'products', tabs: { en: 'products', pl: 'produkty' } },
        { tab: 'photos', tabs: { en: 'photos', pl: 'zdjecia' } },
        { tab: 'social-media', tabs: { en: 'social-media', pl: 'media-spolecznosciowe' } }
      ]
    },
    farmIsActive (farm) {
      return parseInt(farm.active) === 1
    },
    farmIsFavorited (farm) {
      const favorites = this.$_.get(farm, 'favorites', [])
      let user = { id: 0 }
      if (this.$auth.loggedIn) {
        user = this.$auth.user
      }
      const favorite = this.$_.find(favorites, (favorite) => {
        return favorite.user_id === user.id
      })
      return !this.$_.isNil(favorite)
    },
    farmIsNameable (farm) {
      return ! this.$_.isNil(farm.first_name) && ! this.$_.isNil(farm.last_name)
    },
    farmIsOwner (farm) {
      return this.$auth.loggedIn && this.$auth.user.id === this.$_.get(farm, 'user_id')
    },
    farmMailingAddress (farm) {
      const addresses = this.$_.get(farm, 'addresses', [])
      return this.$_.head(this.$_.filter(addresses, (address) => {
        return address.type === 2
      }))
    },
    farmNotEmpty (farm) {
      return ! this.$_.isEmpty(farm)
    },
    farmPublishAddress (farm) {
      return parseInt(farm.publish_address) === 1
    },
    farmPublishMailingAddress (farm) {
      return parseInt(farm.publish_mailing_address) === 1
    },
    farmPublishPhone (farm) {
      return parseInt(farm.publish_phone) === 1
    },
    localeFarmEditTab (tab) {
      let editTab = tab
      const locale = this.$i18n.locale
      const tabs = this.farmEditTabs()
      this.$_.each(tabs, (struct) => {
        if (struct.tab === tab) {
          editTab = struct.tabs[locale]
        }
      })
      return editTab
    }
  }
}
