<template>
  <div class="farms browse">
    <page-title>
      {{ $t('messages.page_title_farms_browse', { location: city }) }}
    </page-title>
    <page-content-aside :col-main="{md: 9}" :col-aside="{md: 3}">
      <template>
        <div v-if="hasFarms()">
          <farm-list-item-card :farm="farm" :linkable-image="true" class="mb-4" v-for="(farm, i) in farms" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </farm-list-item-card>
          <pagination class="mb-0" route="farms-browse-city-page" :meta="meta" />
        </div>
        <div v-else>
          <p>{{ $t('messages.farms_empty', { location: city }) }}</p>
          <nuxt-link :to="localePath('/farms/create')" class="btn btn-primary">{{ $t('phrases.add_farm') }}</nuxt-link>
        </div>
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsBrowse',
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_farms_browse', { location: this.city }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_browse', { location: this.city })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/browse/:city/page/:page',
      pl: '/gospodarstwa-rolne/przegladaj/:city/strona/:page'
    }
  },
  async asyncData({ params, query, $axios }) {
    const page = params.page
    const latitude = query.latitude
    const longitude = query.longitude
    if (latitude && longitude) {
      try {
        const response = await $axios.get(`/api/potato/farms/browse/${latitude}/${longitude}`, { params: { page }})
        return { farms: response.data.data, meta: response.data.meta }
      } catch (error) {}
    }
  },
  data: () => ({
    farms: [],
    meta: {}
  }),
  computed: {
    city () {
      return this.$route.params.city
    }
  },
  methods: {
    hasFarms () {
      return this.farms.length > 0
    }
  }
}
</script>
