<template>
  <div class="farms browse">
    <page-title>
      {{ $t('messages.page_title_farms_browse', { location: city }) }}
    </page-title>
    <page-content-aside :col-main="{md: 9}" :col-aside="{md: 3}">
      <template>
        <farm-list-item-card :farm="farm" :linkable-image="true" class="mb-4" v-for="(farm, i) in farms" :key="'farm-list-item-' + i">
          <template v-slot:links>
            <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
          </template>
        </farm-list-item-card>
        <b-pagination
          class="mb-0"
          v-model="meta.current_page"
          :total-rows="meta.total"
          :per-page="meta.per_page"
        />
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
      en: '/farms/browse/:city',
      pl: '/gospodarstwa-rolne/przegladaj/:city'
    }
  },
  async asyncData({ query, $axios }) {
    const latitude = query.latitude
    const longitude = query.longitude
    if (latitude && longitude) {
      try {
        const response = await $axios.get(`/api/potato/farms/browse/${latitude}/${longitude}`)
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
  watch: {
    'meta.current_page': {
      handler (page) {
        this.fetch(page)
      }
    }
  },
  methods: {
    fetch (page) {
      const latitude = this.$route.query.latitude
      const longitude = this.$route.query.longitude
      if (latitude && longitude) {
        this
          .$axios
          .get(`/api/potato/farms/browse/${latitude}/${longitude}`, { params: { page }})
          .then((response) => {
            this.farms = this.$_.get(response, 'data.data', [])
          })
      }
    }
  }
}
</script>
