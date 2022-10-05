<template>
  <div class="cities show">
    <page-title>
      {{ city.name }}
    </page-title>
  </div>
</template>
<script>
export default {
  name: 'PageCitiesShow',
  layout: 'default',
  head () {
    return {
      title: this.city.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_cities', { location: this.city.name })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/cities/show/:id/:name',
      pl: '/miasta/pokaz/:id/:name'
    }
  },
  async asyncData ({ params, $axios }) {
    const id = params.id
    try {
      const response = await $axios.get(`/api/potato/cities/show/${id}`)
      return { city: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    city: {}
  }),
  watch: {
    city: {
      handler (city) {
        if (this.$_.isEmpty(city)) {
          this.$router.push(this.localePath('/'))
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
