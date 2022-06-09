<template>
  <form>
    <b-row>
      <b-col md="6" class="col-left">
        <div class="item">
          <autocomplete-inventory-input v-model="search.item" />
        </div>
      </b-col>
      <b-col md="6" class="col-right">
        <div class="position-relative">
          <b-button variant="primary" size="lg">
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
      location: ''
    }
  }),
  methods: {
    listen () {
      this.$root.$on('autocomplete-inventory-input', ({ item }) => {
        this.search.item = item
      })

      this.$root.$on('autocomplete-location-input', ({ location }) => {
        this.search.location = location
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
