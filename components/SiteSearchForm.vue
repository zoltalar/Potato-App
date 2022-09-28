<template>
  <form @submit.prevent="submit">
    <ul class="types">
      <li>
        <a :class="{'active': this.search.type === 'farms'}" @click.prevent="setType('farms')">{{ $t('phrases.farms') }}</a>
      </li>
      <li>
        <a :class="{'active': this.search.type === 'markets'}" @click.prevent="setType('markets')">{{ $t('phrases.farmers_markets') }}</a>
      </li>
    </ul>
    <div class="inputs">
      <b-row>
        <b-col md="6" class="col-left">
          <div class="item">
            <autocomplete-inventory-input size="lg" v-model="search.item" />
          </div>
        </b-col>
        <b-col md="6" class="col-right">
          <div class="position-relative">
            <b-button type="submit" variant="primary" size="lg">
              <font-awesome-icon icon="search" />
            </b-button>
            <div class="location">
              <autocomplete-location-input size="lg" :geolocation="true" v-model="search.location" />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </form>
</template>
<script>
export default {
  name: 'SiteSearchForm',
  data: () => ({
    search: {
      item: '',
      inventory_id: 0,
      location: '',
      city_id: 0,
      type: 'farms'
    }
  }),
  computed: {
    radius () {
      return this.addressMaxRadius()
    }
  },
  watch: {
    'search.type': {
      handler(type) {
        this.$store.dispatch('search/type', type)
        this.$root.$emit('site-search-type', { type })
      },
      immediate: true
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
      let type = this.$store.getters['search/type']
      if (this.$_.isNil(type)) {
        type = this.$auth.$storage.getCookie('potato.search._type')
      }
      if (this.$_.isNil(type)) {
        type = 'farms'
      }
      this.search.type = type
    },
    setType (type) {
      this.search.type = type
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
          radius: this.radius
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
