export default {
  methods: {
    farmEditAddressLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('address'),
          id: farm.id
        }
      })
    },
    farmEditContactInformationLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('contact-information'),
          id: farm.id
        }
      })
    },
    farmEditDescriptionLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('description'),
          id: farm.id
        }
      })
    },
    farmEditMailingAddressLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('mailing-address'),
          id: farm.id
        }
      })
    },
    farmEditOperatingHoursLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('operating-hours'),
          id: farm.id
        }
      })
    },
    farmEditPhotosLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('photos'),
          id: farm.id
        }
      })
    },
    farmEditProductsLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('products'),
          id: farm.id
        }
      })
    },
    farmEditSocialMediaLink (farm) {
      return this.localePath({
        name: 'farms-edit-tab-id',
        params: {
          tab: this.localeFarmEditTab('social-media'),
          id: farm.id
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
    farmIsReviewed (farm) {
      const reviews = this.$_.get(farm, 'reviews', [])
      let user = { id: 0 }
      if (this.$auth.loggedIn) {
        user = this.$auth.user
      }
      const review = this.$_.find(reviews, (review) => {
        return review.user_id === user.id
      })
      return !this.$_.isNil(review)
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
