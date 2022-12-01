<template>
  <form @submit.prevent="submit">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.scope') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select :options="eventScopeOptions(true)" required v-model="search.scope" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.keyword') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input v-model="search.keyword" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.near') }}
        <span class="text-danger">*</span>
      </template>
      <autocomplete-location-input size="md" v-model="search.location" />
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.radius') }}
        <small class="text-muted ml-1">({{ lengthUnit('abbreviation') }})</small>
      </template>
      <b-input-group>
        <b-form-input type="range" :min="eventMinRadius()" :max="eventMaxRadius()" v-model="search.radius" />
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
  name: 'AdvancedEventSearchForm',
  data: () => ({
    search: {
      scope: 1,
      keyword: '',
      location: '',
      city_id: 0,
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
    keyword () {
      return this.$route.params.keyword
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
      return this.$route.params.radius || this.eventMaxRadius()
    },
    scope () {
      return this.$route.params.scope || 1
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
      this.$root.$on('autocomplete-location-input', ({ location }) => {
        this.search.location = location.name
        this.search.city_id = location.id
      })
    },
    populate () {
      this.search.scope = this.scope
      this.search.keyword = this.keyword
      this.search.location = this.locationName
      this.search.city_id = this.cityId
      this.search.radius = this.radius
    },
    submit () {
      const search = this.search
      this.$router.push(this.localePath({
        name: 'events-search-keyword-location-city-scope-page-radius',
        params: {
          keyword: search.keyword,
          location: this.slugify(search.location),
          city: search.city_id,
          scope: search.scope,
          page: 1,
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
