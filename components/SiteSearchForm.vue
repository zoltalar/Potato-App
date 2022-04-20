<template>
  <form>
    <b-row>
      <b-col md="6" class="col-left">
        <multiselect
          class="item"
          v-model="search.item"
          :options="inventory"
          :multiple="false"
          :searchable="true"
          :show-labels="false"
          :show-no-results="true"
          @search-change="searchInventory"
        >
          <template slot="singleLabel" slot-scope="props">
            {{ props.option.name }}
          </template>
          <template slot="option" slot-scope="props">
            <strong>{{ props.option.name }}</strong>
          </template>
        </multiselect>
      </b-col>
      <b-col md="6" class="col-right">
        <div class="position-relative">
          <b-button variant="primary" size="lg">
            <font-awesome-icon icon="search" />
          </b-button>
          <label for="input-search-location">{{ $t('phrases.near') }}</label>
          <multiselect
            class="location"
            v-model="search.location"
            :options="cities"
            :internal-search="false"
            :multiple="false"
            :searchable="true"
            :show-labels="false"
            :show-no-results="true"
            @search-change="searchLocations"
          >
            <template slot="singleLabel" slot-scope="props">
              {{ props.option.name }}
            </template>
            <template slot="option" slot-scope="props">
              <strong>{{ props.option.name }}</strong>
              <small class="ml-1">({{ props.option.state.name }})</small>
            </template>
          </multiselect>
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
    searchInventory (query) {
      this
        .$axios
        .get('/api/potato/inventory/index', {
          params: { search: query }
        })
        .then((response) => {
          this.inventory = response.data.data
        })
    },
    searchLocations (query) {
      this
        .$axios
        .get('/api/potato/cities/index', {
          params: { search: query }
        })
        .then((response) => {
          this.cities = response.data.data
        })
    }
  }
}
</script>
