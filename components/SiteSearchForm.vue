<template>
  <form>
    <b-row>
      <b-col md="6" class="col-left">
        <v-select
          class="item"
          @search="searchInventory"
          :filterable="false"
          :options="inventory"
          :placeholder="$t('messages.search_product_with_example')"
          :reduce="item => item.id"
          v-model="search.item">
          <template slot="option" slot-scope="item">
            <span v-if="item.translations && item.translations.length">{{ item.translations[0].name }}</span>
            <span v-else>{{ item.name }}</span>
          </template>
          <template slot="selected-option" slot-scope="item">
            <span v-if="item.translations && item.translations.length">{{ item.translations[0].name }}</span>
            <span v-else>{{ item.name }}</span>
          </template>
          <template slot="no-options">
            {{ $t('messages.no_inventory_items') }}
          </template>
        </v-select>
      </b-col>
      <b-col md="6" class="col-right">
        <div class="position-relative">
          <b-button variant="primary" size="lg">
            <font-awesome-icon icon="search" />
          </b-button>
          <v-select
            class="location"
            @search="searchLocations"
            :filterable="false"
            :options="cities"
            :placeholder="$t('phrases.near')"
            :reduce="city => city.id"
            v-model="search.location">
            <template slot="option" slot-scope="city">
              <strong>{{ city.name }}</strong>
              <small>({{ city.state.name }})</small>
            </template>
            <template slot="selected-option" slot-scope="city">
              {{ city.name }}
            </template>
            <template slot="no-options">
              {{ $t('messages.no_locations') }}
            </template>
          </v-select>
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
    },
    inventory: [],
    cities: []
  }),
  methods: {
    searchInventory (search) {
      if (search.length >= 2) {
        this
          .$axios
          .get('/api/potato/inventory/index', {
            params: { search, language: this.languageCode() }
          })
          .then((response) => {
            this.inventory = response.data.data
          })
      }
    },
    searchLocations (search) {
      if (search.length >= 2) {
        this
          .$axios
          .get('/api/potato/cities/index', {
            params: { search, country: this.countryCode() }
          })
          .then((response) => {
            this.cities = response.data.data
          })
      }
    }
  }
}
</script>
