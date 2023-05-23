<template>
  <div class="farms browse">
    <page-title>
      {{ $t('messages.page_title_farms_browse', { location: city.name }) }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <nuxt-link :to="localePath({ name: 'cities-show-name-id', params: { name: slugify(city.name), id: city.id } })" class="btn btn-primary mb-4">{{ $t('phrases.back') }}</nuxt-link>
      </template>
      <template>
        <div v-if="hasFarms()">
          <farm-list-item-card :farm="farm" :linkable-image="true" class="mb-4" v-for="(farm, i) in farms" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(farm.name), id: farm.id } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </farm-list-item-card>
          <pagination class="mb-0" route="farms-browse-id-city-page" :meta="meta" />
        </div>
        <div v-else>
          <p>{{ $t('messages.farms_empty', { location: city }) }}</p>
          <nuxt-link :to="localePath({ name: 'farms-create' })" class="btn btn-primary">{{ $t('phrases.add_farm') }}</nuxt-link>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsBrowse',
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_farms_browse', { location: this.city.name }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_farms_browse', { location: this.city.name }) },
        { hid: 'og:title', name: 'og:title', content: this.$t('messages.page_title_farms_browse', { location: this.city.name }) },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_farms_browse', { location: this.city.name }) },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/:city/:id/:page',
      pl: '/gospodarstwa-rolne/:city/:id/:page'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    const page = params.page
    try {
      let response = await $axios.get(`/api/potato/cities/show/${id}`)
      const city = response.data.data
      if (city) {
        const latitude = city.latitude
        const longitude = city.longitude
        const response = await $axios.get(`/api/potato/farms/browse/${latitude}/${longitude}`, { params: { page }})
        return {
          city,
          farms: response.data.data,
          meta: response.data.meta
        }
      }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    city: {},
    farms: [],
    meta: {}
  }),
  watch: {
    city: {
      handler (city) {
        if (this.$_.isEmpty(city)) {
          this.$router.push(this.localePath({ name: 'index' }))
        }
      },
      immediate: true
    }
  },
  methods: {
    hasFarms () {
      return this.farms.length > 0
    }
  }
}
</script>
