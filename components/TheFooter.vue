<template>
  <footer class="site-footer">
    <b-container>
      <b-row>
        <b-col sm="6">
          <p class="copyrights">{{ $t('messages.copyrights_text', { year: (new Date()).getFullYear() }) }}</p>
        </b-col>
        <b-col sm="6">
          <ul class="footer-nav">
            <li>
              <nuxt-link :to="localePath({ name: 'index' })">{{ $t('phrases.home_page') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath({ name: 'products-index' })">{{ $t('phrases.products') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath({ name: 'contact' })">{{ $t('phrases.contact_us') }}</nuxt-link>
            </li>
          </ul>
        </b-col>
        <b-col sm="12">
          <ul class="list-cities">
            <li v-for="(city, i) in cities" :key="'city-largest-' + i">
              <nuxt-link :to="localePath({ name: 'cities-show-name-id', params: { name: slugify(city.name), id: city.id } })">{{ city.name }}</nuxt-link>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
export default {
  name: 'TheFooter',
  data: () => ({
    cities: []
  }),
  async fetch () {
    let collection = this.cityLargestCollection()
    if (collection.length === 0) {
      collection = await this.$store.dispatch('city/largestCollection')
    }
    this.cities = collection
  }
}
</script>
