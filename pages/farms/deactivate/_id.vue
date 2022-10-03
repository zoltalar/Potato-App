<template>
  <div class="farms deactivate">
    <page-title>
      {{ $t('phrases.deactivate_farm') }}
      -
      {{ farm.name }}
    </page-title>
    <page-content>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="farmIsActive(farm)">
          <p class="mb-4">{{ $t('messages.farm_deactivate') }}</p>
          <b-row>
            <b-col md="6">
              <farm-deactivate-form :edited-farm="farm" />
            </b-col>
          </b-row>
        </div>
        <div v-else>
          <nuxt-link :to="localePath('/account/farms')" class="btn btn-primary btn-lg">{{ $t('phrases.continue') }}</nuxt-link>
        </div>
      </template>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsDeactivate',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.deactivate_farm') + ' - ' + this.farm.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_deactivate')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/deactivate/:id',
      pl: '/gospodarstwa-rolne/dezaktywuj/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      const response = await $axios.get(`/api/potato/farms/show/${id}`)
      return { farm: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    farm: {}
  }),
  watch: {
    farm: {
      handler(farm) {
        if (this.$_.isEmpty(farm) || !this.farmIsOwner(farm)) {
          this.$router.push(this.localePath('/account/farms'))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    fetch () {
      const id = this.$route.params.id
      this
        .$axios
        .get(`/api/potato/farms/show/${id}`)
        .then((response) => {
          this.farm = this.$_.get(response, 'data.data')
        })
    },
    listen () {
      this.$root.$off('farm-deactivated')

      this.$root.$on('farm-deactivated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_deactivated'))
        this.fetch()
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
