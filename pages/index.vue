<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col sm="6">
          <div class="promoted-farms" v-if="farms.length > 0">
            <span class="circle">
              <font-awesome-icon icon="seedling" />
            </span>
            <h5>{{ $t('phrases.buy_from_farmers_near_you') }}</h5>
            <div class="list list-farms">
              <farm-list-item :farm="farm" v-for="(farm, i) in farms" />
            </div>
          </div>
        </b-col>
        <b-col sm="6">
          <div class="map">
            <span class="circle">
              <font-awesome-icon icon="map" />
            </span>
            <h5>{{ $t('phrases.browse_farms_map') }}</h5>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'PageIndex',
  layout: 'home',
  head () {
    return {
      title: this.$t('messages.search_food'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_index')
        }
      ],
    }
  },
  data: () => ({
    farms: []
  }),
  computed: {
    city () {
      return this.$store.getters['city/city']
    }
  },
  watch: {
    city: {
      handler (city) {
        if (!this.$_.isEmpty(city)) {
          const latitude = city.latitude
          const longitude = city.longitude
          this
            .$axios
            .get(`/api/potato/farms/locate/${latitude}/${longitude}`, {
              params: { limit: 2 }
            })
            .then((response) => {
              this.farms = this.$_.get(response, 'data.data', [])
            })
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
