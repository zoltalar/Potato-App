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
    cityId () {
      return this.$route.query.city_id
    },
    inventoryId () {
      return this.$route.query.inventory_id
    },
    item () {
      return this.$route.params.item
    },
    location () {
      return this.$route.params.location
    },
    radius () {
      return this.$route.query.radius || this.addressMaxRadius()
    },
    type () {
      return this.$route.query.type || 'farms'
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
      this.search.item = this.item
      this.search.inventory_id = this.inventoryId
      this.search.location = this.location
      this.search.city_id = this.cityId
      this.search.type = this.type
      this.search.radius = this.radius
    },
    submit () {
      const search = this.search
      const type = search.type
      this.$router.push(this.localePath({
        name: type + '-search-item-location',
        params: {
          item: search.item,
          location: search.location
        },
        query: {
          type,
          inventory_id: search.inventory_id,
          city_id: search.city_id,
          radius: search.radius
        }
      }))
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
