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
        <p class="mb-4">{{ $t('messages.farm_deactivate') }}</p>
        <b-row>
          <b-col md="6">
            <farm-deactivate-form :edited-farm="farm" />
          </b-col>
        </b-row>
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
      deep: true
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
      })
    }
  },
  mounted () {
    this.fetch()
    this.listen()
  }
}
</script>
