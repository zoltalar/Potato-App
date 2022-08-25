export default {
  methods: {
    addressLine (model, glue = ',', elements = []) {
      if (this.$_.isNil(model) || this.$_.isEmpty(model)) {
        return ''
      }
      const country = this.$_.get(model, 'state.country')
      const countryName = this.countryName(country)
      if (glue === ',') {
        glue = ', '
      }
      if (elements.length === 0) {
        if (countryName === 'Poland') {
          elements = ['address', 'zip', 'city']
        } else if (countryName === 'United States') {
          elements = ['address', 'address_2', 'city', 'state', 'zip']
        }
      }
      let addressLine = ''
      if (this.$_.includes(elements, 'address')) {
        const address = this.$_.get(model, 'address', '')
        addressLine += address
      }
      if (this.$_.includes(elements, 'address_2')) {
        const address2 = this.$_.get(model, 'address_2', '')
        if (address2) {
          addressLine += glue + address2
        }
      }
      let middle = ''
      if (countryName === 'Poland') {
        if (this.$_.includes(elements, 'zip')) {
          const zip = this.$_.get(model, 'zip', '')
          middle += (middle ? glue : '') + zip
        }
        if (this.$_.includes(elements, 'city')) {
          const city = this.$_.get(model, 'city', '')
          middle += (middle ? ' ' : '') + city
        }
        if (this.$_.includes(elements, 'state')) {
          const state = this.$_.get(model, 'state.name', '')
          middle += (middle ? glue : '') + state
        }
      } else if (countryName === 'United States') {
        if (this.$_.includes(elements, 'city')) {
          const city = this.$_.get(model, 'city', '')
          middle += city
        }
        if (this.$_.includes(elements, 'state')) {
          const state = this.$_.get(model, 'state.abbreviation', '')
          middle += (middle ? ' ' : '') + state
        }
        if (this.$_.includes(elements, 'zip')) {
          const zip = this.$_.get(model, 'zip', '')
          middle += (middle ? glue : '') + zip
        }
      }
      if (this.$_.includes(elements, 'country')) {
        middle += (middle ? glue : '') + countryName
      }
      if (middle) {
        addressLine += (addressLine ? glue : '') + middle
      }
      return addressLine
    },
    addressMeta () {
      return this.$store.getters['address/meta']
    },
    addressMinRadius () {
      return 5
    },
    addressMaxRadius () {
      return this.$_.get(this.addressMeta(), 'radius')
    },
    addressableTypes () {
      return this.$_.get(this.addressMeta(), 'addressable_types')
    },
    addressTypes () {
      return this.$_.get(this.addressMeta(), 'types')
    },
    areaName (area) {
      return area.city + ', ' + area.state_name
    },
    areaUrl (area, inventoryId, inventoryName) {
      const type = 'farms'
      return this.localePath({
        name: type + '-search-item-location',
        params: {
          item: inventoryName,
          location: area.city
        },
        query: {
          type,
          inventory_id: inventoryId
        }
      })
    },
    refreshAddressMeta () {
      this.$store.dispatch('address/meta')
    }
  }
}
