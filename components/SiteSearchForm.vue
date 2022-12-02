<template>
  <form @submit.prevent="submit">
    <ul class="types">
      <li>
        <a :class="{'active': getType() === 'farms'}" @click.prevent="setType('farms')">{{ $t('phrases.farms') }}</a>
      </li>
      <li>
        <a :class="{'active': getType() === 'markets'}" @click.prevent="setType('markets')">{{ $t('phrases.farmers_markets') }}</a>
      </li>
      <li>
        <a :class="{'active': getType() === 'events'}" @click.prevent="setType('events')">{{ $t('phrases.events') }}</a>
      </li>
    </ul>
    <div class="inputs">
      <b-row>
        <b-col md="6" class="col-left">
          <div class="item">
            <b-form-input
              size="lg"
              v-model="search.keyword"
              :placeholder="$t('messages.search_events')"
              required
              v-if="getType() === 'events'" />
            <autocomplete-inventory-input size="lg" v-model="search.item" v-else />
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
      keyword: '',
      location: '',
      city_id: 0,
      type: 'farms'
    }
  }),
  computed: {
    radius () {
      if (this.getType() === 'events') {
        return this.eventMaxRadius()
      }
      return this.addressMaxRadius()
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
      let type = this.searchType()
      if (this.$_.isNil(type)) {
        type = this.$auth.$storage.getCookie('potato.search._type')
      }
      if (this.$_.isNil(type)) {
        type = 'farms'
      }
      this.setType(type)
    },
    getType () {
      return this.search.type
    },
    setType (type) {
      this.search.type = type
      this.$store.dispatch('search/type', type)
      this.$root.$emit('search-type', { type })
    },
    submit () {
      const search = this.search
      const type = this.getType()
      if (type === 'events') {
        this.$router.push(this.localePath({
          name: 'events-search-keyword-location-city-scope-page-radius',
          params: {
            keyword: search.keyword,
            location: this.slugify(search.location),
            city: search.city_id,
            scope: 1,
            page: 1,
            radius: this.radius
          }
        }))
      } else {
        this.$router.push(this.localePath({
          name: type + '-search-item-location-inventory-city-page-radius',
          params: {
            item: this.slugify(search.item),
            location: this.slugify(search.location),
            inventory: search.inventory_id,
            city: search.city_id,
            page: 1,
            radius: this.radius
          }
        }))
      }
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
