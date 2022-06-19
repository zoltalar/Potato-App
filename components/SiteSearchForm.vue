<template>
  <form @submit.prevent="submit">
    <b-row>
      <b-col md="6" class="col-left">
        <div class="item">
          <autocomplete-inventory-input v-model="search.item" />
        </div>
      </b-col>
      <b-col md="6" class="col-right">
        <div class="position-relative">
          <b-button type="submit" variant="primary" size="lg">
            <font-awesome-icon icon="search" />
          </b-button>
          <div class="location">
            <autocomplete-location-input :geolocation="true" v-model="search.location" />
          </div>
        </div>
      </b-col>
    </b-row>
  </form>
</template>
<script>
export default {
  name: 'SiteSearchForm',
  data: () => ({
    search: {
      item: '',
      id: 0,
      location: '',
      type: 'farms'
    }
  }),
  methods: {
    listen () {
      this.$root.$on('autocomplete-inventory-input', ({ item }) => {
        this.search.item = this.inventoryName(item)
      })

      this.$root.$on('autocomplete-location-input', ({ location }) => {
        this.search.id = location.id
        this.search.location = location.name
      })
    },
    submit () {
      const search = this.search
      const type = search.type
      this.$router.push(this.localePath({
        name: type + '-search-id-item-location',
        params: {
          id: search.id,
          item: search.item.toLowerCase(),
          location: search.location.toLowerCase()
        }
      }))
    }
  },
  created () {
    this.listen()
  }
}
</script>
