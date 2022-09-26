export default {
  methods: {
    localeMarketEditTab (tab) {
      let editTab = tab
      const locale = this.$i18n.locale
      const tabs = this.marketEditTabs()
      this.$_.each(tabs, (struct) => {
        if (struct.tab === tab) {
          editTab = struct.tabs[locale]
        }
      })
      return editTab
    },
    marketEditAddressLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('address')
        }
      })
    },
    marketEditContactInformationLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('contact-information')
        }
      })
    },
    marketEditDescriptionLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('description')
        }
      })
    },
    marketEditMailingAddressLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('mailing-address')
        }
      })
    },
    marketEditOperatingHoursLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('operating-hours')
        }
      })
    },
    marketEditPhotosLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('photos')
        }
      })
    },
    marketEditProductsLink (market) {
      return this.localePath({
        name: 'markets-edit-id-tab',
        params: {
          id: market.id,
          tab: this.localeMarketEditTab('products')
        }
      })
    },
    marketEditTab () {
      const tab = this.$route.params.tab
      let editTab = tab
      if (tab) {
        const locale = this.$i18n.locale
        const tabs = this.marketEditTabs()
        this.$_.each(tabs, (struct) => {
          if (struct.tabs[locale] === tab) {
            editTab = struct.tab
          }
        })
      }
      return editTab
    },
    marketEditTabs () {
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
    marketIsActive (market) {
      return parseInt(market.active) === 1
    },
    marketIsFavorited (market) {
      const favorites = this.$_.get(market, 'favorites', [])
      let user = { id: 0 }
      if (this.$auth.loggedIn) {
        user = this.$auth.user
      }
      const favorite = this.$_.find(favorites, (favorite) => {
        return favorite.user_id === user.id
      })
      return !this.$_.isNil(favorite)
    },
    marketIsOwner (market) {
      return this.$auth.loggedIn && this.$auth.user.id === this.$_.get(market, 'user_id')
    },
    marketIsReviewed (market) {
      const reviews = this.$_.get(market, 'reviews', [])
      let user = { id: 0 }
      if (this.$auth.loggedIn) {
        user = this.$auth.user
      }
      const review = this.$_.find(reviews, (review) => {
        return review.user_id === user.id
      })
      return !this.$_.isNil(review)
    },
    marketNotEmpty (market) {
      return ! this.$_.isEmpty(market)
    },
    marketIsNameable (market) {
      return ! this.$_.isNil(market.first_name) && ! this.$_.isNil(market.last_name)
    },
    marketPublishAddress (market) {
      return parseInt(market.publish_address) === 1
    },
    marketPublishMailingAddress (market) {
      return parseInt(market.publish_mailing_address) === 1
    },
    marketPublishPhone (market) {
      return parseInt(market.publish_phone) === 1
    }
  }
}
