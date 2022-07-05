<template>
  <div class="farms search">
    <page-title>
      {{ $t('phrases.search_results') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <form>
          <b-form-group :label="$t('phrases.product')">
            <autocomplete-inventory-input size="md" />
          </b-form-group>
          <b-form-group :label="$t('phrases.near')">
            <autocomplete-location-input size="md" />
          </b-form-group>
          <b-form-group>
            <template v-slot:label>
              {{ $t('phrases.type') }}
              <span class="text-danger">*</span>
            </template>
            <b-form-select :options="productableOptions(true)" />
          </b-form-group>
          <b-form-group :label="$t('phrases.radius')">
            <b-input-group>
              <b-form-input type="range" min="10" max="100" v-model="search.radius" />
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
      <template v-if="loaded">
        <div class="list-farms" v-if="farms.length > 0">
          <p v-html="$t('messages.farms_search', { item, location })"></p>
          <farm-list-item-card :farm="farm" class="mb-4" v-for="(farm, i) in pagedFarms" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </farm-list-item-card>
          <b-pagination
            class="mb-4"
            v-model="pagination.currentPage"
            :items="farms"
            :total-rows="farms.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div v-else>
          <span v-html="$t('messages.farms_search_empty', { item, location })"></span>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsSearch',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.search_results'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_search')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/search/:item/:location',
      pl: '/gospodarstwa-rolne/szukaj/:item/:location'
    }
  },
  data: () => ({
    farms: [],
    loaded: false,
    pagination: {
      currentPage: 1,
      perPage: 10
    },
    search: {
      item: '',
      inventory_id: 0,
      location: '',
      city_id: 0,
      type: 'farms',
      radius: 10
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
    pagedFarms () {
      const farms = this.farms
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return farms.slice(start, end)
    }
  },
  methods: {
    fetch () {
      const item = this.item
      const inventoryId = this.inventoryId
      const location = this.location
      const cityId = this.cityId
      this
        .$axios
        .get(`/api/potato/farms/search`, {
          params: { item, inventory_id: inventoryId, location, city_id: cityId }
        })
        .then((response) => {
          this.farms = this.$_.get(response, 'data.data', [])
          this.loaded = true
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
