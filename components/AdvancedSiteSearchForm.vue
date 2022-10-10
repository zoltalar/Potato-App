<template>
  <form @submit.prevent="submit">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.type') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select :options="productableOptions(true)" required v-model="search.type" />
    </b-form-group>
    <b-form-group :label="$t('phrases.product')">
      <autocomplete-inventory-input size="md" v-model="search.item" />
    </b-form-group>
    <b-form-group :label="$t('phrases.near')">
      <autocomplete-location-input size="md" v-model="search.location" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.radius') }}
        <small class="text-muted ml-1">({{ lengthUnit('abbreviation') }})</small>
      </template>
      <b-input-group>
        <b-form-input type="range" :min="addressMinRadius()" :max="addressMaxRadius()" v-model="search.radius" />
        <b-input-group-append is-text>
          {{ search.radius }}
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary">{{ $t('phrases.search') }}</b-button>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'AdvancedSiteSearchForm',
  data: () => ({
    search: {
      item: '',
      inventory_id: 0,
      location: '',
      city_id: 0,
      type: 'farms',
      radius: 0
    }
  }),
  computed: {
    city () {
      return this.searchCity()
    },
    cityId () {
      return this.$route.params.city
    },
    inventory() {
      return this.searchInventory()
    },
    inventoryId () {
      return this.$route.params.inventory
    },
    item () {
      return this.$route.params.item
    },
    itemName () {
      const inventory = this.inventory
      if (!this.$_.isNil(inventory)) {
        return this.inventoryName(inventory)
      }
      return this.unslugify(this.item)
    },
    location () {
      return this.$route.params.location
    },
    locationName () {
      const city = this.city
      if (!this.$_.isNil(city)) {
        return city.name
      }
      return this.unslugify(this.location)
    },
    radius () {
      return this.$route.params.radius || this.addressMaxRadius()
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.submit()
      }
    }
  },
  methods: {
    listen () {
      this.$root.$on('autocomplete-inventory-input', ({ item }) => {
        this.search.item = this.inventoryName(item)
        this.search.inventory_id = item.id
      })

      this.$root.$on('autocomplete-location-input', ({ location }) => {
        this.search.location = location.name
        this.search.city_id = location.id
      })
    },
    populate () {
      this.search.item = this.itemName
      this.search.inventory_id = this.inventoryId
      this.search.location = this.locationName
      this.search.city_id = this.cityId
      this.search.type = this.type()
      this.search.radius = this.radius
    },
    submit () {
      const search = this.search
      const type = search.type
      this.$router.push(this.localePath({
        name: type + '-search-item-location-inventory-city-page-radius',
        params: {
          item: this.slugify(search.item),
          location: this.slugify(search.location),
          inventory: search.inventory_id,
          city: search.city_id,
          page: 1,
          radius: search.radius
        }
      }))
    },
    type () {
      const elements = this.$route.name.split('-')
      if (this.$_.isArray(elements) && elements.length > 0) {
        return elements[0]
      }
      return null
    }
  },
  created () {
    this.listen()
  },
  mounted () {
    this.populate()
  }
}
</script>
